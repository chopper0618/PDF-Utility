# Sprint 0.8.2: Page Map drag reorder

## Sprint Goal

Page Map からもページ順を直接編集できるようにし、Page Viewer と同じページ操作状態に同期させる。

## Issue

- Issue #22: Page Map drag reorder

## 方針

Page Map は、ページ全体を俯瞰するための左パネルである。ここに全ての操作を詰め込むのではなく、まずはページ構成に直結するドラッグ並び替えだけを追加する。

削除、回転、複製などの詳細操作は、引き続き中央サムネール側に集約する。

## 実装内容

- Page Map 項目を draggable にする
- Page Map 内の dragstart / dragover / dragleave / drop / dragend を実装
- Drop 時は既存の `reorderPage` action を使い、Page Viewer と同じ状態更新経路に乗せる
- ドラッグ後のクリック誤発火を抑制する
- Page Map のファイル名表示を微調整し、末尾識別情報が残りやすいようにする

## Review checklist

- Page Map 上でページをドラッグして並び替えできる
- Page Viewer の並び順も同期する
- Undo / Redo が動く
- Page Map クリックジャンプが壊れていない
- 中央サムネールのドラッグ並び替えが壊れていない
- Page Map のファイル名末尾が以前より判別しやすい
