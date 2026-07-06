# Changelog

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

## v0.7.4-alpha - Sprint 0.7.4 / Issue #18

- Refined thumbnail card spacing.
- Allowed thumbnail filenames to use up to two lines.
- Kept Page Map filenames as single-line labels for overview scanning.
- Preserved full filename tooltip on thumbnail cards.


## v0.7.3-alpha - Sprint 0.7.3 / Issue #17

### Added

- Page Map と Page Viewer で共有するファイル名短縮関数を追加。

### Changed

- サムネール下部のファイル名を先頭＋末尾の中間省略表示に変更。
- Page Map のファイル名表示も共通関数を使うように整理。

## v0.7.2-alpha - Sprint 0.7.2 / Issue #16

### Added

- ページ削除後のステータスバーに「Undoで元に戻せます。」を表示。
- Page Map のファイル名を先頭＋末尾の中間省略表示に変更。

### Changed

- Page Map 下部のファイル一覧を削除。
- Page Map のマウスオーバー情報に現在ページ番号を追加。

## v0.7.1-alpha - Sprint 0.7.1 / Issue #15

### Added

- 「移動...」操作を独自モーダル化。
- 移動先ページ番号の入力エラーをモーダル内に表示。

### Fixed

- モーダル入力欄で Backspace がページ削除ショートカットに誤爆する問題を修正。

## v0.7.0-alpha - Sprint 0.7.0 / Issue #14

### Added

- 左パネルを Page Map として再構成し、現在のページ順を表示するように変更。
- Page Map のページクリックで該当サムネイルへジャンプし、選択状態を同期。
- ドラッグ並び替え中にサムネイル表示領域の上下端で自動スクロールする機能を追加。
- 選択ページを指定したページ番号へ直接移動するリボン操作を追加。
- 選択ページを先頭／末尾へ移動するリボン操作を追加。

### Changed

- リボンのページ移動ボタン表記を「移動...」に短縮。
- 内部ドラッグの drop がファイル追加処理へ伝播しないように調整。

### Known

- 「移動...」の入力はブラウザ標準 `prompt()` のため、開発中はダイアログタイトルにローカルアドレスが表示される。次 Sprint で独自モーダル化を検討する。

## [0.6.3-alpha] - Thumbnail rotation fix

### Fixed

- 回転したサムネイルが枠から見切れる問題を修正しました。
- 縦向きPDFを横向きに回転しても、ページ全体がサムネイル内に収まるようにしました。

### Changed

- 確認項目を日本語表記に統一しました。

## [0.6.2-alpha] - Ribbon redesign

### Added

- Ribbon view group with thumbnail zoom controls.
- Consistent ribbon tooltip text and shortcut hints.

### Changed

- Reorganized ribbon groups into File, Edit, Page, and View.
- Standardized ribbon button size, icon size, disabled state, and hover feedback.
- Fixed label readability for PDF add/export buttons.

## v0.5.0-alpha

- Added PDF export using current page order.
- Export reflects page rotation, deleted pages, duplicated pages, and reordered pages.
- Enabled PDF作成 button in ribbon and properties panel.
- Added suggested output file names.

## v0.4.5-alpha

- Fixed ribbon labels for PDF追加 and PDF作成.

## v0.4.4-alpha

- Improved hover controls and thumbnail zoom behavior.
