import { escapeHtml, renderShortFileName } from './fileName.js';

function renderPageMapFileName(fileName) {
  return renderShortFileName(fileName, 'page-map__file', 18);
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
