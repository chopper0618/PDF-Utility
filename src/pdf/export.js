import { degrees, PDFDocument } from 'pdf-lib';

function normalizeDegrees(value) {
  return ((Number(value) % 360) + 360) % 360;
}

function getDefaultFileName() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  const stamp = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '_',
    pad(now.getHours()),
    pad(now.getMinutes()),
  ].join('');
  return `PDF_Utility_${stamp}.pdf`;
}

function ensurePdfExtension(fileName) {
  const trimmed = String(fileName || '').trim();
  if (!trimmed) return getDefaultFileName();
  return trimmed.toLowerCase().endsWith('.pdf') ? trimmed : `${trimmed}.pdf`;
}

export async function createMergedPdfBlob(state) {
  if (!state.pages.length) {
    throw new Error('出力するページがありません。');
  }

  const outputPdf = await PDFDocument.create();
  const sourceCache = new Map();

  for (const pageModel of state.pages) {
    const fileRecord = state.files.find((file) => file.id === pageModel.fileId);
    if (!fileRecord?.originalBytes) {
      throw new Error(`元PDFデータが見つかりません: ${pageModel.fileName}`);
    }

    let sourcePdf = sourceCache.get(fileRecord.id);
    if (!sourcePdf) {
      sourcePdf = await PDFDocument.load(fileRecord.originalBytes);
      sourceCache.set(fileRecord.id, sourcePdf);
    }

    const [copiedPage] = await outputPdf.copyPages(sourcePdf, [pageModel.originalPageNumber - 1]);
    copiedPage.setRotation(degrees(normalizeDegrees(pageModel.rotation)));
    outputPdf.addPage(copiedPage);
  }

  const bytes = await outputPdf.save();
  return new Blob([bytes], { type: 'application/pdf' });
}

export function downloadBlob(blob, fileName) {
  const safeFileName = ensurePdfExtension(fileName);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = safeFileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function getSuggestedOutputFileName(state) {
  if (state.files.length === 1) {
    const baseName = state.files[0].name.replace(/\.pdf$/i, '');
    return `${baseName}_edited.pdf`;
  }
  return getDefaultFileName();
}
