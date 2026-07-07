# SPRINT_0.8.0

## Theme

PDF export save dialog cleanup

## Goal

PDF作成時の保存UXを整理し、ブラウザ標準 `prompt()` を使わず、OS標準保存ダイアログで自然に保存できる状態にする。

## Product Decision

PDF作成では独自モーダルを増やさない。

理由は、保存先選択とファイル名変更をOS標準保存ダイアログ内でまとめて行えるため。独自モーダルを挟むと操作が二段階になり、クリック数が増える。

## Done Criteria

- PDF作成ボタンでOS標準保存ダイアログが開く
- ファイル名を変更できる
- `.pdf` として保存できる
- 保存後にステータスバーへ結果が表示される
- キャンセルしても状態が壊れない
- 既存のページ操作、Undo / Redo が壊れていない

## Out of Scope

- 独自PDF作成モーダル
- 保存先管理
- 最近使った保存先
- Google Drive連携
