# SPRINT_0.7.2

## Theme

削除操作UX改善と Page Map 表示整理

## 目的

Sprint 0.7.0 と 0.7.1 で Page Map と移動操作は大きく改善した。

Sprint 0.7.2 では、ページ削除後のフィードバックを改善し、左側 Page Map の情報量を整理する。

## Scope

### Issue #16: Delete / Backspace 削除操作UX改善

- 削除後に Status Bar へ削除結果を表示
- Undo できることを明示
- 入力欄フォーカス中の削除ショートカット誤爆防止を維持

### Page Map 表示整理

- Page Map 下部のファイル一覧を削除
- 各ページのファイル名は、先頭と末尾が見えるように中間省略する
- マウスオーバーでファイル名、元ページ番号、現在ページ番号を確認できる状態を維持

## Out of Scope

- 削除確認ダイアログ
- トースト通知
- Page Map の仮想スクロール
- ファイル別グルーピング表示
- Export ダイアログ改善

## Acceptance Checklist

- [ ] Delete / Backspace で選択ページを削除できる
- [ ] 削除後に「Undoで元に戻せます。」が Status Bar に表示される
- [ ] 削除後の Status Bar メッセージが赤系で通常状態より目立つ
- [ ] 複数ページ削除時に削除ページ数が反映される
- [ ] Undo で削除前に戻る
- [ ] Page Map 下部にファイル一覧が表示されない
- [ ] Page Map の各ページで、ファイル名の先頭と末尾が見える
- [ ] Page Map のファイル名末尾が CSS の省略表示で消えない
- [ ] Page Map のマウスオーバーで全体情報を確認できる
- [ ] Page Map と Page Viewer が削除・Undo 後も同期する

## Commit message

```text
Improve delete feedback and Page Map labels
```
