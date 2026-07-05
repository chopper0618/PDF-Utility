function getActions(context) {
  const hasPages = context.state.pages.length > 0;
  const hasSelection = context.state.selectedPageIds.size > 0;
  return {
    file: [
      { id: 'add-pdf', icon: 'upload_file', label: 'PDF追加', hint: 'PCからPDFを追加', disabled: false },
      { id: 'add-drive', icon: 'add_to_drive', label: 'Drive', hint: 'Google Driveから追加（未実装）', disabled: true },
    ],
    edit: [
      { id: 'undo', icon: 'undo', label: 'Undo', hint: '元に戻す', disabled: context.state.history.undo.length === 0 },
      { id: 'redo', icon: 'redo', label: 'Redo', hint: 'やり直し', disabled: context.state.history.redo.length === 0 },
      { id: 'select-all', icon: 'select_all', label: '全選択', hint: 'すべてのページを選択', disabled: !hasPages },
      { id: 'clear-selection', icon: 'deselect', label: '解除', hint: '選択解除', disabled: !hasSelection },
    ],
    page: [
      { id: 'rotate-left', icon: 'rotate_left', label: '左回転', hint: '選択ページを左に回転', disabled: !hasSelection },
      { id: 'rotate-right', icon: 'rotate_right', label: '右回転', hint: '選択ページを右に回転', disabled: !hasSelection },
      { id: 'duplicate', icon: 'content_copy', label: '複製', hint: '選択ページを複製', disabled: !hasSelection },
      { id: 'delete', icon: 'delete', label: '削除', hint: '選択ページを削除', disabled: !hasSelection, danger: true },
    ],
    output: [
      { id: 'export-pdf', icon: 'download', label: 'PDF作成', hint: 'PDF出力（未実装）', disabled: true, primary: true },
    ],
  };
}

function runAction(context, actionId, input) {
  switch (actionId) {
    case 'add-pdf':
      input.click();
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
    default:
      break;
  }
}

function renderButton(action) {
  return `
    <button data-action="${action.id}" class="ribbon-button ${action.danger ? 'ribbon-button--danger' : ''} ${action.primary ? 'ribbon-button--primary' : ''}" ${
      action.disabled ? 'disabled' : ''
    } title="${action.hint ?? action.label}" aria-label="${action.label}">
      <span class="material-symbols-outlined" aria-hidden="true">${action.icon}</span>
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
    ${renderGroup('出力', groups.output)}
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
