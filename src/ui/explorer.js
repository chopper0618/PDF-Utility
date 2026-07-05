function formatBytes(bytes) {
  if (!bytes) return '0 KB';
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function renderExplorer(root, context) {
  const files = context.state.files;
  root.innerHTML = `
    <div class="panel__header">
      <span class="material-symbols-outlined" aria-hidden="true">folder</span>
      <span>Files</span>
    </div>
    ${
      files.length === 0
        ? `<div class="empty-state empty-state--small">
            <span class="material-symbols-outlined" aria-hidden="true">note_add</span>
            <p>PDFを追加すると、ここにファイルツリーが表示されます。</p>
          </div>`
        : `<div class="file-tree">
            ${files
              .map(
                (file) => `
                  <details class="file-tree__file" open>
                    <summary>
                      <span class="material-symbols-outlined" aria-hidden="true">picture_as_pdf</span>
                      <span class="file-tree__name" title="${file.name}">${file.name}</span>
                    </summary>
                    <div class="file-tree__meta">${file.pageCount}ページ / ${formatBytes(file.byteLength)}</div>
                    <ol class="file-tree__pages">
                      ${Array.from({ length: file.pageCount }, (_, index) => `<li>P.${index + 1}</li>`).join('')}
                    </ol>
                  </details>
                `,
              )
              .join('')}
          </div>`
    }
  `;
}
