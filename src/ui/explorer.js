function formatBytes(bytes) {
  if (!bytes) return '0 KB';
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function renderPageMapItem(page, index, selectedPageId) {
  const isActive = page.id === selectedPageId;
  const duplicateLabel = page.duplicateOf ? '<span class="page-map__badge">複製</span>' : '';

  return `
    <li class="page-map__item ${isActive ? 'page-map__item--active' : ''}">
      <button class="page-map__button" data-page-map-id="${page.id}" title="${page.fileName} / 元 P.${page.originalPageNumber}">
        <span class="page-map__number">${index + 1}</span>
        <span class="page-map__text">
          <span class="page-map__file">${page.fileName}</span>
          <span class="page-map__meta">元 P.${page.originalPageNumber} / 回転 ${page.rotation}°</span>
        </span>
        ${duplicateLabel}
      </button>
    </li>
  `;
}

function renderFileSummary(files) {
  if (files.length === 0) return '';

  return `
    <div class="page-map__files" aria-label="読み込み済みファイル">
      ${files
        .map(
          (file) => `
            <details class="file-tree__file" open>
              <summary>
                <span class="material-symbols-outlined" aria-hidden="true">picture_as_pdf</span>
                <span class="file-tree__name" title="${file.name}">${file.name}</span>
              </summary>
              <div class="file-tree__meta">${file.pageCount}ページ / ${formatBytes(file.byteLength)}</div>
            </details>
          `,
        )
        .join('')}
    </div>
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
            ${renderFileSummary(files)}
          </div>`
    }
  `;

  root.querySelectorAll('[data-page-map-id]').forEach((button) => {
    button.addEventListener('click', () => {
      context.actions.jumpToPage(button.dataset.pageMapId);
    });
  });
}
