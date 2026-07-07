# ROADMAP

## v1.0 までの考え方

v1.0 は、PDF の読み込み、ページ単位の整理、複数 PDF の結合、書き出しが安定して行える状態を目指す。

派手な機能よりも、まずは「安心してページ操作できること」「画面表示と実際の PDF 構成がズレないこと」「部門内で試用できる説明と制限事項が揃っていること」を優先する。

## Sprint 一覧

| Version / Sprint | 主テーマ | 状態 |
|---|---|---|
| Project Docs Sprint | 知識整理、docs 作成 | 完了 |
| Sprint 0.7.0 | Page Map 改善 | 完了 |
| Sprint 0.7.1 | 移動ダイアログ改善 | 完了 |
| Sprint 0.7.2 | 削除操作UX改善 / Page Map表示整理 | 完了 |
| Sprint 0.7.3 | サムネールファイル名表示改善 | 完了 |
| Sprint 0.7.4 | サムネールカードレイアウト調整 | 完了 |
| Sprint 0.7.5 | Undo / Redo UX refinement | 完了 |
| Sprint 0.8.0 | 書き出しUX改善 | 完了 |
| Sprint 0.8.1 | ページ操作後の選択状態安定化 | 完了 |
| Sprint 0.8.2 | Page Map drag reorder | 完了 |
| Sprint 0.8.3 | Thumbnail preview overlay | 完了 |
| Sprint 0.8.4 | Preview keyboard navigation | 完了 |
| Sprint 0.8.5 | Preview UI polish | 完了 |
| Sprint 0.9.0 | GitHub Pages trial deployment | 完了 |
| Sprint 1.0.0 | Release check / beta preparation | 完了 |
| Sprint 1.0.1 | Version display sync / beta polish | 進行中 |
| Sprint 1.0.2 | Trial feedback fixes | 候補 |
| Sprint 1.1.0 | Export error handling | 候補 |

---

## Completed focus

### Sprint 0.7.x: Page operation foundation

完了。

- Page Map 同期
- Page Map クリックジャンプ
- ドラッグ中自動スクロール
- 指定ページ番号への直接移動
- 先頭／末尾への移動
- 移動ダイアログ独自モーダル化
- 削除後の選択状態改善
- ファイル名表示改善
- Undo / Redo UX 改善

### Sprint 0.8.x: Export and preview usability

完了。

- PDF作成時のブラウザ標準 prompt を廃止
- OS標準の保存ダイアログでファイル名と保存先を指定
- Page Map 上でページをドラッグ並び替え
- サムネールのダブルクリックで拡大プレビューを表示
- プレビュー中の左右キー移動
- プレビュー内の拡大・縮小・フィット表示
- プレビュー中のショートカット誤爆防止

### Sprint 0.9.0: GitHub Pages trial deployment

完了。

- Vite の `base` を `/PDF-Utility/` に設定
- GitHub Actions で `dist` を GitHub Pages へ公開
- GitHub Pages の Source を `GitHub Actions` に設定
- Google Sites にはリンクボタンとして配置する方針に整理
- Google Drive 連携や認証情報の追加は行わない方針を明文化

---

## Sprint 1.0.0: Release check / beta preparation

完了。

目的:

PDF Utility を **部門内で試用できる 1.0.0-beta 相当** に整える。

Scope:

- `docs/release/RELEASE_CHECKLIST_1.0.0.md` を追加
- `docs/release/KNOWN_LIMITATIONS.md` を追加
- `docs/release/GOOGLE_SITES_LISTING.md` を追加
- `README.md` に公開 URL と試用時の注意を追記
- `CURRENT_STATUS.md` を 1.0.0-beta 準備状態へ更新
- `ROADMAP.md` を 1.0.0-beta 以降の流れへ更新
- `CHANGELOG.md` / `docs/release/CHANGELOG.md` を更新
- `package.json` の version を `1.0.0-beta` へ更新

Non-scope:

- Google Drive 連携
- 認証機能
- API キーを必要とする機能
- 大きな UI 変更
- 既存のページ操作ロジック変更

---

## Sprint 1.0.1: Version display sync / beta polish

進行中。

目的:

1.0.0-beta 試用開始前に、アプリ左上のバージョン表示を `v1.0.0-beta` にそろえる。

Scope:

- `src/core/state.js` の `appState.version` を `1.0.0-beta` へ更新
- リリースチェックリストへアプリ表示バージョン確認を追加
- Issue #27 / Sprint 1.0.1 docs を追加

Non-scope:

- 機能追加
- ページ操作ロジック変更
- `dist` 配下の手動編集
- `package.json` からの version 自動注入設計

---

## Sprint 1.0.2: Trial feedback fixes

候補。

- 部門内試用で出た軽微な不具合修正
- Google Sites 掲載文の調整
- 操作説明の補強
- Chrome / Edge での表示差異修正
- 日常利用で迷いやすい操作の改善

---

## Sprint 1.1.0: Export error handling

候補。

- PDF 書き出し時の状態検証
- 空 PDF、破損 PDF、パスワード付き PDF の扱い
- 読み込み失敗時のメッセージ
- 書き出し失敗時のメッセージ
- 大量ページでの速度確認
- 保存後確認導線の改善

---

## v1.0-beta の完了条件

- GitHub Pages で開ける
- Google Sites のリンクから開ける
- Chrome / Edge で動作確認できる
- PDF を読み込める
- 複数 PDF を結合できる
- ページを削除できる
- ページを並び替えできる
- Page Map でページ順を確認・並び替えできる
- 回転・複製・指定ページ移動・先頭／末尾移動ができる
- Undo / Redo が使える
- サムネイルとプレビューでページ内容を確認できる
- 編集後の PDF を保存できる
- README に公開 URL と試用時の注意がある
- 既知の制限事項が docs に明記されている
- Google Drive 連携なし、認証情報・API キーなしの方針が明記されている
- アプリ左上の表示が `v1.0.0-beta` になっている

## v1.0 正式版に向けた判断

1.0.0-beta の部門内試用後、次の点を確認して正式版へ進む。

- 試用者が迷わず PDF のページ整理を完了できる
- 日常的な PDF サイズで速度が許容範囲
- 保存後 PDF のページ順・回転・削除・複製が期待通り
- エラー時の説明が不足している箇所が把握できている
- 患者情報を含む PDF の取り扱い注意が運用上問題ない
