export async function renderPageThumbnail(pdfDocument, pageNumber, targetWidth = 180, rotationDegrees = 0) {
  const page = await pdfDocument.getPage(pageNumber);
  const pageRotation = Number(page.rotate) || 0;
  const extraRotation = Number(rotationDegrees) || 0;
  const rotation = ((pageRotation + extraRotation) % 360 + 360) % 360;
  const viewport = page.getViewport({ scale: 1, rotation });
  const scale = targetWidth / viewport.width;
  const scaledViewport = page.getViewport({ scale, rotation });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha: false });

  canvas.width = Math.ceil(scaledViewport.width);
  canvas.height = Math.ceil(scaledViewport.height);

  await page.render({
    canvasContext: context,
    viewport: scaledViewport,
  }).promise;

  return {
    dataUrl: canvas.toDataURL('image/png'),
    width: viewport.width,
    height: viewport.height,
    rotation,
  };
}
