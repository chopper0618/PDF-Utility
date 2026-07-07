# Sprint 0.8.3: Thumbnail preview overlay

## Issue

- Issue #23: Thumbnail preview overlay

## Goal

サムネールをダブルクリックして、ページ内容を大きく確認できるようにする。

## Implemented

- Thumbnail card の `dblclick` で preview overlay を開く
- Preview overlay に現在ページ番号、ファイル名、元ページ番号、回転角度を整理して表示
- ×、背景クリック、Escape で preview overlay を閉じる
- 元PDFからプレビュー用の大きめ画像を生成して表示
- Preview overlay 表示中はページ操作ショートカットを抑制
- Status Bar に preview 表示・終了のフィードバックを表示

## UX Decision

0.8.3 では「開く・見る・閉じる」に限定する。
左右キーで前後ページ移動、拡大率変更は便利だが、まずは操作誤爆がない安定したプレビューを優先する。
サムネールの単純表示では拡大感が弱いため、元PDFからプレビュー用画像を生成する。

## Review Checklist

- サムネールダブルクリックでサムネールより大きいプレビューが開く
- プレビュー内に現在ページ番号・ファイル名・元ページ番号・回転角度が表示される
- Escape で閉じる
- 背景クリックで閉じる
- × ボタンで閉じる
- プレビュー表示中に Backspace / Delete でページ削除されない
- プレビュー表示中に Undo / Redo が誤爆しない
- 閉じた後に削除、複製、回転、移動、並び替え、PDF作成が通常どおり動く
