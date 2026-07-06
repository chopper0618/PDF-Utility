## 0.8.5-alpha - Sprint 0.8.5 / Issue #25

Added:

- プレビュー内に拡大、縮小、フィット表示へ戻す操作を追加

Changed:

- プレビュー初期表示をウインドウ高さに合わせ、PDF全体を確認しやすくした
- プレビューのヘッダーを小さくし、PDF表示領域を広げた
- 前後ページ移動と倍率操作を小さいヘッダー内に整理

## 0.8.4-alpha - Sprint 0.8.4 / Issue #24

Added:

- プレビュー中に左右キーで前後ページへ移動できるように変更
- プレビュー下部に「前へ」「次へ」ボタンを追加

Changed:

- プレビュー中の操作ヒントを、前後ページ移動を含む内容へ更新
- 先頭・最終ページでは移動できない方向のボタンを無効化

# CHANGELOG

## v0.8.3-alpha

- サムネールのダブルクリックで拡大プレビューを表示できるようにした。
- プレビューは Escape、背景クリック、×ボタンで閉じられるようにした。
- プレビュー表示中に Delete / Backspace などのページ操作ショートカットが誤爆しないようにした。

## v0.8.2-alpha

- Page Map 上でページをドラッグして並び替えできるようにした。
- Page Map ドラッグ並び替えを Page Viewer、選択状態、Undo / Redo と同期するようにした。
- Page Map の1行ファイル名表示で末尾の識別情報が残りやすいように調整した。

## v0.8.1-alpha

- 削除後に、削除位置に近いページを自動選択するようにした。
- 複製後に、複製されたページへスクロールするようにした。
- Undo / Redo 後に、復元された選択ページへスクロールするようにした。
- Page Map と Page Viewer の同期を維持したまま、ページ操作後の迷子感を減らした。


## v0.8.0-alpha - Sprint 0.8.0 / Issue #20

### Changed

- Removed the browser `window.prompt()` export filename prompt.
- Kept PDF export on the OS-native save dialog so users can choose filename and destination in one place.
- Improved export completion status to include the output filename and page count.

## 0.7.4-alpha - Sprint 0.7.4 / Issue #18

### Added

- Thumbnail filenames can now use up to two lines.
- Thumbnail cards keep the full filename tooltip on hover.

### Changed

- Reduced thumbnail card spacing slightly to improve file-name visibility.
- Page Map filename labels remain single-line for fast page-order scanning.

PDF Utility の変更履歴。

## Unreleased

### Planned

- Sprint 0.8.0: 書き出しUX改善


## 0.7.3-alpha - Sprint 0.7.3 / Issue #17

Added:

- Page Map と Page Viewer で共有するファイル名短縮関数を追加

Changed:

- サムネール下部のファイル名を先頭＋末尾の中間省略表示に変更
- Page Map のファイル名表示も共通関数を使うように整理

## 0.7.2-alpha - Sprint 0.7.2 / Issue #16

Added:

- 削除後の Status Bar に「Undoで元に戻せます。」を表示
- Page Map のファイル名を先頭＋末尾の中間省略表示に変更

Changed:

- Page Map 下部のファイル一覧を削除
- Page Map の hover title に現在ページ番号を追加

## 0.7.1-alpha - Sprint 0.7.1 / Issue #15

Added:

- 「移動...」操作をブラウザ標準 prompt から独自モーダルへ変更
- モーダル内で入力エラーを表示
- Escape、背景クリック、キャンセル、× ボタンで閉じる操作に対応

Fixed:

- モーダル入力欄の Backspace がページ削除ショートカットに誤爆する問題を修正

## 0.7.0-alpha - Sprint 0.7.0 / Issue #14

Added:

- 左パネルを Page Map として再構成
- Page Map に現在のページ順を表示
- Page Map クリックで Page Viewer の該当ページへジャンプ
- Page Map と Page Viewer の選択状態を同期
- ドラッグ並び替え中の上下端自動スクロールを追加
- 選択ページを指定ページ番号へ直接移動する操作を追加
- 選択ページを先頭／末尾へ移動する操作を追加

Changed:

- 「上へ移動」「下へ移動」を廃止
- Ribbon のページ移動ボタン表記を「移動...」に短縮
- 内部ドラッグの drop がファイル追加処理へ伝播しないように調整

Known:

- 「移動...」は現時点ではブラウザ標準 `prompt()` を使用するため、ダイアログタイトルにローカルアドレスが表示される
- 独自モーダル UI は Sprint 0.7.1 以降の候補

## Project Docs Sprint

Added:

- `docs/` 構成を作成
- `project/` にプロジェクト概要、現在地、ロードマップ、用語、開発理念、チャット引き継ぎを整理
- `architecture/` に状態管理、PDF 処理、イベント設計、フォルダ構成を整理
- `ui/` に Ribbon、Page Map、Properties、Status Bar、UI 共通ルールを整理
- `development/` に Git 運用、コーディング規約、Sprint 運用、レビュー、リリース手順を整理
- `issue/ISSUE_14_PAGE_MAP.md` を作成
- `sprint/SPRINT_0.7.0.md` と受け入れチェックリストを作成

## 0.8.0 - Planned

Planned:

- ページ操作 UX 安定化
- 選択状態の整理
- 削除後の動作確認

## 0.9.0 - Planned

Planned:

- 書き出し確認
- エラー処理確認
- 大量ページでの動作確認

## 1.0.0 - Goal

Goal:

- 実用版として PDF 読み込み、ページ整理、結合、書き出しが安定して行える状態
