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

function getFileExtensionLength(name) {
  const extensionMatch = name.match(/(\.[^.]{1,8})$/u);
  return extensionMatch ? Array.from(extensionMatch[1]).length : 0;
}

function splitFileName(fileName, maxHeadLength, maxTailLength, splitThreshold, minTailExtra = 7) {
  const name = String(fileName ?? '');
  const chars = Array.from(name);

  if (chars.length <= splitThreshold) {
    return {
      name,
      shouldSplit: false,
      head: name,
      tail: '',
    };
  }

  const extensionLength = getFileExtensionLength(name);
  const tailLength = Math.min(
    Math.max(maxTailLength, extensionLength + minTailExtra),
    Math.max(1, chars.length - maxHeadLength),
  );
  const head = chars.slice(0, maxHeadLength).join('');
  const tail = chars.slice(chars.length - tailLength).join('');

  return {
    name,
    shouldSplit: true,
    head,
    tail,
  };
}

export function renderSplitFileName(fileName, className, options = {}) {
  const {
    maxHeadLength = 10,
    maxTailLength = 11,
    splitThreshold = 18,
    minTailExtra = 7,
  } = options;
  const parts = splitFileName(fileName, maxHeadLength, maxTailLength, splitThreshold, minTailExtra);
  const title = escapeHtml(parts.name);

  if (!parts.shouldSplit) {
    return `<span class="${className}" title="${title}">${escapeHtml(parts.name)}</span>`;
  }

  return `
    <span class="${className} ${className}--split" title="${title}">
      <span class="${className}-head">${escapeHtml(parts.head)}…</span>
      <span class="${className}-tail">…${escapeHtml(parts.tail)}</span>
    </span>
  `;
}

export function renderTwoLineFileName(fileName, className, options = {}) {
  const {
    maxHeadLength = 13,
    maxTailLength = 14,
    splitThreshold = 24,
  } = options;
  const parts = splitFileName(fileName, maxHeadLength, maxTailLength, splitThreshold);
  const title = escapeHtml(parts.name);

  if (!parts.shouldSplit) {
    return `<span class="${className}" title="${title}">${escapeHtml(parts.name)}</span>`;
  }

  return `
    <span class="${className} ${className}--two-line" title="${title}">
      <span class="${className}-head">${escapeHtml(parts.head)}…</span>
      <span class="${className}-tail">…${escapeHtml(parts.tail)}</span>
    </span>
  `;
}
