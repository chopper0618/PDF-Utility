function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function shortenFileNameForPageMap(fileName, maxLength = 20) {
  const name = String(fileName ?? '');
  if (Array.from(name).length <= maxLength) return name;

  const chars = Array.from(name);
  const extensionMatch = name.match(/(\.[^.]{1,8})$/u);
  const extension = extensionMatch ? extensionMatch[1] : '';
  const extensionLength = Array.from(extension).length;

  const headLength = 7;
  const tailLength = Math.max(8, maxLength - headLength - 1);
  const tailStart = Math.max(headLength, chars.length - Math.max(tailLength, extensionLength + 4));

  return `${chars.slice(0, headLength).join('')}…${chars.slice(tailStart).join('')}`;
}

function renderPageMapFileName(fileName) {
  const title = escapeHtml(fileName);
  const label = shortenFileNameForPageMap(fileName);

  return `<span class="page-map__file" title="${title}">${escapeHtml(label)}</span>`;
}

function renderPageMapItem(page, index, selectedPageId) {
  const isActive = page.id === selectedPageId;
  const duplicateLabel = page.duplicateOf ? '<span class="page-map__badge">複製</span>' : '';
  const title = `${page.fileName} / 元 P.${page.originalPageNumber} / 現在 P.${index + 1}`;

  return `
    <li class="page-map__item ${isActive ? 'page-map__item--active' : ''}">
      <button class="page-map__button" data-page-map-id="${page.id}" title="${escapeHtml(title)}">
        <span class="page-map__number">${index + 1}</span>
        <span class="page-map__text">
          ${renderPageMapFileName(page.fileName)}
          <span class="page-map__meta">元 P.${page.originalPageNumber} / 回転 ${page.rotation}°</span>
        </span>
        ${duplicateLabel}
      </button>
    </li>
  `;
}

export function renderExplorer(root, context) {
  const files = context.state.files;
  const pages = context.state.pages;

  root.innerHTML = `
    <div class="panel__header">
      <span class="material-symbols-outlined" aria-hidden="true">account_tree</span>
      <span>Page Map</span>
    </div>
    ${
      pages.length === 0
        ? `<div class="empty-state empty-state--small">
            <span class="material-symbols-outlined" aria-hidden="true">note_add</span>
            <p>PDFを追加すると、ここに現在のページ順が表示されます。</p>
          </div>`
        : `<div class="page-map">
            <div class="page-map__summary">
              <strong>${pages.length}ページ</strong>
              <span>${files.length}ファイル</span>
            </div>
            <ol class="page-map__list">
              ${pages.map((page, index) => renderPageMapItem(page, index, context.state.selectedPageId)).join('')}
            </ol>
          </div>`
    }
  `;

  root.querySelectorAll('[data-page-map-id]').forEach((button) => {
    button.addEventListener('click', () => {
      context.actions.jumpToPage(button.dataset.pageMapId);
    });
  });
}
