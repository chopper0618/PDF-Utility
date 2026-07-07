# CODING_STYLE

## 基本方針

読みやすさと、状態の追いやすさを優先する。

PDF Utility では Page Order、Page Viewer、Page Map の関係が重要なので、どの関数が状態を変更し、どの関数が描画するのかを明確にする。

## 命名方針

| 対象 | 例 |
|---|---|
| 状態 | `pageOrder`, `selectedPageId`, `isDragging` |
| 描画 | `renderPageViewer()`, `renderPageMap()` |
| 状態更新 | `movePage()`, `deletePage()`, `reorderPages()` |
| イベント | `handlePageMapClick()`, `handleDragStart()` |
| Status Bar | `setStatusMessage()` |

## 関数の分け方

### 良い例

```js
moveSelectedPage(direction, step) {
  updatePageOrder(direction, step)
  renderAll()
  setStatusMessage(...)
}
```

### 避けたい例

```js
button.onclick = () => {
  // DOMを直接入れ替え、状態は更新しない
}
```

## 描画ルール

Page Viewer と Page Map は、どちらも Page Order から描画する。

DOM の現在順を正として扱わない。

## コメント方針

複雑なイベント処理には、何を守るための処理かをコメントする。

例。

```js
// Page Map と Page Viewer の順番を必ず一致させるため、Page Order 更新後に両方を再描画する
```

## エラー処理

- 失敗を握りつぶさない
- Status Bar に表示する
- console に詳細を出す
- ユーザーに見せる文言は短くする

## Sprint 0.7.0 の注意点

- 自動スクロール処理は drag event 内で過剰に重くしない
- 指定ページ番号は数値として検証する
- 1未満、総ページ数超過、数値以外は Status Bar で短く伝える
- Page Map 同期は renderAll など共通処理に寄せる
