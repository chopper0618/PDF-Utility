# PDF Utility

A modern PDF editing utility designed to make everyday PDF page work faster, simpler, and safer.

## Status

Current version: `v1.0.0-beta`
Current sprint: `Sprint 1.0.2 neutral wording cleanup`
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

## Public trial URL

GitHub Pages URL:

```text
https://chopper0618.github.io/PDF-Utility/
```

Deployment is handled by GitHub Actions. In GitHub, set Settings → Pages → Source to `GitHub Actions`, then push to `main`.

Google Sites should link to the GitHub Pages URL rather than iframe-embed the app, so PDF editing can use a full browser window.

## Trial use notes

PDF Utility is intended for page-level PDF editing in the browser. For the 1.0.0-beta trial, use Google Chrome or Microsoft Edge.

Safety notes:

- PDF files are processed in the browser.
- The app does not provide Google Drive integration.
- The app does not use authentication, OAuth, API keys, or server-side storage.
- The GitHub Pages URL is public. Handle PDFs containing personal information according to your organization's information management rules.
- After exporting, open the saved PDF in a separate viewer when confirmation is required.

For release checks and known limitations, see:

- `docs/release/RELEASE_CHECKLIST_1.0.0.md`
- `docs/release/KNOWN_LIMITATIONS.md`
- `docs/release/GOOGLE_SITES_LISTING.md`


## Development

Install packages:

```bash
npm install
