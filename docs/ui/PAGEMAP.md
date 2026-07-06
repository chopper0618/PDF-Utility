# PAGEMAP

## 役割

Page Map は、左側に表示する PDF 全体のページ構成マップ。

旧称「ファイルツリー」「左側のページ一覧」。今後は **Page Map** に統一する。

## Page Map が持つべき機能

- 現在のページ順を表示する
- 選択中ページをハイライトする
- Page Viewer のページ順と常に一致する
- Page Map の項目クリックで Page Viewer の該当ページへジャンプする
- 並び替え・削除・移動後に再描画される

## 表示項目

最低限。

- 表示ページ番号
- 元ファイル名またはファイル識別情報（長い場合は先頭＋末尾を表示）
- 元 PDF 内のページ番号
- 選択状態

例。

```text
1  sample.pdf p.1
2  sample.pdf p.2
3  another.pdf p.1
```

## 同期ルール

Page Map は Page Order をもとに描画する。

```text
Page Order
↓
Page Viewer
↓
Page Map
```

ではなく、正しくは以下。

```text
Page Order
├─ Page Viewer
└─ Page Map
```

Page Viewer の DOM を読んで Page Map を作るのではなく、同じ Page Order からそれぞれ描画する。

## Page Map クリックジャンプ

クリック時の処理。

1. クリックされた Page Map Item の pageId を取得
2. selectedPageId を更新
3. Page Viewer の該当 Page Item へスクロール
4. Page Viewer と Page Map の選択表示を更新
5. Status Bar を更新

## Sprint 0.7.0 の完了条件

- 並び替え後に Page Map の順番が変わる
- 削除後に Page Map から対象ページが消える
- 移動コマンド後に Page Map の順番が変わる
- Page Map クリックで該当ページへ移動する
- 選択中ページの表示が Page Viewer と Page Map で一致する

## Sprint 0.7.2 の表示整理

- Page Map 下部のファイル一覧は削除する
- 理由: 現時点で操作導線がなく、Page Map の主目的であるページ順確認を邪魔するため
- 各ページのファイル名は中間省略し、先頭と末尾が常に見えるようにする
- 同じ名前で `-1`、`-2` のような末尾違いがある場合でも判別しやすくする
- CSS の `text-overflow: ellipsis` だけに任せず、ファイル名を「先頭側」と「末尾側」の2要素に分けて表示する
- マウスオーバーの title では、ファイル名、元ページ番号、現在ページ番号を確認できる状態を維持する

## 注意点

- Page Map の表示番号は常に現在の並び順に基づく
- 元 PDF のページ番号と、現在の表示ページ番号を混同しない
- 大量ページでは Page Map の再描画コストに注意する
