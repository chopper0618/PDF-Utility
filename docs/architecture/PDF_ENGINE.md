# PDF_ENGINE

## 目的

PDF Engine は、PDF の読み込み、ページ情報の取得、プレビュー生成、書き出しを担当する領域。

UI の Page Viewer や Page Map は、PDF Engine から得たページ情報を元に表示する。

## 主な責務

- PDF ファイルの読み込み
- ページ数の取得
- ページプレビューの生成
- 複数 PDF のページ統合
- 編集後 PDF の書き出し
- 読み込みエラーの検出

## 読み込み進捗

PDF 読み込み中のプログレス表示は実装済みとして扱う。

ステータスバーには「〇ページ読み込み完了」のような進捗が表示される。

## PDF Engine と State の関係

PDF Engine は PDF の実データを扱う。Page Order は「どのファイルの何ページ目を、現在どの順番で使うか」を表す。

PDF Engine 自体が UI の順番を直接持つのではなく、State 側の Page Order を基準に Page Viewer / Page Map を描画する。

## エラー例

今後整理するエラー候補。

- PDF ではないファイル
- 破損 PDF
- パスワード付き PDF
- 0ページまたは読み込み不能
- 大量ページによるメモリ不足

## Sprint 0.7.0 での扱い

Sprint 0.7.0 の主対象は Page Map とページ移動 UX。PDF Engine 自体の大きな変更は避ける。

ただし、Page Order の再構成時に PDF Engine のページ参照とズレないように確認する。
