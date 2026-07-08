# CURRENT_STATUS

## 現在の状態

現在は **Sprint 1.0.5 / trial validation notes** の段階。

Sprint 0.7.x で Page Map、ページ移動、削除、Undo / Redo、ファイル名表示を改善した。Sprint 0.8.x では PDF 書き出し、ページ操作後の選択状態、Page Map 並び替え、プレビュー操作を改善した。Sprint 0.9.0 では GitHub Pages による試験公開経路を整え、Google Sites からリンクして実際に利用する PC 環境で動作確認する方針にした。

1.0.0-beta では、機能追加よりも **現状機能の安定化・リリースチェック・制限事項の明文化** を優先する。Sprint 1.0.1 でアプリ左上のバージョン表示を `v1.0.0-beta` にそろえた。Sprint 1.0.2 では、公開リポジトリと Google Sites 掲載文が特定の利用環境に見えないよう、表現を汎用的に整理した。Sprint 1.0.3 では、Safari の保存制限を既知の制限として明文化し、保存処理は現状維持とした。Sprint 1.0.4 では、プレビュー拡大時の文字・罫線のボケを軽減するため、プレビュー画像だけを高解像度で生成した。Sprint 1.0.5 では、400ページ超えPDFを含む試用前確認結果を記録し、`1.0.0-beta` を `Ready for trial` として扱う。

## 公開URL

```text
https://chopper0618.github.io/PDF-Utility/
```

GitHub Pages の Source は `GitHub Actions` を使用する。

Google Sites には iframe 埋め込みではなく、GitHub Pages URL へのリンクとして掲載する。

## ローカル開発場所

```text
~/Projects/PDF-Utility
```

## 実装済み・確認対象

- PDF 読み込み中のプログレス表示
- ステータスバーへの「〇ページ読み込み完了」表示
- Page Map に現在のページ順を表示
- Page Map クリックで Page Viewer の該当ページへジャンプ
- Page Map 上でページをドラッグ並び替え
- Page Map と Page Viewer の選択状態同期
- ドラッグ並び替え中の上下端自動スクロール
- 選択ページを指定ページ番号へ直接移動
- 選択ページを先頭／末尾へ移動
- 移動ダイアログの独自モーダル化
- モーダル入力欄で Backspace / Delete がページ削除に誤爆しない制御
- 削除後に Status Bar へ Undo 可能であることを表示
- 削除後に近いページを自動選択
- 複製後に複製ページへスクロール
- Undo / Redo 時に操作名つきのフィードバックを表示
- Undo / Redo 後に選択ページへスクロール
- Page Map 下部のファイル一覧削除
- Page Map のファイル名を先頭＋末尾表示に変更
- サムネール下部のファイル名を最大2行表示に変更
- PDF作成時のブラウザ標準 prompt を廃止し、OS標準の保存ダイアログへ整理
- サムネールのダブルクリックで拡大プレビューを表示
- プレビュー表示中のページ操作ショートカット誤爆防止
- プレビュー中の左右キー・前後ボタンによるページ移動
- プレビュー初期表示の高さフィット
- プレビュー内の拡大・縮小・フィット操作
- プレビュー用画像の高解像度生成
- GitHub Pages 用の Vite base 設定
- GitHub Actions による Pages deploy workflow

## 1.0.0-beta trial status

**Decision:** `Ready for trial`

確認済み:

- GitHub Pages で開ける
- Google Sites のリンクから開ける
- Chrome で動作する
- PDF を読み込める
- PDF を保存できる
- 保存後 PDF を開ける
- サムネイル表示が通常操作上重くなっていない
- プレビューを開ける
- プレビュー拡大時の文字・罫線が改善している
- 400ページ超え PDF でもプレビュー確認ができる

未確認・条件付き:

- Edge は利用環境がある場合に確認する
- Safari は保存時のファイル名・保存先指定に制限がある

## 1.0.0-beta で確認すること

- GitHub Pages で開ける
- Google Sites のリンクから開ける
- Chrome で動作する
- 400ページ超え PDF でもプレビュー確認ができる
- Edge は利用環境がある場合に確認する
- Safari は保存時のファイル名・保存先指定に制限があることを理解する
- PDF を読み込める
- PDF を保存できる
- ページ並び替えができる
- Page Map 並び替えができる
- 削除、複製、回転ができる
- 指定ページへ移動、先頭へ移動、末尾へ移動ができる
- Undo / Redo ができる
- Page Map、サムネイル、プレビューが実用できる
- 幅フィット、高さフィット、拡大縮小、前後ページ移動ができる
- 個人情報を含む PDF の保存・共有時の注意が明文化されている
- Google Drive 連携なし、認証情報・APIキーなしの方針が明文化されている

## 関連ドキュメント

- `docs/release/RELEASE_CHECKLIST_1.0.0.md`
- `docs/release/KNOWN_LIMITATIONS.md`
- `docs/release/GOOGLE_SITES_LISTING.md`
- `docs/release/CHANGELOG.md`
- `docs/issue/ISSUE_27_VERSION_DISPLAY_SYNC.md`
- `docs/sprint/SPRINT_1.0.1.md`
- `docs/issue/ISSUE_28_NEUTRAL_WORDING_CLEANUP.md`
- `docs/sprint/SPRINT_1.0.2.md`
- `docs/issue/ISSUE_29_BROWSER_COMPATIBILITY_NOTES.md`
- `docs/sprint/SPRINT_1.0.3.md`
- `docs/issue/ISSUE_30_PREVIEW_RENDER_QUALITY.md`
- `docs/sprint/SPRINT_1.0.4.md`
- `docs/issue/ISSUE_31_TRIAL_VALIDATION_NOTES.md`
- `docs/sprint/SPRINT_1.0.5.md`

## 現時点では不要なもの

- 最近使ったファイル機能
- Google Drive 連携
- 認証機能
- API キーを必要とする機能

## 残っている UX / 技術課題

### 1. 書き出し・エラー処理

- 空 PDF、破損 PDF、パスワード付き PDF の扱い
- PDF 読み込み失敗時のメッセージ
- PDF 作成失敗時の回復導線
- 保存後 PDF の確認導線

### 2. 試用後フィードバック

- Edge の利用環境がある場合の動作確認
- Safari での保存制限に対する説明の分かりやすさ確認
- 日常的なページ数・ファイルサイズでの継続的な速度確認
- 操作説明が不足している箇所の洗い出し
- 試用者からの不具合・要望の Issue 化

## 次の Sprint 候補

| Sprint | テーマ | 判断 |
|---|---|---|
| Sprint 0.9.0 | GitHub Pages trial deployment | 完了 |
| Sprint 1.0.0 | Release check / beta preparation | 完了 |
| Sprint 1.0.1 | Version display sync / beta polish | 完了 |
| Sprint 1.0.2 | Neutral wording cleanup | 完了 |
| Sprint 1.0.3 | Browser compatibility notes | 完了 |
| Sprint 1.0.4 | Preview render quality improvement | 完了 |
| Sprint 1.0.5 | Trial validation notes | 完了 |
| Sprint 1.1.0 | Export error handling | 候補 |

## Technical Lead 判断

0.8.x でページ操作とプレビュー UX は試用できる水準に近づいた。0.9.0 で公開経路も確認でき、1.0.0-beta のチェックリスト、制限事項、公開URL、Google Sites 掲載文、安全面の説明も揃った。Sprint 1.0.2 では、公開リポジトリとして特定の利用環境に見えないよう表現を整理し、PDF Utility を汎用的な PDF ページ編集ツールとして説明した。Sprint 1.0.3 では、保存機能を作り替えず、Safari では保存先やファイル名指定に制限があることを Docs と Google Sites 掲載文で明文化した。Sprint 1.0.4 では、プレビュー中の1ページだけを高解像度化し、拡大時の視認性改善を小さく検証した。Sprint 1.0.5 では、Chrome / Google Sites 経由での利用確認、保存確認、400ページ超えPDFでのプレビュー確認を記録し、1.0.0-beta を試用可能な状態と判断した。

Google Drive 連携や認証機能は、現時点では入れない。公開 GitHub Pages で扱う以上、個人情報・内部情報・認証情報を含めない運用を明文化し、試用は所属先の情報管理ルールに従って行う。
