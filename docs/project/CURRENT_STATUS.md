# CURRENT_STATUS

## 現在の状態

現在は **Sprint 0.7.3 / Issue #17「Thumbnail filename display improvement」** の実装レビュー段階。

Sprint 0.7.0 で Page Map 改善、Sprint 0.7.1 で移動ダイアログ改善、Sprint 0.7.2 で削除操作UX改善と Page Map 表示整理を完了。Sprint 0.7.3 では Page Viewer サムネール下部のファイル名表示を Page Map と統一する。

## ローカル開発場所

```text
~/Projects/PDF-Utility
```

## 実装済み・確認済み

- PDF 読み込み中のプログレス表示
- ステータスバーへの「〇ページ読み込み完了」表示
- Page Map に現在のページ順を表示
- Page Map クリックで Page Viewer の該当ページへジャンプ
- Page Map と Page Viewer の選択状態同期
- ドラッグ並び替え中の上下端自動スクロール
- 選択ページを指定ページ番号へ直接移動
- 選択ページを先頭／末尾へ移動
- Ribbon のページ移動ボタン表記を「移動...」に短縮
- 移動ダイアログを独自モーダル化
- モーダル入力欄で Backspace がページ削除に誤爆しないように制御
- 削除後に Status Bar へ Undo 可能であることを表示
- Page Map 下部のファイル一覧を削除
- Page Map のファイル名を先頭＋末尾表示に変更
- サムネール下部のファイル名を先頭＋末尾表示に変更

## 現時点では不要なもの

- 最近使ったファイル機能

## 残っている UX 課題

### 1. ページ操作 UX 安定化

- 複数ページ選択の扱い整理
- 削除後の選択状態整理
- 移動後のスクロール位置制御
- ページ番号表示の統一
- 操作後の軽いフィードバック表示

## 次の Sprint 候補

| Sprint | テーマ | 判断 |
|---|---|---|
| Sprint 0.7.1 | 移動ダイアログ改善 | 完了 |
| Sprint 0.7.2 | 削除操作UX改善 / Page Map表示整理 | 完了 |
| Sprint 0.7.3 | サムネールファイル名表示改善 | レビュー中 |
| Sprint 0.8.0 | ページ操作 UX 安定化 | 次候補 |

## Technical Lead 判断

Sprint 0.7.3 は、UIを増やさず、表示ルールを整えることで判別性を上げる方針。Page Map と Page Viewer でファイル名の短縮ルールを統一し、末尾違いのPDFを毎回マウスオーバーしなくても判別しやすくする。
