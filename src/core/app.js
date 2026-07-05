import { appState } from './state.js';
import { createEventBus } from './eventBus.js';
import { renderShell } from '../ui/shell.js';
import { loadPdfFile } from '../pdf/loader.js';
import { renderPageThumbnail } from '../pdf/thumbnail.js';

function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function requestRender(eventBus) {
  eventBus.emit('state:changed');
}

function setStatus(context, message) {
  context.state.status = message;
  requestRender(context.eventBus);
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
    setStatus(context, `${targetIds.length}ページを削除しました。`);
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
