# EVENT_FLOW

## 目的

ページ操作時のイベントの流れを整理し、Page Viewer と Page Map の同期漏れを防ぐ。

## 基本イベントフロー

```text
User Action
↓
Event Handler
↓
State Update
↓
Render Page Viewer
↓
Render Page Map
↓
Update Status Bar
```

## PDF 読み込み

```text
ファイル選択 / ドロップ
↓
PDF 読み込み開始
↓
プログレス更新
↓
ページ情報を Page Order に追加
↓
Page Viewer 描画
↓
Page Map 描画
↓
Status Bar に「〇ページ読み込み完了」
```

## ドラッグ並び替え

```text
ページをドラッグ開始
↓
isDragging = true
↓
ドラッグ位置を監視
↓
上下端なら自動スクロール
↓
ドロップ位置を計算
↓
Page Order を並び替え
↓
Page Viewer / Page Map を再描画
↓
選択状態とスクロール位置を調整
↓
Status Bar 更新
```

## 移動コマンド

```text
ページを選択
↓
移動方向とページ数を指定
↓
移動先 index を計算
↓
Page Order を更新
↓
Page Viewer / Page Map を再描画
↓
移動後ページへスクロール
↓
Status Bar 更新
```

## Page Map クリック

```text
Page Map の項目をクリック
↓
対応する pageId を取得
↓
selectedPageId を更新
↓
Page Viewer の該当ページへスクロール
↓
Page Map の選択表示を更新
↓
Status Bar 更新
```

## 削除

```text
ページを選択
↓
削除コマンド
↓
Page Order から削除
↓
選択ページを再決定
↓
Page Viewer / Page Map を再描画
↓
Status Bar 更新
```

## 注意点

- UI イベントから直接 DOM だけを変更しない
- 必ず State を更新してから描画する
- 描画関数は Page Order を唯一の基準にする
- Page Map 同期は後回しにしない
