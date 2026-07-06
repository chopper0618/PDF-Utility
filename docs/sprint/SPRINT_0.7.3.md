# SPRINT_0.7.3

## Theme

Thumbnail filename display improvement

## Issue

- Issue #17: Thumbnail filename display improvement

## Purpose

Page Viewer のサムネール下部に表示されるファイル名を、Page Map と同じ「先頭 + … + 末尾」表示に統一する。

## Background

病院業務では、同じ講習会資料、同じ帳票、同じスキャン名の PDF が末尾違いで複数存在することがある。
ファイル名の途中だけが見えても、どの PDF 由来のページか判断できない。

Page Map だけでなく、実際にページを操作する中央サムネールでも判別しやすい表示にする。

## Implementation plan

1. ファイル名短縮ロジックを共通関数として切り出す
2. Page Map のファイル名表示で共通関数を使う
3. サムネール下部のファイル名表示でも共通関数を使う
4. title 属性でフルファイル名を維持する
5. 表示と既存操作の手動確認を行う

## Acceptance checklist

- [ ] サムネール下部でファイル名の先頭と末尾が見える
- [ ] Page Map でも引き続き先頭と末尾が見える
- [ ] マウスオーバーでフルファイル名が見える
- [ ] Page Map クリックジャンプが動く
- [ ] サムネールの選択、ドラッグ、削除、Undo が動く

## Close condition

ファイル名表示ルールが Page Map と Page Viewer で統一され、ファイル名末尾違いの PDF を判別できること。
