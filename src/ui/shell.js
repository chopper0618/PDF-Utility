import { renderRibbon } from './ribbon.js';
import { renderExplorer } from './explorer.js';
import { renderCanvas } from './canvas.js';
import { renderProperties } from './properties.js';
import { renderStatusBar } from './statusbar.js';

function handleShortcut(event, context) {
  const key = event.key.toLowerCase();
  const modifier = event.metaKey || event.ctrlKey;

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
    if (!event.target.closest('.context-menu')) {
      context.actions.closeContextMenu();
    }
  });
  window.addEventListener('keydown', (event) => handleShortcut(event, context));
}
