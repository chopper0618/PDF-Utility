function getInitialZoom() {
  try {
    const saved = Number(localStorage.getItem('pdfUtility.thumbnailZoom'));
    if (Number.isFinite(saved)) return Math.min(280, Math.max(120, saved));
  } catch {
    // localStorage may be unavailable in restricted environments.
  }
  return 180;
}

export const appState = {
  version: '0.8.4-alpha',
  files: [],
  pages: [],
  selectedPageIds: new Set(),
  selectedPageId: null,
  lastSelectedIndex: null,
  status: 'Ready',
  statusTone: 'default',
  isLoading: false,
  zoom: getInitialZoom(),
  history: {
    undo: [],
    redo: [],
    limit: 50,
  },
  contextMenu: null,
  dialog: null,
  previewPageId: null,
  previewImageUrl: null,
  previewLoading: false,
  scrollToPageId: null,
};

export function getSelectedPage(state = appState) {
  if (!state.selectedPageId) return null;
  return state.pages.find((page) => page.id === state.selectedPageId) ?? null;
}

export function getSelectedPages(state = appState) {
  return state.pages.filter((page) => state.selectedPageIds.has(page.id));
}

export function getFileById(fileId, state = appState) {
  return state.files.find((file) => file.id === fileId) ?? null;
}
