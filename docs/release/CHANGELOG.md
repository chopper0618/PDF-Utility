# CHANGELOG

PDF Utility の変更履歴。

## Unreleased

### Planned

- Sprint 0.7.1: ページ移動ダイアログの独自モーダル化を検討
- Sprint 0.8.0: ページ操作 UX 安定化

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
