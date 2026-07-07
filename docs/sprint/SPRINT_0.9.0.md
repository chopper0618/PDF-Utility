# Sprint 0.9.0: GitHub Pages trial deployment

## Sprint Goal

PDF Utility を GitHub Pages で試験公開し、Google Sites からリンクして院内PCで動作確認できる状態にする。

## Scope

### In scope

- GitHub Pages 用の Vite `base` 設定
- GitHub Actions による Pages deploy workflow
- 公開手順のドキュメント化
- 公開範囲と運用上の注意事項の明文化

### Out of scope

- Google Drive 連携
- Google Apps Script 化
- 認証付きホスティング
- 院内Webサーバー構築
- Google Sites iframe 埋め込み調整

## 実装方針

現在の Vite アプリを静的Webアプリとして維持する。GitHub Pages ではリポジトリ名配下に公開されるため、`vite.config.js` の `base` を `/PDF-Utility/` に設定する。

Deploy は GitHub Actions で行う。`main` への push または手動実行で `npm ci`、`npm run build` を実行し、`dist` を GitHub Pages に公開する。

## 動作確認

1. GitHub の Settings → Pages で Source を GitHub Actions にする。
2. `main` へ push する。
3. Actions の `Deploy PDF Utility to GitHub Pages` が成功する。
4. `https://chopper0618.github.io/PDF-Utility/` を開く。
5. Google Sites にリンクボタンを作成する。
6. 院内PCで Google Sites から起動する。

## 院内PC確認項目

- Google Sites から PDF Utility を開ける。
- PDFを読み込める。
- Page Map のクリックジャンプ・ドラッグ並び替えが動く。
- サムネイルプレビューが動く。
- 削除・複製・回転・移動・並び替えが動く。
- PDF作成で保存できる。
- 大きめPDFでも極端に重くない。
- ブラウザのセキュリティ設定でブロックされない。

## 判断

GitHub Pages は試験公開として採用する。本番運用で厳密な部門内限定が必要になった場合は、院内Webサーバー、Firebase Hosting + 認証、GitHub Enterprise Cloud の private Pages などを再検討する。
