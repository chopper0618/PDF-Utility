import { escapeHtml, renderShortFileName } from './fileName.js';


function normalizeRotation(rotation) {
  return ((Number(rotation) % 360) + 360) % 360;
}

function getThumbnailImageStyle(page, zoom) {
  const rotation = normalizeRotation(page.rotation);
  const pageWidth = Math.max(1, Number(page.width) || 1);
  const pageHeight = Math.max(1, Number(page.height) || 1);
  const availableSize = Math.max(72, Number(zoom) - 16);
  const isSideways = rotation === 90 || rotation === 270;

  const fitScale = isSideways
    ? Math.min(availableSize / pageHeight, availableSize / pageWidth)
    : Math.min(availableSize / pageWidth, availableSize / pageHeight);

  const displayWidth = Math.max(1, Math.floor(pageWidth * fitScale));
  const displayHeight = Math.max(1, Math.floor(pageHeight * fitScale));

  return [
    `width: ${displayWidth}px`,
    `height: ${displayHeight}px`,
    `transform: rotate(${rotation}deg)`,
  ].join('; ');
}

function renderThumbnail(page, index, zoom) {
  const duplicateLabel = page.duplicateOf ? '<span class="thumbnail-card__tag">複製</span>' : '';
  return `
    <article class="thumbnail-card ${page.selected ? 'thumbnail-card--selected' : ''}" draggable="true" tabindex="0" data-page-id="${page.id}" title="${escapeHtml(page.fileName)}">
      <div class="thumbnail-card__header">
        <span class="thumbnail-card__number">${index + 1}</span>
        ${duplicateLabel}
      </div>
      <div class="thumbnail-card__actions" aria-label="ページ操作">
        <button class="thumb-action" data-page-action="rotate-left" data-page-id="${page.id}" title="左回転" aria-label="左回転">
          <span class="material-symbols-outlined" aria-hidden="true">rotate_left</span>
        </button>
        <button class="thumb-action" data-page-action="rotate-right" data-page-id="${page.id}" title="右回転" aria-label="右回転">
          <span class="material-symbols-outlined" aria-hidden="true">rotate_right</span>
        </button>
        <button class="thumb-action" data-page-action="duplicate" data-page-id="${page.id}" title="複製" aria-label="複製">
          <span class="material-symbols-outlined" aria-hidden="true">content_copy</span>
        </button>
        <button class="thumb-action thumb-action--danger" data-page-action="delete" data-page-id="${page.id}" title="削除" aria-label="削除">
          <span class="material-symbols-outlined" aria-hidden="true">delete</span>
        </button>
      </div>
      <div class="thumbnail-card__image-wrap">
        <img class="thumbnail-card__image" style="${getThumbnailImageStyle(page, zoom)}" src="${page.thumbnailUrl}" alt="${escapeHtml(page.fileName)} P.${page.originalPageNumber}" />
      </div>
      <div class="thumbnail-card__meta">
        ${renderShortFileName(page.fileName, 'thumbnail-card__file', 18)}
        <span>元 P.${page.originalPageNumber} / 回転 ${page.rotation}°</span>
      </div>
    </article>
  `;
}

function renderContextMenu(contextMenu) {
  if (!contextMenu) return '';
  return `
    <div class="context-menu" style="left:${contextMenu.x}px; top:${contextMenu.y}px" role="menu">
      <button data-context-action="rotate-left"><span class="material-symbols-outlined">rotate_left</span>左回転</button>
      <button data-context-action="rotate-right"><span class="material-symbols-outlined">rotate_right</span>右回転</button>
      <hr />
      <button data-context-action="duplicate"><span class="material-symbols-outlined">content_copy</span>複製</button>
      <button data-context-action="delete" class="context-menu__danger"><span class="material-symbols-outlined">delete</span>削除</button>
    </div>
  `;
}

function renderLoading(state) {
  return `
    <div class="loading-card">
      <span class="material-symbols-outlined loading-card__icon" aria-hidden="true">progress_activity</span>
      <strong>PDF読込中</strong>
      <p>${state.status}</p>
    </div>
  `;
}

function clearDropIndicators(root) {
  root.querySelectorAll('.thumbnail-card--drop-before, .thumbnail-card--drop-after').forEach((item) => {
    item.classList.remove('thumbnail-card--drop-before', 'thumbnail-card--drop-after');
    delete item.dataset.dropPosition;
  });
}

function getDropPosition(card, event) {
  const rect = card.getBoundingClientRect();
  return event.clientX < rect.left + rect.width / 2 ? 'before' : 'after';
}

function createAutoScroller(scrollContainer) {
  const threshold = 96;
  const maxSpeed = 24;
  let speed = 0;
  let frameId = null;

  const stop = () => {
    speed = 0;
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  };

  const tick = () => {
    if (speed === 0) {
      frameId = null;
      return;
    }
    scrollContainer.scrollTop += speed;
    frameId = requestAnimationFrame(tick);
  };

  const update = (event) => {
    const rect = scrollContainer.getBoundingClientRect();
    const distanceToTop = event.clientY - rect.top;
    const distanceToBottom = rect.bottom - event.clientY;

    if (distanceToTop >= 0 && distanceToTop < threshold) {
      speed = -Math.ceil(((threshold - distanceToTop) / threshold) * maxSpeed);
    } else if (distanceToBottom >= 0 && distanceToBottom < threshold) {
      speed = Math.ceil(((threshold - distanceToBottom) / threshold) * maxSpeed);
    } else {
      speed = 0;
    }

    if (speed !== 0 && frameId === null) {
      frameId = requestAnimationFrame(tick);
    }
    if (speed === 0 && frameId !== null) {
      stop();
    }
  };

  return { update, stop };
}

export function renderCanvas(root, context) {
  const pages = context.state.pages;
  root.innerHTML = `
    <div class="canvas__toolbar">
      <div>
        <span class="canvas__title">Thumbnails</span>
        <span class="canvas__subtitle">${pages.length}ページ</span>
      </div>
      <div class="zoom-control zoom-control--slider" aria-label="サムネイルサイズ">
        <span class="zoom-control__label">小</span>
        <input
          type="range"
          min="120"
          max="280"
          step="20"
          value="${context.state.zoom}"
          data-zoom-range
          aria-label="サムネイルサイズ"
        />
        <span class="zoom-control__label">大</span>
        <span class="zoom-control__value">${context.state.zoom}px</span>
      </div>
    </div>
    <div class="canvas__content ${pages.length > 0 ? 'canvas__content--grid' : ''}" style="--thumbnail-width:${context.state.zoom}px; --thumbnail-image-height:${context.state.zoom}px;">
      ${
        context.state.isLoading
          ? renderLoading(context.state)
          : pages.length === 0
            ? `<div class="welcome-card">
                <span class="material-symbols-outlined welcome-card__icon" aria-hidden="true">picture_as_pdf</span>
                <h1>PDF Utility</h1>
                <p>PDFを追加して、ページの整理・結合・出力を行います。</p>
                <p class="muted">v0.4.3-alphaではホバー操作・選択表示・サムネイルサイズ変更を改善しました。</p>
              </div>`
            : `<div class="thumbnail-grid">
                ${pages.map((page, index) => renderThumbnail(page, index, context.state.zoom)).join('')}
              </div>`
      }
    </div>
    ${renderContextMenu(context.state.contextMenu)}
  `;

  root.querySelector('[data-zoom-range]')?.addEventListener('input', (event) => {
    context.actions.setZoom(event.target.value);
  });

  const canvasContent = root.querySelector('.canvas__content');
  const autoScroller = canvasContent ? createAutoScroller(canvasContent) : null;

  canvasContent?.addEventListener('dragover', (event) => {
    if (event.dataTransfer?.types?.includes('Files')) return;
    event.preventDefault();
    event.stopPropagation();
    autoScroller?.update(event);
  });
  canvasContent?.addEventListener('dragleave', (event) => {
    if (!canvasContent.contains(event.relatedTarget)) {
      autoScroller?.stop();
    }
  });
  canvasContent?.addEventListener('drop', () => {
    autoScroller?.stop();
  });

  root.querySelectorAll('.thumbnail-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('[data-page-action]')) return;
      context.actions.selectPage(card.dataset.pageId, event);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        context.actions.selectPage(card.dataset.pageId, event);
      }
    });
    card.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      context.actions.openContextMenu(card.dataset.pageId, event.clientX, event.clientY);
    });
    card.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', card.dataset.pageId);
      event.dataTransfer.effectAllowed = 'move';
      card.classList.add('thumbnail-card--dragging');
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('thumbnail-card--dragging');
      clearDropIndicators(root);
      autoScroller?.stop();
    });
    card.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.stopPropagation();
      autoScroller?.update(event);
      const position = getDropPosition(card, event);
      clearDropIndicators(root);
      card.dataset.dropPosition = position;
      card.classList.add(position === 'before' ? 'thumbnail-card--drop-before' : 'thumbnail-card--drop-after');
    });
    card.addEventListener('dragleave', (event) => {
      if (card.contains(event.relatedTarget)) return;
      card.classList.remove('thumbnail-card--drop-before', 'thumbnail-card--drop-after');
      delete card.dataset.dropPosition;
    });
    card.addEventListener('drop', (event) => {
      event.preventDefault();
      event.stopPropagation();
      autoScroller?.stop();
      const position = card.dataset.dropPosition ?? 'before';
      clearDropIndicators(root);
      context.actions.reorderPage(event.dataTransfer.getData('text/plain'), card.dataset.pageId, position);
    });
  });

  root.querySelectorAll('[data-page-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const pageId = button.dataset.pageId;
      switch (button.dataset.pageAction) {
        case 'rotate-left':
          context.actions.rotateSelected(-90, pageId);
          break;
        case 'rotate-right':
          context.actions.rotateSelected(90, pageId);
          break;
        case 'duplicate':
          context.actions.duplicateSelected(pageId);
          break;
        case 'delete':
          context.actions.deleteSelected(pageId);
          break;
        default:
          break;
      }
    });
  });

  root.querySelectorAll('[data-context-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const pageId = context.state.contextMenu?.pageId;
      switch (button.dataset.contextAction) {
        case 'rotate-left':
          context.actions.rotateSelected(-90, pageId);
          break;
        case 'rotate-right':
          context.actions.rotateSelected(90, pageId);
          break;
        case 'duplicate':
          context.actions.duplicateSelected(pageId);
          break;
        case 'delete':
          context.actions.deleteSelected(pageId);
          break;
        default:
          break;
      }
      context.actions.closeContextMenu();
    });
  });
}
