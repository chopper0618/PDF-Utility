# CURRENT_STATUS

## 現在の状態

現在は **Sprint 0.9.0 / Issue #26「GitHub Pages trial deployment」** の実装レビュー段階。

Sprint 0.7.x で Page Map、ページ移動、削除、Undo / Redo、ファイル名表示を改善した。Sprint 0.8.0 では PDF 作成時のブラウザ標準 prompt を廃止し、OS 標準保存ダイアログで保存する方針に整理した。

Sprint 0.9.0 では、GitHub Pages で PDF Utility を試験公開し、Google Sites からリンクして院内PCで動作確認できる状態にする。Google Drive 連携や認証情報の追加は行わない。

## ローカル開発場所

```text
~/Projects/PDF-Utility
```

## 実装済み・確認済み

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

## 現時点では不要なもの

- 最近使ったファイル機能

## 残っている UX 課題

### 1. ページ操作 UX 安定化

- 複数ページ選択の扱い整理
- ページ番号表示の統一
- 操作後の軽いフィードバック表示

### 2. 書き出し・エラー処理

- 空 PDF、破損 PDF、パスワード付き PDF の扱い
- PDF 読み込み失敗時のメッセージ
- PDF 作成失敗時の回復導線

## 次の Sprint 候補

| Sprint | テーマ | 判断 |
|---|---|---|
| Sprint 0.8.1 | ページ操作後の選択状態安定化 | 完了 |
| Sprint 0.8.2 | Page Map drag reorder | 完了 |
| Sprint 0.8.3 | Thumbnail preview overlay | 完了 |
| Sprint 0.8.4 | Preview keyboard navigation | 完了 |
| Sprint 0.8.5 | Preview UI polish | 完了 |
| Sprint 0.9.0 | GitHub Pages trial deployment | レビュー中 |

## Technical Lead 判断

0.8.x でページ操作とプレビューUXは実用レベルまで固まった。0.9.0 では、Google Sites から部門内で使うための試験公開経路を確認する。GitHub Pages は公開URLになるため、患者情報・院内情報・認証情報を含めない運用を前提にする。
