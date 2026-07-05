import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export async function loadPdfFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfjsData = new Uint8Array(arrayBuffer.slice(0));
  const document = await pdfjsLib.getDocument({ data: pdfjsData }).promise;

  return {
    document,
    originalBytes: arrayBuffer,
    pageCount: document.numPages,
    byteLength: file.size,
  };
}
