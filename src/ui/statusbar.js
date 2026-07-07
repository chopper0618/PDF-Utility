export function renderStatusBar(root, context) {
  const tone = context.state.statusTone === 'danger' ? 'danger' : 'default';

  root.innerHTML = `
    <span class="status-bar__message status-bar__message--${tone}">${context.state.status}</span>
    <span>Files: ${context.state.files.length}</span>
    <span>Pages: ${context.state.pages.length}</span>
  `;
}
