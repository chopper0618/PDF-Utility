# PDF Utility

PDF Utility is a browser-based PDF page organizer designed for hospital workflows.

## Current version

v0.5.0-alpha

## Features in this build

- Add local PDF files
- Show thumbnails
- Select single/multiple/range pages
- Reorder pages by drag and drop
- Rotate pages
- Delete pages
- Duplicate pages
- Undo / Redo
- Export the current page list as a new PDF

## Development

```bash
nvm use 22
npm install
npm run dev
```

If npm install fails because of a stale package-lock file, run:

```bash
rm -rf node_modules package-lock.json
npm config set registry https://registry.npmjs.org/
npm install
```
