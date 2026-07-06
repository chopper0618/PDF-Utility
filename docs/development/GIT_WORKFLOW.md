# GIT_WORKFLOW

## 目的

小さな変更を安全に積み上げるための Git 運用ルール。

## 基本方針

- Sprint 単位でブランチを切る
- Issue 単位で小さくコミットする
- 動作確認できた単位でコミットする
- docs 更新もコミット対象に含める

## ブランチ例

```bash
git checkout -b sprint/0.7.0-page-map
```

Issue 単位にさらに分ける場合。

```bash
git checkout -b issue/14-page-map
```

## コミットメッセージ例

```text
docs: add project docs structure
feat(page-map): sync page map after reorder
feat(page-map): jump to page from page map
feat(move): add move step input
fix(drag): auto scroll while dragging pages
```

## 作業開始時

```bash
git status
git branch
```

未コミット変更がある場合は、内容を確認してから作業を始める。

## 作業終了時

```bash
git status
git diff
```

確認後、意味のある単位でコミットする。

## docs 更新ルール

仕様変更がある場合は、コードと同じコミットまたは連続するコミットで docs も更新する。

## 注意点

- 大きな変更を 1 コミットにまとめない
- 動かない状態を main に入れない
- チャット移行前に `project/CHAT_HANDOFF.md` を更新する
