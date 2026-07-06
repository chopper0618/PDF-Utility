import { escapeHtml, renderSplitFileName } from './fileName.js';

function renderPageMapFileName(fileName) {
  return renderSplitFileName(fileName, 'page-map__file', {
    maxHeadLength: 7,
    maxTailLength: 8,
    splitThreshold: 14,
    minTailExtra: 3,
  });
}

function renderPageMapItem(page, index, selectedPageId) {
  const isActive = page.id === selectedPageId;
  const duplicateLabel = page.duplicateOf ? '<span class="page-map__badge">複製</span>' : '';
  const title = `${page.fileName} / 元 P.${page.originalPageNumber} / 現在 P.${index + 1}`;

  return `
    <li class="page-map__item ${isActive ? 'page-map__item--active' : ''}" draggable="true" data-page-map-item-id="${page.id}">
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

function clearPageMapDropIndicators(root) {
  root.querySelectorAll('.page-map__item--drop-before, .page-map__item--drop-after').forEach((item) => {
    item.classList.remove('page-map__item--drop-before', 'page-map__item--drop-after');
    delete item.dataset.dropPosition;
  });
}

function getPageMapDropPosition(item, event) {
  const rect = item.getBoundingClientRect();
  return event.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
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
            <ol class="page-map__list" data-page-map-list>
              ${pages.map((page, index) => renderPageMapItem(page, index, context.state.selectedPageId)).join('')}
            </ol>
          </div>`
    }
  `;

  let suppressedClickPageId = null;

  root.querySelectorAll('[data-page-map-id]').forEach((button) => {
    button.addEventListener('click', () => {
      if (suppressedClickPageId === button.dataset.pageMapId) return;
      context.actions.jumpToPage(button.dataset.pageMapId);
    });
  });

  root.querySelectorAll('[data-page-map-item-id]').forEach((item) => {
    item.addEventListener('dragstart', (event) => {
      const pageId = item.dataset.pageMapItemId;
      event.dataTransfer.setData('text/plain', pageId);
      event.dataTransfer.effectAllowed = 'move';
      item.classList.add('page-map__item--dragging');
      suppressedClickPageId = pageId;
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('page-map__item--dragging');
      clearPageMapDropIndicators(root);
      setTimeout(() => {
        suppressedClickPageId = null;
      }, 0);
    });

    item.addEventListener('dragover', (event) => {
      event.preventDefault();
      const position = getPageMapDropPosition(item, event);
      clearPageMapDropIndicators(root);
      item.dataset.dropPosition = position;
      item.classList.add(position === 'before' ? 'page-map__item--drop-before' : 'page-map__item--drop-after');
    });

    item.addEventListener('dragleave', (event) => {
      if (item.contains(event.relatedTarget)) return;
      item.classList.remove('page-map__item--drop-before', 'page-map__item--drop-after');
      delete item.dataset.dropPosition;
    });

    item.addEventListener('drop', (event) => {
      event.preventDefault();
      const draggedId = event.dataTransfer.getData('text/plain');
      const position = item.dataset.dropPosition ?? 'before';
      clearPageMapDropIndicators(root);
      context.actions.reorderPage(draggedId, item.dataset.pageMapItemId, position);
    });
  });
}
