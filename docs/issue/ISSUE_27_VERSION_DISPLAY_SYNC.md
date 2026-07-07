# ISSUE #27: App version display sync

## 目的

1.0.0-beta 準備後もアプリ左上のバージョン表示が `v0.8.5-alpha` のまま残っているため、`package.json` の version と画面表示をそろえる。

## 背景

Sprint 1.0.0 で `package.json` は `1.0.0-beta` に更新したが、アプリヘッダーの表示は `src/core/state.js` の `appState.version` を参照している。

そのため、GitHub Pages 上でアプリ自体は更新されていても、利用者には古いバージョンのまま見える。

## 方針

- `src/core/state.js` の `appState.version` を `1.0.0-beta` に更新する。
- `package.json` とアプリヘッダー表示が一致することをリリースチェック項目に追加する。
- `dist` 配下の生成済み JS は直接編集しない。

## 今回やること

- アプリヘッダーのバージョン表示を `v1.0.0-beta` にする。
- 1.0.0 リリースチェックリストへ表示確認項目を追加する。
- Project Docs に、1.0.0-beta 試用前の小修正として記録する。

## 今回やらないこと

- 自動で `package.json` から version を注入する仕組みの追加
- `dist` ファイルの手動編集
- UI レイアウト変更
- 機能追加

## 受け入れ条件

- GitHub Pages またはローカル起動時のヘッダーに `v1.0.0-beta` と表示される。
- `package.json` の version とアプリ表示が一致する。
- `npm run build` が通る。
- 既存の PDF 読み込み、ページ操作、保存機能に影響しない。
