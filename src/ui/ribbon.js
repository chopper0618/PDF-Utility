function getActions(context) {
  const hasPages = context.state.pages.length > 0;
  const hasSelection = context.state.selectedPageIds.size > 0;
  const canUndo = context.state.history.undo.length > 0;
  const canRedo = context.state.history.redo.length > 0;
  const zoom = Number(context.state.zoom ?? 180);

  return {
    file: [
      {
        id: 'add-pdf',
        icon: 'upload_file',
        label: 'PDF追加',
        hint: 'PCからPDFを追加します',
        shortcut: '⌘O',
        disabled: false,
        primary: true,
      },
      {
        id: 'export-pdf',
        icon: 'download',
        label: 'PDF作成',
        hint: '現在のページ順でPDFを作成します',
        disabled: !hasPages,
        primary: true,
      },
    ],
    edit: [
      {
        id: 'undo',
        icon: 'undo',
        label: 'Undo',
        hint: '元に戻します',
        shortcut: '⌘Z',
        disabled: !canUndo,
      },
      {
        id: 'redo',
        icon: 'redo',
        label: 'Redo',
        hint: 'やり直します',
        shortcut: '⌘Y',
        disabled: !canRedo,
      },
      {
        id: 'select-all',
        icon: 'select_all',
        label: '全選択',
        hint: 'すべてのページを選択します',
        shortcut: '⌘A',
        disabled: !hasPages,
      },
      {
        id: 'clear-selection',
        icon: 'deselect',
        label: '解除',
        hint: 'ページ選択を解除します',
        disabled: !hasSelection,
      },
    ],
    page: [
      {
        id: 'rotate-left',
        icon: 'rotate_left',
        label: '左回転',
        hint: '選択ページを左に90°回転します',
        disabled: !hasSelection,
      },
      {
        id: 'rotate-right',
        icon: 'rotate_right',
        label: '右回転',
        hint: '選択ページを右に90°回転します',
        disabled: !hasSelection,
      },
      {
        id: 'duplicate',
        icon: 'content_copy',
        label: '複製',
        hint: '選択ページを複製します',
        shortcut: '⌘D',
        disabled: !hasSelection,
      },
      {
        id: 'delete',
        icon: 'delete',
        label: '削除',
        hint: '選択ページを削除します',
        shortcut: 'Delete',
        disabled: !hasSelection,
        danger: true,
      },
      {
        id: 'move-to-page',
        icon: 'drive_file_move',
        label: '移動...',
        hint: '選択ページを指定したページ番号へ移動します',
        disabled: !hasSelection,
      },
      {
        id: 'move-start',
        icon: 'vertical_align_top',
        label: '先頭へ',
        hint: '選択ページを先頭へ移動します',
        disabled: !hasSelection,
      },
      {
        id: 'move-end',
        icon: 'vertical_align_bottom',
        label: '末尾へ',
        hint: '選択ページを末尾へ移動します',
        disabled: !hasSelection,
      },
    ],
    view: [
      {
        id: 'zoom-out',
        icon: 'zoom_out',
        label: '縮小',
        hint: 'サムネイルを小さくします',
        disabled: zoom <= 120,
      },
      {
        id: 'zoom-in',
        icon: 'zoom_in',
        label: '拡大',
        hint: 'サムネイルを大きくします',
        disabled: zoom >= 280,
      },
    ],
  };
}

function runAction(context, actionId, input) {
  switch (actionId) {
    case 'add-pdf':
      input.click();
      break;
    case 'export-pdf':
      context.actions.exportPdf();
      break;
    case 'undo':
      context.actions.undo();
      break;
    case 'redo':
      context.actions.redo();
      break;
    case 'select-all':
      context.actions.selectAll();
      break;
    case 'clear-selection':
      context.actions.clearSelection();
      break;
    case 'rotate-left':
      context.actions.rotateSelected(-90);
      break;
    case 'rotate-right':
      context.actions.rotateSelected(90);
      break;
    case 'duplicate':
      context.actions.duplicateSelected();
      break;
    case 'delete':
      context.actions.deleteSelected();
      break;
    case 'move-to-page':
      context.actions.promptMoveSelectedToPage();
      break;
    case 'move-start':
      context.actions.moveSelectedToEdge('start');
      break;
    case 'move-end':
      context.actions.moveSelectedToEdge('end');
      break;
    case 'zoom-out':
      context.actions.setZoom(context.state.zoom - 20);
      break;
    case 'zoom-in':
      context.actions.setZoom(context.state.zoom + 20);
      break;
    default:
      break;
  }
}

function getTooltip(action) {
  return action.shortcut ? `${action.hint ?? action.label}\n${action.shortcut}` : (action.hint ?? action.label);
}

function renderButton(action) {
  const classes = [
    'ribbon-button',
    action.danger ? 'ribbon-button--danger' : '',
    action.primary ? 'ribbon-button--primary' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <button
      data-action="${action.id}"
      class="${classes}"
      ${action.disabled ? 'disabled' : ''}
      title="${getTooltip(action)}"
      aria-label="${action.label}"
    >
      <span class="material-symbols-outlined ribbon-button__icon" aria-hidden="true">${action.icon}</span>
      <span class="ribbon-button__label">${action.label}</span>
    </button>
  `;
}

function renderGroup(title, actions) {
  return `
    <div class="ribbon-group" aria-label="${title}">
      <div class="ribbon-group__buttons">
        ${actions.map((action) => renderButton(action)).join('')}
      </div>
      <div class="ribbon-group__title">${title}</div>
    </div>
  `;
}

export function renderRibbon(root, context) {
  const groups = getActions(context);

  root.innerHTML = `
    <input id="pdf-file-input" class="visually-hidden" type="file" accept="application/pdf,.pdf" multiple />
    ${renderGroup('ファイル', groups.file)}
    ${renderGroup('編集', groups.edit)}
    ${renderGroup('ページ', groups.page)}
    ${renderGroup('表示', groups.view)}
  `;

  const input = root.querySelector('#pdf-file-input');

  root.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => runAction(context, button.dataset.action, input));
  });

  input.addEventListener('change', (event) => {
    context.actions.addPdfFiles(event.target.files);
    event.target.value = '';
  });
}
