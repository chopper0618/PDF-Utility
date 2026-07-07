# DEPLOYMENT

## 推奨する当面の公開方法

PDF Utility は、当面は GitHub Pages で静的Webアプリとして公開し、Google Sites にはリンクボタンを置く。

```text
Vite app
↓
npm run build
↓
dist/
↓
GitHub Pages
↓
Google Sites link
↓
院内PC browser
```

## GitHub Pages URL

リポジトリ名が `PDF-Utility` のため、想定URLは以下。

```text
https://chopper0618.github.io/PDF-Utility/
```

このURLで正しく動くように、Vite の `base` は以下にする。

```js
base: '/PDF-Utility/'
```

## GitHub Pages deploy

`.github/workflows/deploy.yml` で以下を行う。

```text
checkout
↓
setup-node
↓
npm ci
↓
npm run build
↓
upload dist
↓
deploy to GitHub Pages
```

GitHub 側では Settings → Pages → Source を `GitHub Actions` にする。

## Google Sites への置き方

まずは埋め込みではなくリンクボタンにする。PDF編集では画面を広く使うため、Google Sites内の小さな iframe より、別タブで開く方が扱いやすい。

推奨ボタン名:

```text
PDF Utilityを開く
```

注意書き例:

```text
PDFのページ並び替え・削除・回転・結合に使用します。
PDFはブラウザ内で処理されます。
患者情報を含むPDFの取り扱いには十分注意してください。
```

## 公開範囲

通常の GitHub Pages は公開URLである。Google Sites側を部門内限定にしても、GitHub Pages自体が認証付きになるわけではない。

そのため、現時点では以下を守る。

- リポジトリに患者情報を入れない。
- サンプルPDFを同梱しない。
- 院内サーバー名、共有フォルダパス、内部IPを入れない。
- APIキー、OAuthクライアントID、認証情報を入れない。
- Google Drive連携は入れない。

## 今は採用しない方法

### Google Apps Script 化

PDF Utility はブラウザ内でのPDF描画、ドラッグ操作、プレビュー、保存ダイアログを多用する。GAS HTML Service に合わせて移植するより、通常の静的Webアプリとして維持する方が安全。

### Google Sites への iframe 埋め込み

画面が狭くなり、ドラッグ操作やプレビューが使いにくくなる可能性がある。まずはリンクで別タブ起動する。

### Google Drive 連携

認証と権限設計が必要になるため、当面は行わない。保存はOS標準保存ダイアログによるローカル保存を維持する。

## 将来検討

- 院内Webサーバーでの限定公開
- Firebase Hosting
- GitHub Enterprise Cloud の private Pages
- Google Driveから開く / Driveへ保存
- 認証付き公開
