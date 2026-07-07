# Sprint 0.7.5: Undo / Redo UX refinement

## Theme

操作履歴の安心感を高める。

## Background

Sprint 0.7.0〜0.7.4 で、Page Map、ページ移動、削除フィードバック、ファイル名表示を改善した。
次の大きな機能へ進む前に、削除・移動・並び替えなどを安心して試せるよう、Undo / Redo のUXを整える。

## Target issue

- Issue #19: Undo / Redo UX refinement

## Implementation plan

1. 履歴保存時に操作名を持たせる
2. Undo 実行時に操作名つきステータスを表示する
3. Redo 実行時に操作名つきステータスを表示する
4. Undo / Redo 後に context menu / dialog を閉じる
5. 既存ショートカット制御を維持する

## Manual test checklist

- 削除 → Undo → Redo
- 移動... → Undo → Redo
- 先頭へ / 末尾へ → Undo → Redo
- ドラッグ並び替え → Undo → Redo
- 回転 → Undo → Redo
- 複製 → Undo → Redo
- 複数選択削除 → Undo → Redo
- モーダル入力中の Backspace / Delete 誤爆なし

## Close condition

Undo / Redo 後に、何が戻った／やり直されたのかがステータスバーで分かり、
主要ページ操作で Page Map とサムネールの同期が維持されること。
