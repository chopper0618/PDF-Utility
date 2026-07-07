# KNOWN_LIMITATIONS

> Target: `1.0.0-beta`
> Purpose: 部門内試用前に、できること・できないこと・注意点を明確にする。

---

## 1. Product positioning

PDF Utility は、Adobe Acrobat のような総合 PDF 編集ソフトではない。

1.0.0-beta の主目的は、日常業務でよく行う **ページ単位の整理** を軽く実行すること。

Supported focus:

- ページの並び替え
- ページ削除
- ページ回転
- ページ複製
- 複数 PDF の結合
- サムネイル確認
- Page Map 確認
- プレビュー確認
- PDF 保存

Out of scope for 1.0.0-beta:

- PDF 本文テキストの編集
- 注釈編集
- 電子署名
- OCR
- フォーム編集
- パスワード解除
- Google Drive 連携
- ユーザー認証
- アクセス権限管理

---

## 2. Privacy / patient information

PDF Utility は GitHub Pages で公開されるブラウザアプリとして提供する。

現時点の設計方針:

- PDF はブラウザ内で処理する
- PDF をアプリ独自のサーバーへアップロードしない
- Google Drive へ自動保存しない
- API キーや認証情報を使用しない

ただし、GitHub Pages の URL 自体は公開 URL である。

患者情報を含む PDF を扱う場合は、必ず院内ルール・部署ルールに従うこと。

---

## 3. Browser support

Primary target:

- Google Chrome
- Microsoft Edge

Not primary target for 1.0.0-beta:

- Safari
- Firefox
- Mobile browsers
- Tablet browsers

Reason:

院内 PC での実用確認を優先するため。

---

## 4. File support limitations

The following files may fail to load or export correctly:

- パスワード付き PDF
- 破損 PDF
- 極端にページ数が多い PDF
- 極端にサイズが大きい PDF
- 特殊なフォント・注釈・フォームを含む PDF
- スキャン画像が非常に高解像度の PDF

1.0.0-beta では、これらの失敗時メッセージや回復導線は今後の改善対象とする。

---

## 5. Export limitations

PDF export is intended to preserve page order and page-level operations.

Expected:

- ページ順
- 削除状態
- 複製ページ
- 回転状態
- 複数 PDF の結合結果

Not guaranteed in 1.0.0-beta:

- すべての注釈の完全保持
- フォーム入力欄の完全保持
- 電子署名の保持
- PDF 内部構造の完全保持
- ファイルサイズの最適化

保存後は、必要に応じて別の PDF ビューアで内容を確認する。

---

## 6. Performance limitations

大量ページ PDF では、以下が遅くなる可能性がある。

- 読み込み
- サムネイル生成
- プレビュー表示
- 並び替え
- 書き出し

1.0.0-beta では、まず日常的な部門内利用サイズを優先して確認する。

---

## 7. No cloud integration

1.0.0-beta では Google Drive 連携を行わない。

Not included:

- Google Drive から直接開く
- Google Drive へ直接保存する
- Google アカウントログイン
- OAuth 認証
- Drive API

Reason:

- 認証情報を扱わない
- 公開 GitHub Pages での安全性を保つ
- まずはシンプルなページ編集機能を安定させる

---

## 8. Operational limitation

Google Sites には、アプリを iframe 埋め込みするのではなく、GitHub Pages URL へのリンクとして掲載する。

Reason:

- PDF 編集は広い画面で操作する方が安全
- ブラウザの保存ダイアログやファイル操作と相性がよい
- iframe 内での表示崩れや操作制限を避ける

---

## 9. Follow-up candidates

After 1.0.0-beta trial:

- 読み込み失敗時のエラーメッセージ改善
- 保存失敗時のエラーメッセージ改善
- パスワード付き PDF の検出表示
- 大量ページ時のパフォーマンス確認
- 試用者向けの簡易操作説明
- 部門内フィードバックを Issue 化
