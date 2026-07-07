# DESIGN_SYSTEM

## UI の基本方針

PDF Utility の UI は、ページ操作を迷わず行えることを重視する。

- 主要操作は上部 Ribbon に集約する
- ページ構成は左側 Page Map で確認する
- 実際のページは Page Viewer で確認する
- 状態や結果は Status Bar に表示する
- 選択ページや補助情報は Properties に表示する

## レイアウト概念

```text
┌────────────────────────────┐
│ Ribbon                     │
├──────────┬─────────────────┤
│ Page Map │ Page Viewer     │
│          │                 │
├──────────┴─────────────────┤
│ Status Bar                 │
└────────────────────────────┘
```

## 表示の優先順位

1. 現在選択中のページ
2. 操作結果
3. 読み込み状態
4. エラー・警告
5. 補助情報

## 操作後のフィードバック

操作後は、少なくとも以下のいずれかで結果がわかるようにする。

- Page Viewer の順番が変わる
- Page Map の順番が変わる
- 選択ページが維持される
- Status Bar に結果が表示される

## 大量ページ対応

大量ページ PDF では、ドラッグだけに依存すると操作しにくい。そのため、移動コマンドと Page Map によるジャンプを併用する。

## 命名ルール

- 左側の一覧は Page Map
- 中央のページ表示は Page Viewer
- 上部操作領域は Ribbon
- 下部状態表示は Status Bar
- 補助情報領域は Properties

## ファイル名表示

長いファイル名は、単純な末尾省略ではなく「先頭 + … + 末尾」で表示する。

理由:

- 同名に近いPDFの末尾違いを判別しやすくする
- Page Map と Page Viewer で表示ルールを統一する
- 必要な場合はマウスオーバーでフルファイル名を確認できるようにする

対象:

- Page Map のページ行
- Page Viewer のサムネール下部


## Thumbnail filename layout

- Page Map filenames remain single-line for fast scanning.
- Thumbnail card filenames may use up to two lines because this area is used for direct page operations.
- Filename shortening must preserve the beginning and the ending of the original filename.
- Full filenames should remain available via hover tooltip.
