# PDF Utility v0.5.0-alpha patch

## Commit name

Sprint 0.5.0 PDF export

## Changed files

- package.json
- README.md
- CHANGELOG.md
- src/core/app.js
- src/core/state.js
- src/pdf/loader.js
- src/pdf/export.js
- src/ui/ribbon.js
- src/ui/properties.js

## Apply

Copy these files into your project root and overwrite existing files.

Then run:

```bash
cd ~/Projects/PDF-Utility
nvm use 22
rm -rf node_modules package-lock.json
npm config set registry https://registry.npmjs.org/
npm install
npm run dev
```

## Test

- Add one-page PDF, export, open downloaded PDF.
- Add multi-page PDF, export, check page count.
- Reorder pages, export, check order.
- Rotate pages, export, check rotation.
- Delete pages, export, check deleted pages are excluded.
- Duplicate pages, export, check duplicated pages are included.

## Commit

```bash
git add .
git commit -m "Sprint 0.5.0 PDF export"
git push
```
