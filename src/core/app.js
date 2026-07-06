import { appState } from './state.js';
import { createEventBus } from './eventBus.js';
import { renderShell } from '../ui/shell.js';
import { loadPdfFile } from '../pdf/loader.js';
import { renderPageThumbnail } from '../pdf/thumbnail.js';
import { createMergedPdfBlob, downloadBlob, getSuggestedOutputFileName } from '../pdf/export.js';

function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function requestRender(eventBus) {
  eventBus.emit('state:changed');
}

function setStatus(context, message, tone = 'default') {
  context.state.status = message;
  context.state.statusTone = tone;
  requestRender(context.eventBus);
}

function getSelectedPagePosition(state) {
  const index = state.pages.findIndex((page) => page.id === state.selectedPageId);
  return index >= 0 ? index + 1 : 1;
}

function clonePages(pages) {
  return pages.map((page) => ({ ...page, selected: false }));
}

function snapshot(state) {
  return {
    pages: clonePages(state.pages),
    selectedPageIds: Array.from(state.selectedPageIds),
    selectedPageId: state.selectedPageId,
    lastSelectedIndex: state.lastSelectedIndex,
  };
}

function restoreSnapshot(state, snap) {
  state.pages = clonePages(snap.pages);
  state.selectedPageIds = new Set(snap.selectedPageIds);
  state.selectedPageId = snap.selectedPageId;
  state.lastSelectedIndex = snap.lastSelectedIndex;
  state.pages.forEach((page) => {
    page.selected = state.selectedPageIds.has(page.id);
  });
}

function pushHistory(context) {
  const history = context.state.history;
  history.undo.push(snapshot(context.state));
  if (history.undo.length > history.limit) history.undo.shift();
  history.redo = [];
}

function applySelectionState(state) {
  state.pages.forEach((page) => {
    page.selected = state.selectedPageIds.has(page.id);
  });
}

function selectOnly(state, pageId) {
  const index = state.pages.findIndex((page) => page.id === pageId);
  state.selectedPageIds = new Set([pageId]);
  state.selectedPageId = pageId;
  state.lastSelectedIndex = index;
  applySelectionState(state);
}

function selectRange(state, pageId) {
  const currentIndex = state.pages.findIndex((page) => page.id === pageId);
  if (currentIndex < 0) return;
  const startIndex = state.lastSelectedIndex ?? currentIndex;
  const [start, end] = [Math.min(startIndex, currentIndex), Math.max(startIndex, currentIndex)];
  state.selectedPageIds = new Set(state.pages.slice(start, end + 1).map((page) => page.id));
  state.selectedPageId = pageId;
  applySelectionState(state);
}

function toggleSelection(state, pageId) {
  if (state.selectedPageIds.has(pageId)) {
    state.selectedPageIds.delete(pageId);
    if (state.selectedPageId === pageId) {
      state.selectedPageId = Array.from(state.selectedPageIds).at(-1) ?? null;
    }
  } else {
    state.selectedPageIds.add(pageId);
    state.selectedPageId = pageId;
    state.lastSelectedIndex = state.pages.findIndex((page) => page.id === pageId);
  }
  applySelectionState(state);
}

function getTargetIds(state, pageId = null) {
  if (pageId && !state.selectedPageIds.has(pageId)) return [pageId];
  return Array.from(state.selectedPageIds);
}

function reorderPage(state, draggedId, targetId, position = 'before') {
  if (!draggedId || !targetId || draggedId === targetId) return false;
  const selectedIds = state.selectedPageIds.has(draggedId) ? Array.from(state.selectedPageIds) : [draggedId];
  const moving = state.pages.filter((page) => selectedIds.includes(page.id));
  const remaining = state.pages.filter((page) => !selectedIds.includes(page.id));
  const targetIndex = remaining.findIndex((page) => page.id === targetId);
  if (targetIndex < 0) return false;
  const insertIndex = position === 'after' ? targetIndex + 1 : targetIndex;
  remaining.splice(insertIndex, 0, ...moving);
  state.pages = remaining;
  return true;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function moveSelectedPagesToIndex(state, targetIndex) {
  if (!Number.isInteger(targetIndex) || state.selectedPageIds.size === 0) return false;

  const selectedIds = new Set(state.selectedPageIds);
  const firstSelectedIndex = state.pages.findIndex((page) => selectedIds.has(page.id));
  if (firstSelectedIndex < 0) return false;

  const moving = state.pages.filter((page) => selectedIds.has(page.id));
  const remaining = state.pages.filter((page) => !selectedIds.has(page.id));
  const currentInsertIndex = state.pages.slice(0, firstSelectedIndex).filter((page) => !selectedIds.has(page.id)).length;
  const maxInsertIndex = Math.max(0, state.pages.length - moving.length);
  const nextInsertIndex = clamp(targetIndex, 0, maxInsertIndex);

  if (nextInsertIndex === currentInsertIndex) return false;

  remaining.splice(nextInsertIndex, 0, ...moving);
  state.pages = remaining;
  state.lastSelectedIndex = state.pages.findIndex((page) => page.id === state.selectedPageId);
  return true;
}

function moveSelectedPagesToEdge(state, edge) {
  if (state.selectedPageIds.size === 0) return false;

  const selectedIds = new Set(state.selectedPageIds);
  const moving = state.pages.filter((page) => selectedIds.has(page.id));
  const remaining = state.pages.filter((page) => !selectedIds.has(page.id));
  const currentFirstIndex = state.pages.findIndex((page) => selectedIds.has(page.id));
  const nextPages = edge === 'end' ? [...remaining, ...moving] : [...moving, ...remaining];

  const nextFirstIndex = nextPages.findIndex((page) => selectedIds.has(page.id));
  if (nextFirstIndex === currentFirstIndex) return false;

  state.pages = nextPages;
  state.lastSelectedIndex = state.pages.findIndex((page) => page.id === state.selectedPageId);
  return true;
}

export function createApp(root) {
  if (!root) {
    throw new Error('App root element was not found.');
  }

  const eventBus = createEventBus();
  const context = {
    state: appState,
    eventBus,
    actions: {},
  };

  context.actions.addPdfFiles = async (fileList) => {
    const files = Array.from(fileList ?? []).filter(
      (file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'),
    );

    if (files.length === 0) {
      setStatus(context, 'PDFファイルが選択されていません。');
      return;
    }

    pushHistory(context);
    context.state.isLoading = true;
    setStatus(context, `${files.length}件のPDFを読み込み中...`);

    try {
      for (const file of files) {
        const fileId = createId('file');
        const loaded = await loadPdfFile(file);
        const fileRecord = {
          id: fileId,
          name: file.name,
          source: 'local',
          pageCount: loaded.pageCount,
          byteLength: loaded.byteLength,
          loadedAt: new Date().toISOString(),
          pdfDocument: loaded.document,
          originalBytes: loaded.originalBytes,
        };

        context.state.files.push(fileRecord);

        for (let pageNumber = 1; pageNumber <= loaded.pageCount; pageNumber += 1) {
          setStatus(context, `${file.name} ${pageNumber}/${loaded.pageCount} ページを処理中...`);
          const thumbnail = await renderPageThumbnail(loaded.document, pageNumber, context.state.zoom);
          context.state.pages.push({
            id: createId('page'),
            fileId,
            fileName: file.name,
            originalPageNumber: pageNumber,
            rotation: thumbnail.rotation,
            width: thumbnail.width,
            height: thumbnail.height,
            thumbnailUrl: thumbnail.dataUrl,
            selected: false,
            duplicateOf: null,
          });
        }
      }

      setStatus(context, `PDF読込完了: ${context.state.files.length}ファイル / ${context.state.pages.length}ページ`);
    } catch (error) {
      console.error(error);
      setStatus(context, `PDF読込エラー: ${error.message}`);
    } finally {
      context.state.isLoading = false;
      requestRender(eventBus);
    }
  };

  context.actions.selectPage = (pageId, options = {}) => {
    if (options.shiftKey) {
      selectRange(context.state, pageId);
    } else if (options.metaKey || options.ctrlKey) {
      toggleSelection(context.state, pageId);
    } else {
      selectOnly(context.state, pageId);
    }
    context.state.contextMenu = null;
    setStatus(context, `${context.state.selectedPageIds.size}ページを選択しました。`);
  };

  context.actions.jumpToPage = (pageId) => {
    if (!context.state.pages.some((page) => page.id === pageId)) return;
    selectOnly(context.state, pageId);
    context.state.scrollToPageId = pageId;
    context.state.contextMenu = null;
    const pageIndex = context.state.pages.findIndex((page) => page.id === pageId);
    setStatus(context, `${pageIndex + 1}ページ目へ移動しました。`);
  };

  context.actions.clearSelection = () => {
    context.state.selectedPageId = null;
    context.state.selectedPageIds.clear();
    context.state.lastSelectedIndex = null;
    applySelectionState(context.state);
    setStatus(context, '選択を解除しました。');
  };

  context.actions.selectAll = () => {
    context.state.selectedPageIds = new Set(context.state.pages.map((page) => page.id));
    context.state.selectedPageId = context.state.pages.at(-1)?.id ?? null;
    context.state.lastSelectedIndex = context.state.pages.length - 1;
    applySelectionState(context.state);
    setStatus(context, `${context.state.selectedPageIds.size}ページを選択しました。`);
  };

  context.actions.setZoom = (zoom) => {
    context.state.zoom = Math.min(280, Math.max(120, Number(zoom)));
    try {
      localStorage.setItem('pdfUtility.thumbnailZoom', String(context.state.zoom));
    } catch {
      // Ignore storage errors; zoom still works during the current session.
    }
    requestRender(eventBus);
  };

  context.actions.rotateSelected = (degrees, pageId = null) => {
    const targetIds = getTargetIds(context.state, pageId);
    if (targetIds.length === 0) return;
    pushHistory(context);
    context.state.pages.forEach((page) => {
      if (targetIds.includes(page.id)) {
        page.rotation = (page.rotation + degrees + 360) % 360;
      }
    });
    setStatus(context, `${targetIds.length}ページを回転しました。`);
  };

  context.actions.deleteSelected = (pageId = null) => {
    const targetIds = getTargetIds(context.state, pageId);
    if (targetIds.length === 0) return;
    pushHistory(context);
    context.state.pages = context.state.pages.filter((page) => !targetIds.includes(page.id));
    context.state.selectedPageIds.clear();
    context.state.selectedPageId = null;
    context.state.lastSelectedIndex = null;
    const count = targetIds.length;
    setStatus(context, `${count}ページを削除しました。Undoで元に戻せます。`, 'danger');
  };

  context.actions.duplicateSelected = (pageId = null) => {
    const targetIds = getTargetIds(context.state, pageId);
    if (targetIds.length === 0) return;
    pushHistory(context);
    const nextPages = [];
    const newIds = [];
    context.state.pages.forEach((page) => {
      nextPages.push(page);
      if (targetIds.includes(page.id)) {
        const duplicated = {
          ...page,
          id: createId('page'),
          selected: true,
          duplicateOf: page.duplicateOf ?? page.id,
        };
        nextPages.push(duplicated);
        newIds.push(duplicated.id);
      }
    });
    context.state.pages = nextPages;
    context.state.selectedPageIds = new Set(newIds);
    context.state.selectedPageId = newIds.at(-1) ?? null;
    applySelectionState(context.state);
    setStatus(context, `${newIds.length}ページを複製しました。`);
  };

  context.actions.reorderPage = (draggedId, targetId, position = 'before') => {
    pushHistory(context);
    const changed = reorderPage(context.state, draggedId, targetId, position);
    if (!changed) {
      context.state.history.undo.pop();
      return;
    }
    applySelectionState(context.state);
    setStatus(context, 'ページ順を変更しました。');
  };

  context.actions.moveSelectedToPageNumber = (pageNumber) => {
    if (context.state.selectedPageIds.size === 0) return false;
    const targetPageNumber = Number(pageNumber);
    if (!Number.isInteger(targetPageNumber) || targetPageNumber < 1 || targetPageNumber > context.state.pages.length) {
      setStatus(context, `1〜${context.state.pages.length}のページ番号を入力してください。`);
      return false;
    }

    pushHistory(context);
    const changed = moveSelectedPagesToIndex(context.state, targetPageNumber - 1);
    if (!changed) {
      context.state.history.undo.pop();
      setStatus(context, '指定した位置には移動できません。');
      return false;
    }
    applySelectionState(context.state);
    context.state.scrollToPageId = context.state.selectedPageId;
    const firstIndex = context.state.pages.findIndex((page) => context.state.selectedPageIds.has(page.id));
    setStatus(context, `${context.state.selectedPageIds.size}ページを${firstIndex + 1}ページ目へ移動しました。`);
    return true;
  };

  context.actions.moveSelectedToEdge = (edge) => {
    if (context.state.selectedPageIds.size === 0) return;
    pushHistory(context);
    const changed = moveSelectedPagesToEdge(context.state, edge);
    if (!changed) {
      context.state.history.undo.pop();
      setStatus(context, 'これ以上移動できません。');
      return;
    }
    applySelectionState(context.state);
    context.state.scrollToPageId = context.state.selectedPageId;
    setStatus(context, `${context.state.selectedPageIds.size}ページを${edge === 'start' ? '先頭' : '末尾'}へ移動しました。`);
  };

  context.actions.promptMoveSelectedToPage = () => {
    if (context.state.selectedPageIds.size === 0) return;
    context.state.dialog = {
      type: 'move-to-page',
      value: String(getSelectedPagePosition(context.state)),
      error: '',
    };
    context.state.contextMenu = null;
    requestRender(context.eventBus);
  };

  context.actions.closeDialog = () => {
    if (!context.state.dialog) return;
    context.state.dialog = null;
    setStatus(context, 'ページ移動をキャンセルしました。');
  };

  context.actions.submitMoveToPageDialog = (value) => {
    if (context.state.selectedPageIds.size === 0) {
      context.state.dialog = null;
      requestRender(context.eventBus);
      return;
    }

    const inputText = String(value ?? '').trim();
    const pageNumber = Number.parseInt(inputText, 10);
    if (!/^\d+$/.test(inputText) || pageNumber < 1 || pageNumber > context.state.pages.length) {
      context.state.dialog = {
        type: 'move-to-page',
        value: inputText,
        error: `1〜${context.state.pages.length}のページ番号を入力してください。`,
      };
      requestRender(context.eventBus);
      return;
    }

    context.state.dialog = null;
    context.actions.moveSelectedToPageNumber(pageNumber);
  };

  context.actions.undo = () => {
    const snap = context.state.history.undo.pop();
    if (!snap) return;
    context.state.history.redo.push(snapshot(context.state));
    restoreSnapshot(context.state, snap);
    setStatus(context, '元に戻しました。');
  };

  context.actions.redo = () => {
    const snap = context.state.history.redo.pop();
    if (!snap) return;
    context.state.history.undo.push(snapshot(context.state));
    restoreSnapshot(context.state, snap);
    setStatus(context, 'やり直しました。');
  };



  context.actions.exportPdf = async () => {
    if (context.state.pages.length === 0) {
      setStatus(context, '出力するページがありません。');
      return;
    }

    const suggestedName = getSuggestedOutputFileName(context.state);
    const inputName = window.prompt('出力ファイル名を入力してください。', suggestedName);
    if (inputName === null) {
      setStatus(context, 'PDF作成をキャンセルしました。');
      return;
    }

    context.state.isLoading = true;
    setStatus(context, 'PDFを作成中...');

    try {
      const blob = await createMergedPdfBlob(context.state);
      downloadBlob(blob, inputName);
      setStatus(context, `PDFを作成しました: ${context.state.pages.length}ページ`);
    } catch (error) {
      console.error(error);
      setStatus(context, `PDF作成エラー: ${error.message}`);
    } finally {
      context.state.isLoading = false;
      requestRender(eventBus);
    }
  };

  context.actions.openContextMenu = (pageId, x, y) => {
    if (!context.state.selectedPageIds.has(pageId)) {
      selectOnly(context.state, pageId);
    }
    context.state.contextMenu = { pageId, x, y };
    requestRender(eventBus);
  };

  context.actions.closeContextMenu = () => {
    if (!context.state.contextMenu) return;
    context.state.contextMenu = null;
    requestRender(eventBus);
  };

  renderShell(root, context);
  eventBus.emit('app:ready', { version: appState.version });
}
