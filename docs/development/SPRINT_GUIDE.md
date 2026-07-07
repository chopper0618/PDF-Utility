# SPRINT_GUIDE

## Sprint の目的

大きな変更を小さく区切り、安全に動作確認しながら進める。

## Sprint の基本構成

1. Sprint 目的を決める
2. Issue を決める
3. 完了条件を決める
4. 実装を小さく分ける
5. チェックリストで確認する
6. docs と CHANGELOG を更新する

## Sprint 0.7.0 の流れ

1. 現在のコード構成を確認
2. Page Order 相当の状態を特定
3. Page Viewer / Page Map の描画関数を確認
4. Page Map 同期を実装
5. Page Map クリックジャンプを実装
6. ドラッグ中自動スクロールを実装
7. 指定ページへ移動を実装
8. 受け入れチェック

## Sprint 中の判断基準

- 既存機能を壊さない
- 迷ったら Page Order を中心に考える
- UI 表示のズレはバグとして扱う
- 仕様が変わったら docs を更新する

## Sprint 完了時に更新する文書

- `sprint/ACCEPTANCE_CHECKLIST.md`
- `release/CHANGELOG.md`
- `project/CURRENT_STATUS.md`
- `project/CHAT_HANDOFF.md`
