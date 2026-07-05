export function renderStatusBar(root, context) {
  root.innerHTML = `
    <span>${context.state.status}</span>
    <span>Files: ${context.state.files.length}</span>
    <span>Pages: ${context.state.pages.length}</span>
  `;
}
