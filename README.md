# PDF Utility

A modern PDF editor designed for hospital workflows.

## Version

`v0.4.3-alpha`

## Current Sprint

Sprint 0.4: Professional UX

## Features in this version

- PDF読み込み
- 複数PDF読み込み
- サムネイル表示
- 左ファイルツリー
- 右プロパティ表示
- ページ選択
- Ctrl / ⌘ クリック複数選択
- Shiftクリック範囲選択
- ページ並び替え
- 左右回転
- 削除
- 複製
- Undo / Redo
- 右クリックメニュー
- ショートカットキー
- Office風リボングループ
- サムネイルカードのProfessional UX改善
- プロパティパネルの詳細表示改善

## Run locally

```bash
nvm use 22
rm -rf node_modules package-lock.json
npm config set registry https://registry.npmjs.org/
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

## Test checklist

- PDF追加ボタンでPDFを読み込む
- ドラッグ＆ドロップでPDFを読み込む
- サムネイルがグリッド表示される
- サムネイル上に正方形アイコンボタンが出る
- リボンが「ファイル」「編集」「ページ」「出力」に分かれている
- ページクリックで右プロパティが変わる
- 複数選択時にプロパティが複数表示になる
- 左右回転
- 削除
- 複製
- Undo / Redo
- 右クリックメニュー
- Deleteキーで削除
- Ctrl / ⌘ + Aで全選択

## Next Sprint

Sprint 0.5: PDF Export Foundation

- 編集後のPDF出力
- 回転反映
- 削除反映
- 複製反映
- 並び替え反映
