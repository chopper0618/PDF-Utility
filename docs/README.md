# PDF Utility Docs

この `docs/` は、PDF Utility 開発の唯一の正しい情報源として扱うためのドキュメント群です。

PDF Utility は、PDF の結合・ページ並び替え・削除・移動を、ブラウザ上で直感的に行える Web アプリです。

## 現在の開発フェーズ

| 項目 | 内容 |
|---|---|
| プロジェクト | PDF Utility |
| ローカル想定パス | `~/Projects/PDF-Utility` |
| 現在フェーズ | Sprint 0.7.0 レビュー完了、0.7.1 / 0.8.0 計画 |
| 現在バージョン | `0.7.0-alpha` |
| 直近完了 Issue | Issue #14「ページ移動・Page Map改善」 |
| 次候補 | Sprint 0.7.1「移動ダイアログ改善」または Sprint 0.8.0「ページ操作 UX 安定化」 |

## docs の読み方

まず `project/` を読めば、プロジェクトの目的・現在地・今後の方向性がわかります。実装に入る前は `architecture/` と `ui/` を確認します。実際の作業は `issue/` と `sprint/` の内容を基準に進めます。

## ディレクトリ構成

```text
docs/
├── README.md
├── project/
├── architecture/
├── ui/
├── development/
├── issue/
├── sprint/
└── release/
```

## 重要な用語

左側のページ一覧／ファイルツリーは **Page Map** と呼びます。単なるファイルツリーではなく、PDF 全体のページ構成を確認し、ページへジャンプし、並び替え後の状態を把握するためのナビゲーション領域です。

## Sprint 0.7.0 で完了したこと

1. 並び替え・削除・移動後に Page Map を現在順へ同期
2. Page Map クリックで該当ページへジャンプ
3. ドラッグ中に表示領域の上下端で自動スクロール
4. 選択ページを指定ページ番号へ直接移動
5. Ribbon 表記を「移動...」に短縮

## 残っている UX 課題

- 「移動...」はブラウザ標準 `prompt()` を使っているため、ダイアログタイトルにローカルアドレスが表示される
- 毎日使うツールとしては独自モーダル化した方がよい

## docs 更新ルール

- 仕様を変えたら、コードだけでなく docs も更新する
- UI 名称を変えたら `project/TERMS.md` と該当する `ui/` 文書を更新する
- Sprint の完了条件を変えたら `sprint/ACCEPTANCE_CHECKLIST.md` を更新する
- 次のチャットへ移る前に `project/CHAT_HANDOFF.md` を更新する
