import { renderRibbon } from './ribbon.js';
import { renderExplorer } from './explorer.js';
import { renderCanvas } from './canvas.js';
import { renderProperties } from './properties.js';
import { renderStatusBar } from './statusbar.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) return false;

  return Boolean(target.closest('input, textarea, select, [contenteditable="true"], [contenteditable=""]'));
}

function handleShortcut(event, context) {
  const key = event.key.toLowerCase();
  const modifier = event.metaKey || event.ctrlKey;

  if (event.key === 'Escape' && context.state.previewPageId) {
    event.preventDefault();
    context.actions.closePreview();
    return;
  }

  if (context.state.previewPageId) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      context.actions.previewAdjacentPage(event.key === 'ArrowRight' ? 1 : -1);
      return;
    }

    if (event.key === 'Delete' || event.key === 'Backspace' || modifier) {
      event.preventDefault();
    }
    return;
  }

  if (event.key === 'Escape' && context.state.dialog) {
    event.preventDefault();
    context.actions.closeDialog();
    return;
  }

  if (isEditableTarget(event.target)) {
    return;
  }

  if (modifier && key === 'a') {
    event.preventDefault();
    context.actions.selectAll();
    return;
  }
  if (modifier && key === 'z' && !event.shiftKey) {
    event.preventDefault();
    context.actions.undo();
    return;
  }
  if ((modifier && key === 'y') || (modifier && event.shiftKey && key === 'z')) {
    event.preventDefault();
    context.actions.redo();
    return;
  }
  if (modifier && key === 'd') {
    event.preventDefault();
    context.actions.duplicateSelected();
    return;
  }
  if (event.key === 'Delete' || event.key === 'Backspace') {
    if (context.state.selectedPageIds.size > 0) {
      event.preventDefault();
      context.actions.deleteSelected();
    }
  }
  if (event.key === 'Escape') {
    context.actions.closeContextMenu();
    context.actions.clearSelection();
  }
}

function renderDialog(context) {
  const dialog = context.state.dialog;
  if (!dialog) return '';

  if (dialog.type === 'move-to-page') {
    const maxPage = context.state.pages.length;
    const selectedCount = context.state.selectedPageIds.size;
    const value = dialog.value ?? '1';
    const error = dialog.error ?? '';

    return `
      <div class="modal-backdrop" data-dialog-backdrop>
        <section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="move-dialog-title">
          <form data-dialog-form="move-to-page">
            <div class="modal-card__header">
              <div>
                <h2 id="move-dialog-title">指定ページへ移動</h2>
                <p>${selectedCount}ページを、指定したページ番号へ移動します。</p>
              </div>
              <button class="modal-card__close" type="button" data-dialog-cancel aria-label="閉じる">
                <span class="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>

            <label class="field-row" for="move-to-page-input">
              <span class="field-row__label">移動先ページ</span>
              <input
                id="move-to-page-input"
                name="pageNumber"
                type="number"
                min="1"
                max="${maxPage}"
                step="1"
                value="${value}"
                inputmode="numeric"
                autocomplete="off"
              />
            </label>

            <p class="modal-card__hint">入力範囲: 1〜${maxPage}</p>
            ${error ? `<p class="modal-card__error" role="alert">${error}</p>` : ''}

            <div class="modal-card__actions">
              <button class="secondary-button" type="button" data-dialog-cancel>キャンセル</button>
              <button class="primary-action-button" type="submit">移動</button>
            </div>
          </form>
        </section>
      </div>
    `;
  }


  if (dialog.type === 'export-pdf') {
    const value = escapeHtml(dialog.value ?? '');
    const error = dialog.error ?? '';
    const pageCount = context.state.pages.length;

    return `
      <div class="modal-backdrop" data-dialog-backdrop>
        <section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="export-dialog-title">
          <form data-dialog-form="export-pdf">
            <div class="modal-card__header">
              <div>
                <h2 id="export-dialog-title">PDFを作成</h2>
                <p>現在のページ順で ${pageCount}ページのPDFを書き出します。</p>
              </div>
              <button class="modal-card__close" type="button" data-dialog-cancel aria-label="閉じる">
                <span class="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>

            <label class="field-row" for="export-file-name-input">
              <span class="field-row__label">ファイル名</span>
              <input
                id="export-file-name-input"
                name="fileName"
                type="text"
                value="${value}"
                autocomplete="off"
                spellcheck="false"
              />
            </label>

            <p class="modal-card__hint">拡張子 .pdf は省略しても自動で追加します。</p>
            ${error ? `<p class="modal-card__error" role="alert">${escapeHtml(error)}</p>` : ''}

            <div class="modal-card__actions">
              <button class="secondary-button" type="button" data-dialog-cancel>キャンセル</button>
              <button class="primary-action-button" type="submit">作成</button>
            </div>
          </form>
        </section>
      </div>
    `;
  }

  return '';
}

function getPreviewImageStyle(page) {
  const rotation = ((Number(page.rotation) % 360) + 360) % 360;
  return `transform: rotate(${rotation}deg);`;
}

function renderPreviewDialog(context) {
  const pageId = context.state.previewPageId;
  if (!pageId) return '';

  const page = context.state.pages.find((item) => item.id === pageId);
  if (!page) return '';

  const currentIndex = context.state.pages.findIndex((item) => item.id === pageId);
  const title = `${currentIndex + 1}ページ目プレビュー`;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < context.state.pages.length - 1;
  const imageUrl = context.state.previewImageUrl || page.thumbnailUrl;
  const imageContent = context.state.previewLoading
    ? `<div class="preview-card__loading" role="status">
        <span class="material-symbols-outlined" aria-hidden="true">progress_activity</span>
        <strong>プレビューを生成中...</strong>
      </div>`
    : `<img class="preview-card__image" src="${imageUrl}" alt="${escapeHtml(page.fileName)} P.${page.originalPageNumber}" style="${getPreviewImageStyle(page)}" />`;

  return `
    <div class="modal-backdrop modal-backdrop--preview" data-preview-backdrop>
      <section class="preview-card" role="dialog" aria-modal="true" aria-labelledby="preview-title">
        <div class="preview-card__header">
          <div class="preview-card__title-block">
            <span class="preview-card__eyebrow">Thumbnail Preview</span>
            <h2 id="preview-title">${escapeHtml(title)}</h2>
            <p class="preview-card__file-name" title="${escapeHtml(page.fileName)}">${escapeHtml(page.fileName)}</p>
            <div class="preview-card__meta-grid" aria-label="ページ情報">
              <span><strong>現在</strong>P.${currentIndex + 1}</span>
              <span><strong>元ページ</strong>P.${page.originalPageNumber}</span>
              <span><strong>回転</strong>${page.rotation}°</span>
            </div>
          </div>
          <button class="modal-card__close" type="button" data-preview-close aria-label="閉じる">
            <span class="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>
        <div class="preview-card__body">
          ${imageContent}
        </div>
        <div class="preview-card__footer">
          <p class="preview-card__hint">← → で前後ページ / Esc・背景クリック・× で閉じます。</p>
          <div class="preview-card__nav" aria-label="プレビュー内ページ移動">
            <button class="secondary-button preview-card__nav-button" type="button" data-preview-prev ${hasPrevious ? '' : 'disabled'}>
              <span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
              前へ
            </button>
            <button class="secondary-button preview-card__nav-button" type="button" data-preview-next ${hasNext ? '' : 'disabled'}>
              次へ
              <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function bindPreview(root, context) {
  const modalRoot = root.querySelector('#modal-root');
  if (!modalRoot) return;

  modalRoot.querySelectorAll('[data-preview-close]').forEach((button) => {
    button.addEventListener('click', () => context.actions.closePreview());
  });

  modalRoot.querySelector('[data-preview-prev]')?.addEventListener('click', () => {
    context.actions.previewAdjacentPage(-1);
  });

  modalRoot.querySelector('[data-preview-next]')?.addEventListener('click', () => {
    context.actions.previewAdjacentPage(1);
  });

  const backdrop = modalRoot.querySelector('[data-preview-backdrop]');
  backdrop?.addEventListener('click', (event) => {
    if (event.target === backdrop) context.actions.closePreview();
  });
}

function bindDialog(root, context) {
  const modalRoot = root.querySelector('#modal-root');
  if (!modalRoot) return;

  modalRoot.querySelectorAll('[data-dialog-cancel]').forEach((button) => {
    button.addEventListener('click', () => context.actions.closeDialog());
  });

  const backdrop = modalRoot.querySelector('[data-dialog-backdrop]');
  backdrop?.addEventListener('click', (event) => {
    if (event.target === backdrop) context.actions.closeDialog();
  });

  const moveForm = modalRoot.querySelector('[data-dialog-form="move-to-page"]');
  moveForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(moveForm);
    context.actions.submitMoveToPageDialog(formData.get('pageNumber'));
  });

  const exportForm = modalRoot.querySelector('[data-dialog-form="export-pdf"]');
  exportForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(exportForm);
    context.actions.submitExportPdfDialog(formData.get('fileName'));
  });

  const input = modalRoot.querySelector('#move-to-page-input, #export-file-name-input');
  if (input) {
    window.requestAnimationFrame(() => {
      input.focus();
      input.select();
    });
  }
}

export function renderShell(root, context) {
  root.innerHTML = `
    <div class="app-shell" id="app-shell">
      <header class="title-bar">
        <div class="title-bar__brand">
          <span class="material-symbols-outlined" aria-hidden="true">picture_as_pdf</span>
          <span>PDF Utility</span>
          <span class="app-version">v${context.state.version}</span>
        </div>
      </header>

      <nav class="menu-bar" aria-label="Main menu">
        <button class="menu-bar__item">ファイル</button>
        <button class="menu-bar__item">編集</button>
        <button class="menu-bar__item">表示</button>
        <button class="menu-bar__item">ツール</button>
        <button class="menu-bar__item">ヘルプ</button>
      </nav>

      <section class="ribbon" id="ribbon"></section>

      <main class="workspace">
        <aside class="panel explorer" id="explorer"></aside>
        <section class="canvas" id="canvas"></section>
        <aside class="panel properties" id="properties"></aside>
      </main>

      <footer class="status-bar" id="statusbar"></footer>
    </div>
    <div id="modal-root"></div>
  `;

  const renderAll = () => {
    const previousCanvasContent = document.querySelector('#canvas .canvas__content');
    const previousScrollTop = previousCanvasContent?.scrollTop ?? 0;
    const previousScrollLeft = previousCanvasContent?.scrollLeft ?? 0;

    renderRibbon(document.querySelector('#ribbon'), context);
    renderExplorer(document.querySelector('#explorer'), context);
    renderCanvas(document.querySelector('#canvas'), context);
    renderProperties(document.querySelector('#properties'), context);
    renderStatusBar(document.querySelector('#statusbar'), context);

    const modalRoot = document.querySelector('#modal-root');
    if (modalRoot) {
      modalRoot.innerHTML = renderDialog(context) || renderPreviewDialog(context);
      bindDialog(root, context);
      bindPreview(root, context);
    }

    const nextCanvasContent = document.querySelector('#canvas .canvas__content');
    if (nextCanvasContent && context.state.pages.length > 0) {
      if (context.state.scrollToPageId) {
        const target = nextCanvasContent.querySelector(`[data-page-id="${context.state.scrollToPageId}"]`);
        target?.scrollIntoView({ block: 'center', inline: 'nearest' });
        context.state.scrollToPageId = null;
      } else {
        nextCanvasContent.scrollTop = previousScrollTop;
        nextCanvasContent.scrollLeft = previousScrollLeft;
      }
    }
  };

  renderAll();
  context.eventBus.on('state:changed', renderAll);

  const shell = document.querySelector('#app-shell');
  shell.addEventListener('dragover', (event) => {
    event.preventDefault();
    shell.classList.add('app-shell--dragging');
  });
  shell.addEventListener('dragleave', (event) => {
    if (!shell.contains(event.relatedTarget)) {
      shell.classList.remove('app-shell--dragging');
    }
  });
  shell.addEventListener('drop', (event) => {
    event.preventDefault();
    shell.classList.remove('app-shell--dragging');
    context.actions.addPdfFiles(event.dataTransfer.files);
  });
  shell.addEventListener('click', (event) => {
    if (!event.target.closest('.context-menu') && !event.target.closest('.modal-card')) {
      context.actions.closeContextMenu();
    }
  });
  window.addEventListener('keydown', (event) => handleShortcut(event, context));
}
