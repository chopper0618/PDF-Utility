# ISSUE_16_DELETE_UX

## Title

Delete / Backspace 削除操作UX改善

## Sprint

Sprint 0.7.2

## 背景

Sprint 0.7.1 で、移動ダイアログ内の入力欄にフォーカスがある状態で Backspace を押すと、ページ削除ショートカットに誤爆する問題を修正した。

この流れで、削除操作そのものの UX も整理する。

PDF Utility は毎日使う業務用ツールを目指しているため、削除のたびに確認ダイアログを出すのではなく、削除後の状態を明示し、Undo で戻せることを伝える方針にする。

## Product 判断

削除時の確認ダイアログは、現時点では追加しない。

理由:

- 毎回確認が出るとクリック数が増える
- 大量ページ編集ではテンポが悪くなる
- Undo / Redo がすでにある
- 操作後に Status Bar で明示すれば、日常操作としては十分に安全性を上げられる

## 実装方針

- Delete / Backspace によるページ削除は維持する
- 入力欄、textarea、select、contenteditable、モーダル操作中の入力欄では削除ショートカットを実行しない
- 削除後は Status Bar に削除数と Undo 可能であることを表示する
- 削除後の Status Bar は `danger` 表示にし、通常状態より目立たせる
- Page Map と Page Viewer は削除後も現在の Page Order と同期する

## 表示メッセージ

```text
1ページを削除しました。Undoで元に戻せます。
3ページを削除しました。Undoで元に戻せます。
```

## Acceptance Criteria

- Delete / Backspace で選択ページを削除できる
- 削除後に Status Bar へ「Undoで元に戻せます。」を表示する
- 複数ページ削除時も削除ページ数が表示される
- 入力欄フォーカス中は Backspace でページが削除されない
- モーダル内の入力欄では Backspace / Ctrl+A / Command+A が通常の入力操作として動く
- Undo で削除前のページ構成に戻せる
- Page Map と Page Viewer が削除後も同期する
