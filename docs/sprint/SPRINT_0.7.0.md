# SPRINT_0.7.0

## Sprint 名

Sprint 0.7.0: Page Map 改善

## Sprint 状態

レビュー完了。機能面は close 可能。

## Sprint 目的

PDF Utility のページ移動と Page Map の同期を改善し、大量ページ PDF でも操作しやすくする。

## 開始 Issue

Issue #14「ページ移動・Page Map改善」

## 背景

現状、ファイル操作を快適にするために以下が必要。

- 移動時に表示領域外のページへ移動できない
- 移動コマンドは「何ページ分動かすか」より「何ページ目へ移動するか」の方が直感的
- 左側の Page Map に並び替え後の状態を反映したい

## Sprint ゴール

- Page Map が現在の Page Order と一致する
- Page Map クリックでページへジャンプできる
- ドラッグ中に上下へ自動スクロールできる
- 移動コマンドで指定ページ番号へ直接移動できる

## 実装順

### Step 1: コード確認

- Page Order 相当の状態を特定
- Page Viewer 描画処理を特定
- Page Map 描画処理を特定
- drag reorder 処理を特定
- move command 処理を特定

### Step 2: Page Map 同期

- Page Order 更新後に Page Viewer と Page Map を再描画する
- 削除・並び替え・移動コマンドすべてで同期する

### Step 3: Page Map クリックジャンプ

- Page Map Item に pageId を持たせる
- クリック時に selectedPageId を更新
- Page Viewer の該当ページへ scrollIntoView などで移動

### Step 4: 指定ページへ移動

- 「上へ移動」「下へ移動」は廃止する
- UI 表記は「移動...」とし、選択ページを指定ページ番号へ移動する
- 入力値を移動量ではなく移動先ページ番号として扱う
- 範囲外・数値以外は移動せず Status Bar に表示する

### Step 5: ドラッグ中自動スクロール

- ドラッグ中に Page Viewer の上下端を検出
- 一定範囲内に入ったらスクロール
- drag end でスクロール処理を停止

### Step 6: 受け入れチェック

`sprint/ACCEPTANCE_CHECKLIST.md` に沿って確認する。

## 完了条件

- Page Viewer と Page Map が常に一致する
- 大量ページでも表示外へ移動できる
- 指定ページへ移動が大量ページで使いやすい
- 操作後に Status Bar で結果がわかる
- docs が更新されている


## レビュー結果

ユーザー確認結果。

- PDFを複数ページ読み込む：OK
- Page Map が左側に現在順で出る：OK
- Page Map のページクリックで中央サムネイルへ移動：OK
- サムネイルをドラッグして、上下端で自動スクロール：OK
- 並び替え後に Page Map の順番も変わる：OK
- 「移動...」で指定ページ番号へ移動：OK

## 残課題

標準 `prompt()` のダイアログタイトルにローカルアドレスが表示される。これはブラウザ仕様のため、Sprint 0.7.1 で独自モーダル化を検討する。
