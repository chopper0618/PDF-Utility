# PDF Utility

A modern PDF editing utility designed to make everyday PDF work in hospitals faster, simpler, and safer.

## Status

Current version: `v0.9.0-alpha`
Current sprint: `Sprint 0.9.0 GitHub Pages trial deployment`
Main branch: `main`
Development branch: `develop`

## Features

Implemented:

- PDF loading
- Thumbnail display
- Page selection
- Multiple page selection
- Page reorder
- Page Map navigation
- Compact Page Map file labels
- Compact thumbnail file labels
- Two-line thumbnail filename display
- Drag auto-scroll during reorder
- Move selected pages to a specified page number
- Page rotate
- Page delete
- Page duplicate
- Undo / Redo
- PDF export
- OS-native PDF save dialog
- Thumbnail preview overlay
- Preview previous / next page navigation
- Preview fit-to-window and zoom controls
- GitHub Pages deployment workflow
- Selection remains on a nearby page after delete
- Undo / Redo restores view position to the active page
- Workspace-based VS Code development environment

Planned:

- Export error handling
- Image to PDF
- Page numbering
- Watermark
- Deployment hardening

## Trial deployment

GitHub Pages trial URL:

```text
https://chopper0618.github.io/PDF-Utility/
```

Deployment is handled by GitHub Actions. In GitHub, set Settings → Pages → Source to `GitHub Actions`, then push to `main`.

Google Sites should link to the GitHub Pages URL rather than iframe-embed the app, so PDF editing can use a full browser window.


## Development

Install packages:

```bash
npm install
