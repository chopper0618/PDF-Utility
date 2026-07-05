import { getFileById, getSelectedPage, getSelectedPages } from '../core/state.js';

function getPageSizeLabel(page) {
  if (!page) return '-';
  const widthMm = Math.round((page.width / 72) * 25.4);
  const heightMm = Math.round((page.height / 72) * 25.4);
  return `${widthMm} × ${heightMm} mm`;
}

function getOrientationLabel(page) {
  if (!page) return '-';
  const normalizedRotation = page.rotation % 180;
  const visibleWidth = normalizedRotation === 0 ? page.width : page.height;
  const visibleHeight = normalizedRotation === 0 ? page.height : page.width;
  return visibleWidth > visibleHeight ? '横' : '縦';
}

function getCurrentPageIndex(state, page) {
  if (!page) return '-';
  return state.pages.findIndex((item) => item.id === page.id) + 1;
}

export function renderProperties(root, context) {
  const selectedPage = getSelectedPage(context.state);
  const selectedPages = getSelectedPages(context.state);
  const selectedFile = selectedPage ? getFileById(selectedPage.fileId, context.state) : null;
  const selectedCount = context.state.selectedPageIds.size;

  root.innerHTML = `
    <div class="panel__header">
      <span class="material-symbols-outlined" aria-hidden="true">tune</span>
      <span>Properties</span>
    </div>
    <div class="property-section">
      <h3>選択</h3>
      <div class="property-list">
        <div class="property-row property-row--strong">
          <span>選択中</span>
          <strong>${selectedCount > 1 ? `${selectedCount}ページ` : selectedPage ? `${getCurrentPageIndex(context.state, selectedPage)}ページ目` : 'なし'}</strong>
        </div>
        <div class="property-row">
          <span>出力予定</span>
          <strong>${context.state.pages.length}ページ</strong>
        </div>
        <div class="property-row property-row--file">
          <span>元ファイル</span>
          <strong class="property-value--file" title="${selectedFile?.name ?? ''}">${selectedFile?.name ?? '-'}</strong>
        </div>
        <div class="property-row">
          <span>元ページ</span>
          <strong>${selectedPage ? `P.${selectedPage.originalPageNumber}` : '-'}</strong>
        </div>
      </div>
    </div>

    <div class="property-section">
      <h3>ページ</h3>
      <div class="property-list">
        <div class="property-row">
          <span>ページサイズ</span>
          <strong>${getPageSizeLabel(selectedPage)}</strong>
        </div>
        <div class="property-row">
          <span>向き</span>
          <strong>${getOrientationLabel(selectedPage)}</strong>
        </div>
        <div class="property-row">
          <span>回転</span>
          <strong>${selectedPages.length > 1 ? '複数' : selectedPage ? `${selectedPage.rotation}°` : '-'}</strong>
        </div>
      </div>
    </div>

    <div class="property-section">
      <h3>履歴</h3>
      <div class="property-list">
        <div class="property-row">
          <span>Undo</span>
          <strong>${context.state.history.undo.length}</strong>
        </div>
        <div class="property-row">
          <span>Redo</span>
          <strong>${context.state.history.redo.length}</strong>
        </div>
      </div>
    </div>

    <div class="property-section">
      <h3>出力</h3>
      <div class="property-list">
        <div class="property-row">
          <span>画質</span>
          <strong>元画質</strong>
        </div>
      </div>
      <button class="primary-button" data-action="export-pdf" ${context.state.pages.length === 0 ? 'disabled' : ''}>
        <span class="material-symbols-outlined" aria-hidden="true">download</span>
        PDF作成
      </button>
    </div>
  `;

  root.querySelector('[data-action="export-pdf"]')?.addEventListener('click', () => {
    context.actions.exportPdf();
  });
}
