# RELEASE_CHECKLIST_1.0.0

> Target: `1.0.0-beta`
> Purpose: 試用できる beta 相当として、現状機能・公開経路・安全面を確認する。

---

## 1. Release scope

このチェックリストは、PDF Utility を **業務環境で試用する前の確認** に使う。

1.0.0-beta では、Adobe Acrobat の代替ではなく、次のページ編集作業を軽く・分かりやすく行える状態を目標とする。

- PDF 読み込み
- ページの並び替え
- ページ削除
- ページ回転
- ページ複製
- 複数 PDF の結合
- Page Map での確認・並び替え
- サムネイル確認
- プレビュー確認
- 編集後 PDF の保存

---

## 2. Deployment / access check

| Check | Expected result | Result |
|---|---|---|
| GitHub Pages で開ける | `https://chopper0618.github.io/PDF-Utility/` が表示される | [ ] |
| アプリのバージョン表示 | 画面左上に `v1.0.0-beta` と表示される | [ ] |
| GitHub Pages の Source | Settings → Pages → Source が `GitHub Actions` | [ ] |
| Google Sites のリンクから開ける | Google Sites のボタンまたはリンクから別タブで開ける | [ ] |
| iframe 埋め込みをしていない | PDF 編集は GitHub Pages を直接開いて実行する | [ ] |
| API キーが含まれていない | リポジトリ・公開ページ・設定に API キーや認証情報がない | [ ] |
| Google Drive 連携がない | Drive 認証・Drive API・OAuth 設定を使用していない | [ ] |

---

## 3. Browser check

| Browser | Expected result | Result |
|---|---|---|
| Google Chrome | 読み込み、ページ操作、保存ができる | [ ] |
| Microsoft Edge | 読み込み、ページ操作、保存ができる | [ ] |
| Safari | 読み込み、ページ操作、保存ができる。ただし保存名・保存先指定には制限がある | [ ] |

Notes:

- 実際に利用する PC 環境で確認する。
- 推奨ブラウザは Chrome とする。
- Edge は利用環境がある場合に確認する。
- Safari は条件付き対応とし、保存された PDF はブラウザまたは OS のダウンロード設定に従う。
- Firefox / Mobile browsers / Tablet browsers は 1.0.0-beta の主対象外。必要になった時点で追加検証する。

---

## 4. Basic PDF workflow check

| Check | Expected result | Result |
|---|---|---|
| PDF を読み込める | PDF 追加後、サムネイルが表示される | [ ] |
| 複数 PDF を読み込める | 読み込んだ順にページが追加される | [ ] |
| PDF を保存できる | Chrome では保存ダイアログで PDF を保存できる | [ ] |
| Safari で PDF を保存できる | Safari ではブラウザまたは OS のダウンロード設定に従って保存される | [ ] |
| 保存後 PDF を開ける | 保存した PDF が別ビューアで開ける | [ ] |
| 保存後のページ順が正しい | 画面上のページ順と保存 PDF のページ順が一致する | [ ] |

---

## 5. Page operation check

| Check | Expected result | Result |
|---|---|---|
| ページ並び替え | サムネイルのドラッグで順番を変更できる | [ ] |
| Page Map 並び替え | Page Map のドラッグで順番を変更できる | [ ] |
| 削除 | 選択ページを削除できる | [ ] |
| 複製 | 選択ページを複製できる | [ ] |
| 回転 | 選択ページを回転できる | [ ] |
| 指定ページへ移動 | ページ番号を指定して移動できる | [ ] |
| 先頭へ移動 | 選択ページを先頭へ移動できる | [ ] |
| 末尾へ移動 | 選択ページを末尾へ移動できる | [ ] |
| Undo | 直前のページ操作を元に戻せる | [ ] |
| Redo | Undo した操作をやり直せる | [ ] |

---

## 6. Navigation / preview check

| Check | Expected result | Result |
|---|---|---|
| Page Map | 現在のページ順を確認できる | [ ] |
| Page Map クリック | 該当ページへジャンプできる | [ ] |
| サムネイル | 各ページの見た目を確認できる | [ ] |
| プレビュー | サムネイルのダブルクリックで拡大表示できる | [ ] |
| 幅フィット | プレビューを幅に合わせられる | [ ] |
| 高さフィット | プレビューを高さに合わせられる | [ ] |
| 拡大縮小 | プレビュー内で拡大・縮小できる | [ ] |
| 前後ページ移動 | プレビュー内で前後ページに移動できる | [ ] |
| キーボード操作 | プレビュー中の左右キー移動ができる | [ ] |

---

## 7. Safety / privacy check

| Check | Expected result | Result |
|---|---|---|
| 個人情報を含む PDF の注意表示 | README / Google Sites の説明で注意喚起されている | [ ] |
| ブラウザ内処理の説明 | PDF はブラウザ内で処理される旨を明記している | [ ] |
| サーバー保存なし | アプリ側で PDF をサーバーへ保存しない | [ ] |
| Google Drive 連携なし | Drive へ自動保存・自動アップロードしない | [ ] |
| 認証情報なし | API キー・OAuth クライアント情報・パスワードを含めない | [ ] |
| 公開 URL の理解 | GitHub Pages は公開 URL であることを理解して運用する | [ ] |

Important:

- PDF Utility は公開 GitHub Pages 上に配置される。
- 個人情報を含む PDF を保存・共有する際は、所属先の情報管理ルールに従う。
- 現時点では Google Drive 連携を行わない。
- 認証情報や API キーをリポジトリへ入れない。

---

## 8. Known limitation review

Before trial use, read:

```text
docs/release/KNOWN_LIMITATIONS.md
```

Confirm:

- [ ] 制限事項を理解した
- [ ] 試用として問題ない範囲である
- [ ] 不具合・要望は Issue / Sprint 駆動で扱う

---

## 9. Release decision

| Item | Result |
|---|---|
| Basic workflow is usable | [ ] |
| Chrome / Edge check completed | [ ] |
| Safety notes are documented | [ ] |
| Known limitations are acceptable for trial use | [ ] |
| Safari save limitation is documented | [ ] |
| Version is set to `1.0.0-beta` | [ ] |
| App header displays `v1.0.0-beta` | [ ] |

Release decision:

- [ ] Release as `1.0.0-beta`
- [ ] Hold release and create follow-up issues

Reviewer notes:

```text

```
