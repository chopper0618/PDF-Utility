# ISSUE_17_THUMBNAIL_FILENAME

## Title

Thumbnail filename display improvement

## Sprint

Sprint 0.7.3

## Background

Sprint 0.7.2 で Page Map のファイル名を「先頭 + … + 末尾」表示に改善した。
同じ PDF が `-1.pdf` / `-2.pdf` のような末尾違いで存在する場合、Page Map では判別しやすくなったが、中央の Page Viewer サムネール下部ではまだ通常の省略表示が残っている。

Page Map と Page Viewer でファイル名表示ルールが違うと、ページ確認時に迷いが出る。

## Goal

Page Viewer のサムネール下部のファイル名も、Page Map と同じ「先頭 + … + 末尾」表示に統一する。

## Scope

### In scope

- サムネール下部のファイル名を中間省略表示にする
- Page Map と同じ表示ロジックを共通関数化する
- サムネールのマウスオーバーでフルファイル名を確認できる状態を維持する
- 元ページ番号、回転情報の表示を維持する

### Out of scope

- サムネールカードのレイアウト全体変更
- Page Map の操作仕様変更
- ファイル一覧の復活

## UX policy

ファイル名は CSS の `text-overflow: ellipsis` に任せるだけでは、末尾違いの PDF を判別しにくい。
そのため、JavaScript 側で明示的に表示名を生成し、画面上では短いが意味のある名前を表示する。

## Acceptance criteria

- サムネール下部でファイル名の先頭が見える
- サムネール下部でファイル名の末尾も見える
- `...1.pdf` / `...2.pdf` のような末尾違いを判別できる
- マウスオーバーでフルファイル名が表示される
- Page Map 側のファイル名表示が壊れない
- サムネールのクリック、ドラッグ、削除、Undo が従来どおり動く
