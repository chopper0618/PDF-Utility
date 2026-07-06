# DIRECTORY_STRUCTURE

## 想定するプロジェクト場所

```text
~/Projects/PDF-Utility
```

## 推奨ディレクトリ構成

現時点の実コード構成が未確認のため、以下は今後整理するための推奨構成。

```text
PDF-Utility/
├── index.html
├── README.md
├── docs/
│   ├── README.md
│   ├── project/
│   ├── architecture/
│   ├── ui/
│   ├── development/
│   ├── issue/
│   ├── sprint/
│   └── release/
├── src/
│   ├── app.js
│   ├── state.js
│   ├── pdf-engine.js
│   ├── render/
│   │   ├── page-viewer.js
│   │   ├── page-map.js
│   │   └── statusbar.js
│   ├── events/
│   │   ├── drag-reorder.js
│   │   ├── move-command.js
│   │   └── selection.js
│   └── ui/
│       ├── ribbon.js
│       └── properties.js
├── styles/
│   └── main.css
└── assets/
```

## 小規模構成の場合

もし現状が `index.html`、`style.css`、`script.js` のような単純構成であれば、Sprint 0.7.0 では無理に分割しない。

ただし、コード内では以下の責務をコメントや関数名で分ける。

- State Management
- PDF Engine
- Page Viewer Rendering
- Page Map Rendering
- Drag Reorder Events
- Move Commands
- Status Bar Updates

## docs の配置

今回作成する docs は、プロジェクト直下に配置する。

```text
~/Projects/PDF-Utility/docs/
```

## 方針

- まず動くものを壊さない
- ファイル分割は必要になってから行う
- ただし責務はドキュメント上で先に整理する
