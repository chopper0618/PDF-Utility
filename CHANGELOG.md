# Changelog

## Unreleased - Sprint 1.0.3 browser compatibility notes

### Added

- Added Issue #29 and Sprint 1.0.3 docs for browser compatibility notes.
- Documented Safari save limitations in known limitations, release checklist, and Google Sites listing copy.

### Changed

- Clarified Chrome as the recommended browser for trial use.
- Kept save behavior unchanged and documented Safari as conditional support instead of attempting another save-dialog implementation.

## v1.0.2-beta - Sprint 1.0.2 neutral wording cleanup

### Added

- Added Issue #28 and Sprint 1.0.2 docs for neutral public wording cleanup.

### Changed

- Reworded README and Project Docs so PDF Utility reads as a general-purpose browser-based PDF page utility.
- Replaced sensitive-content wording with `個人情報` and `所属先の情報管理ルール` in release and Google Sites notes.
- Updated AI role / product mission wording to avoid tying the product to a specific organization type or specialty.

## v1.0.1-beta - Sprint 1.0.1 version display sync

### Added

- Added Issue #27 and Sprint 1.0.1 docs for app version display consistency before beta trial use.

### Fixed

- Updated the app header version display from `v0.8.5-alpha` to `v1.0.0-beta` so it matches `package.json`.

## v1.0.0-beta - Sprint 1.0.0 release preparation

### Added

- Added a 1.0.0-beta release checklist for deployment, browser, page operation, preview, export, and safety checks.
- Added known limitations for browser support, file support, export behavior, privacy, performance, and Google Drive non-integration.
- Added Google Sites listing copy for the trial link.

### Changed

- Updated README with the public GitHub Pages URL and trial-use safety notes.
- Updated project status and roadmap for the 1.0.0-beta release-check phase.
- Updated package metadata from `0.9.0-alpha` to `1.0.0-beta`.

## v0.9.0-alpha - Sprint 0.9.0 / Issue #26

### Added

- GitHub Pages deployment workflow using GitHub Actions.
- Deployment architecture documentation for GitHub Pages and Google Sites link usage.
- Issue and sprint docs for GitHub Pages trial deployment.

### Changed

- Set Vite `base` to `/PDF-Utility/` for repository-path GitHub Pages deployment.
- Updated project status from preview UI polish to deployment trial.


## v0.8.5-alpha - Sprint 0.8.5 / Issue #25

### Added

- プレビュー内に拡大、縮小、フィット表示へ戻す操作を追加。

### Changed

- プレビュー初期表示をウインドウ高さに合わせ、通常サイズでは縦スクロールなしで1ページ全体を確認しやすくした。
- プレビューのヘッダーを小さくし、PDF表示領域を広げた。
- プレビューの前後移動と倍率操作をコンパクトなヘッダー内に整理した。

## v0.8.4-alpha - Sprint 0.8.4 / Issue #24

### Added

- プレビュー中に左右キーで前後ページへ移動できるように変更。
- プレビュー下部に「前へ」「次へ」ボタンを追加。

### Changed

- プレビュー中の操作ヒントを、前後ページ移動を含む内容へ更新。
- 先頭・最終ページでは移動できない方向のボタンを無効化。

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
