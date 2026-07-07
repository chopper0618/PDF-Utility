# CURRENT_STATUS

## 現在の状態

現在は **Sprint 1.0.1 / version display sync and beta polish** の段階。

Sprint 0.7.x で Page Map、ページ移動、削除、Undo / Redo、ファイル名表示を改善した。Sprint 0.8.x では PDF 書き出し、ページ操作後の選択状態、Page Map 並び替え、プレビュー操作を改善した。Sprint 0.9.0 では GitHub Pages による試験公開経路を整え、Google Sites からリンクして院内 PC で動作確認する方針にした。

1.0.0-beta では、機能追加よりも **現状機能の安定化・リリースチェック・制限事項の明文化** を優先する。Sprint 1.0.1 では、試用開始前の小修正としてアプリ左上のバージョン表示を `v1.0.0-beta` にそろえる。

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
- GitHub Pages 用の Vite base 設定
- GitHub Actions による Pages deploy workflow

## 1.0.0-beta で確認すること

- GitHub Pages で開ける
- Google Sites のリンクから開ける
- Chrome / Edge で動作する
- PDF を読み込める
- PDF を保存できる
- ページ並び替えができる
- Page Map 並び替えができる
- 削除、複製、回転ができる
- 指定ページへ移動、先頭へ移動、末尾へ移動ができる
- Undo / Redo ができる
- Page Map、サムネイル、プレビューが実用できる
- 幅フィット、高さフィット、拡大縮小、前後ページ移動ができる
- 患者情報を含む PDF の取り扱い注意が明文化されている
- Google Drive 連携なし、認証情報・APIキーなしの方針が明文化されている

## 関連ドキュメント

- `docs/release/RELEASE_CHECKLIST_1.0.0.md`
- `docs/release/KNOWN_LIMITATIONS.md`
- `docs/release/GOOGLE_SITES_LISTING.md`
- `docs/release/CHANGELOG.md`
- `docs/issue/ISSUE_27_VERSION_DISPLAY_SYNC.md`
- `docs/sprint/SPRINT_1.0.1.md`

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

- 院内 PC での Chrome / Edge 動作確認
- 日常的なページ数・ファイルサイズでの速度確認
- 操作説明が不足している箇所の洗い出し
- 部門内試用者からの不具合・要望の Issue 化

## 次の Sprint 候補

| Sprint | テーマ | 判断 |
|---|---|---|
| Sprint 0.9.0 | GitHub Pages trial deployment | 完了 |
| Sprint 1.0.0 | Release check / beta preparation | 完了 |
| Sprint 1.0.1 | Version display sync / beta polish | 進行中 |
| Sprint 1.0.2 | Trial feedback fixes | 候補 |
| Sprint 1.1.0 | Export error handling | 候補 |

## Technical Lead 判断

0.8.x でページ操作とプレビュー UX は部門内試用できる水準に近づいた。0.9.0 で公開経路も確認できたため、次は機能追加に進まず、1.0.0-beta として **チェックリスト、制限事項、公開URL、Google Sites 掲載文、安全面の説明** を揃える。さらに、試用前に画面上のバージョン表示も `v1.0.0-beta` にそろえ、利用者に古い版と誤解されない状態にする。

Google Drive 連携や認証機能は、現時点では入れない。公開 GitHub Pages で扱う以上、患者情報・院内情報・認証情報を含めない運用を明文化し、部門内の試用は院内ルールに従って行う。
