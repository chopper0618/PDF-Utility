# ISSUE_20_EXPORT_DIALOG

## Title

PDF export save dialog cleanup

## Sprint

Sprint 0.8.0

## Background

PDF作成時にブラウザ標準の `window.prompt()` でファイル名を聞くと、アドレス表示つきの小さなダイアログになり、業務用アプリとしての一体感が弱い。

一方で、PDF保存時にはOS標準の保存ダイアログを使う方が自然で、ファイル名と保存先を一つの画面で指定できる。

## Decision

PDF Utility 内の独自モーダルは増やさず、PDF作成時は OS 標準保存ダイアログを使う。

## Scope

- ブラウザ標準 `window.prompt()` は使わない
- OS標準保存ダイアログでファイル名と保存先を指定する
- `.pdf` として保存できることを確認する
- 保存後にステータスバーへ結果を表示する
- キャンセルしてもページ状態や選択状態を壊さない

## Acceptance Criteria

- PDF作成時にブラウザ標準 prompt が表示されない
- OS標準保存ダイアログが表示される
- ファイル名を変更して保存できる
- `.pdf` として保存される
- 保存後にステータスバーで結果が分かる
- キャンセルしても既存操作が壊れない
