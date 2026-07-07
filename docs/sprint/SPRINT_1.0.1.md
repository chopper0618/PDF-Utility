# Sprint 1.0.1: Version display sync and beta polish

## Sprint Goal

1.0.0-beta 試用開始前に、アプリ上のバージョン表示と Project Docs / package metadata の整合性をそろえる。

## Scope

### In scope

- アプリヘッダーのバージョン表示を `v1.0.0-beta` に更新
- 1.0.0 リリースチェックリストへの表示確認項目追加
- Project Docs への小修正記録

### Out of scope

- ページ操作ロジックの変更
- Google Drive 連携
- 認証機能
- 新規 UI 機能
- `dist` 配下の手動編集

## 実装方針

アプリヘッダーは `context.state.version` を表示しているため、初期状態である `src/core/state.js` の `appState.version` を更新する。

将来的には `package.json` の version をビルド時に注入する設計も考えられるが、今回は 1.0.0-beta 試用前の最小修正として、既存構造を維持する。

## 動作確認

1. `npm run dev` でローカル起動する。
2. 画面左上に `v1.0.0-beta` と表示されることを確認する。
3. PDF を追加できることを確認する。
4. 最低限のページ操作を確認する。
5. `npm run build` が通ることを確認する。

## 判断

これは機能追加ではなく、1.0.0-beta 試用前の整合性修正として扱う。表示だけが古い状態は利用者に混乱を与えるため、部門内試用前に修正する。
