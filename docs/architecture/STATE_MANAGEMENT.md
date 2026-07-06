# STATE_MANAGEMENT

## 目的

PDF Utility では、Page Viewer と Page Map が同じページ順を表示し続けることが重要。そのため、ページ順を表す状態を明確にする。

## 中心となる状態

### Page Order

現在のページ順を保持する内部状態。

想定例。

```js
pageOrder = [
  { fileId: 'file-1', pageIndex: 0, pageId: 'file-1-p1' },
  { fileId: 'file-1', pageIndex: 1, pageId: 'file-1-p2' },
]
```

実際の実装では名前が異なる可能性がある。Sprint 0.7.0 開始時に、現在のコード上で Page Order に相当する変数を特定する。

## 状態の種類

| 状態 | 役割 |
|---|---|
| loadedFiles | 読み込まれた PDF ファイル情報 |
| pageOrder | 現在のページ順 |
| selectedPageId | 選択中ページ |
| currentScrollPageId | 現在表示中に近いページ |
| isDragging | ドラッグ中かどうか |
| dragSourcePageId | ドラッグ元ページ |
| dragTargetIndex | ドロップ予定位置 |
| readProgress | PDF 読み込み進捗 |
| statusMessage | Status Bar 表示内容 |

## 更新ルール

ページ構成を変更する操作は、必ず Page Order を更新し、その後に表示を再描画する。

```text
操作発生
↓
Page Order 更新
↓
Page Viewer 再描画
↓
Page Map 再描画
↓
Selection / Scroll / Status Bar 更新
```

## 禁止する状態

- Page Viewer だけ更新され、Page Map が古い
- Page Map だけ更新され、Page Viewer が古い
- 削除済みページが selectedPageId に残る
- 表示ページ番号と内部 pageIndex が混同される

## Page Index と Display Page Number

内部の `pageIndex` は 0 始まりの可能性がある。画面に出すページ番号は 1 始まりに統一する。

| 種類 | 例 | 用途 |
|---|---|---|
| pageIndex | 0 | 内部処理 |
| displayPageNumber | 1 | UI 表示 |

## Sprint 0.7.0 で確認すること

- Page Order 相当の状態はどこにあるか
- 並び替え後、Page Order が更新されているか
- 削除後、Page Map が Page Order から再描画されているか
- 移動コマンド後、Page Viewer と Page Map の両方が更新されるか
