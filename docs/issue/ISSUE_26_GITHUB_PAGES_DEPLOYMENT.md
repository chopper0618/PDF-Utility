# ISSUE #26: GitHub Pages trial deployment

## 目的

PDF Utility を GitHub Pages で試験公開し、Google Sites からリンクして院内PCで動作確認できる状態にする。

## 背景

当初は Google Apps Script 化も候補だったが、PDF Utility は Vite で構成したブラウザ内処理中心の静的Webアプリである。PDF描画、ドラッグ操作、プレビュー、OS保存ダイアログなどを考えると、まずは通常の静的Webアプリとして公開する方が自然である。

## 方針

```text
PDF Utility
↓
npm run build
↓
GitHub Pages
↓
Google Sites にリンク
↓
院内PCで動作確認
```

## 今回やること

- Vite の `base` を GitHub Pages のリポジトリ配下URLへ合わせる。
- GitHub Actions で `npm ci` → `npm run build` → Pages deploy を行う。
- 公開手順と注意事項を docs に残す。

## 今回やらないこと

- Google Drive 連携
- Googleログイン認証
- APIキーやOAuthクライアントIDの追加
- GitHub Pages の厳密な部門内限定公開
- Google Sites への iframe 埋め込み最適化

## 公開範囲の注意

通常の GitHub Pages は公開URLを知っていればアクセスできる。Google Sites 側を部門内限定にしても、リンク先の GitHub Pages 自体が公開URLであれば完全なアクセス制限にはならない。

現時点の PDF Utility には患者情報、院内サーバー接続、認証情報、APIキー、Google Drive連携を含めない。

## 受け入れ条件

- `npm run build` が通る。
- GitHub Actions で Pages deploy が成功する。
- `https://chopper0618.github.io/PDF-Utility/` でアプリが開く。
- Google Sites からリンクで起動できる。
- 院内PCの Chrome / Edge で基本操作が動く。
- PDF読み込み、Page Map、プレビュー、PDF作成が動く。
