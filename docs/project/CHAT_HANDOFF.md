# CHAT_HANDOFF

## 新しいチャットへの貼り付け用

PDF Utility 開発を再開します。

ローカル開発場所は `~/Projects/PDF-Utility` です。

現在の状態は **Sprint 0.7.0 / Issue #14「ページ移動・Page Map改善」レビュー完了** です。

次の候補は **Sprint 0.7.1「移動ダイアログ改善」** です。大きな Sprint 0.8.0 に入る前に、ブラウザ標準 `prompt()` を独自モーダルへ置き換えるか検討してください。

## 重要な前提

- 左側のページ一覧／ファイルツリーは **Page Map** と呼ぶ
- PDF 読み込み中のプログレス表示は実装済み
- ステータスバーの「〇ページ読み込み完了」表示も実装済み
- 最近使ったファイル機能は、現時点では不要
- docs は今後の唯一の正しい情報源として扱う
- 開発方針は Docs First / Issue 駆動 / UX 優先

## Sprint 0.7.0 で完了したこと

1. 並び替え・削除・移動後の Page Map 同期
2. Page Map クリックで該当ページへジャンプ
3. ドラッグ中に表示領域外へ移動できる自動スクロール
4. 選択ページを指定ページ番号へ直接移動
5. Ribbon 表記を「移動...」に短縮

## 残課題

- 「移動...」は標準 `prompt()` を使っているため、ダイアログタイトルにローカルアドレスが表示される
- 毎日使う業務用ツールとしては、独自モーダル化した方がよい

## 次の作業開始時に確認するファイル

- `docs/README.md`
- `docs/project/CURRENT_STATUS.md`
- `docs/project/ROADMAP.md`
- `docs/ui/RIBBON.md`
- `docs/sprint/SPRINT_0.7.0.md`
- `CHANGELOG.md`

## 最初の依頼文例

```text
PDF Utility 開発を再開します。
Sprint 0.7.0 / Issue #14 はレビュー完了です。
次は Sprint 0.7.1 として、「移動...」の標準 prompt を独自モーダルへ置き換える設計レビューから始めてください。
```
