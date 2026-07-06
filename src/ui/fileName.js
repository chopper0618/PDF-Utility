export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function shortenFileNameMiddle(fileName, maxLength = 24) {
  const name = String(fileName ?? '');
  const chars = Array.from(name);
  if (chars.length <= maxLength) return name;

  const extensionMatch = name.match(/(\.[^.]{1,8})$/u);
  const extension = extensionMatch ? extensionMatch[1] : '';
  const extensionLength = Array.from(extension).length;

  const minHeadLength = 8;
  const minTailLength = Math.max(8, extensionLength + 4);
  const available = Math.max(4, maxLength - 1);
  const tailLength = Math.min(chars.length - minHeadLength, Math.max(minTailLength, Math.floor(available * 0.45)));
  const headLength = Math.max(4, available - tailLength);
  const tailStart = Math.max(headLength, chars.length - tailLength);

  return `${chars.slice(0, headLength).join('')}…${chars.slice(tailStart).join('')}`;
}

export function renderShortFileName(fileName, className, maxLength = 24) {
  const title = escapeHtml(fileName);
  const label = escapeHtml(shortenFileNameMiddle(fileName, maxLength));

  return `<span class="${className}" title="${title}">${label}</span>`;
}
