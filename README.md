# INDIES SCENE ARCHIVE — GitHub Pages

HTML・CSS・JavaScriptの静的サイトです。公開対象のJSONは `site/data/archive.json` です。

## 公開前

```
node tools/validate-public.cjs
```

現在はバンド0件・関係0件です。公開候補、未承認関係、架空データ、バックアップ、管理者情報をこのリポジトリに入れないでください。データを変更する際は、管理者確認を経た公開JSONだけを差し替えてください。

## 公開操作（承認後）

1. GitHub Freeでは公開リポジトリを使用します。追加サーバーや有料APIは不要です。
2. Settings → Pages → Source を GitHub Actions にします。
3. Actions → Publish reviewed archive → Run workflow を実行します。
4. デプロイ結果のURLで、地図・検索・詳細・相対URLを確認します。

workflow_dispatchのみで、pushによる自動公開はしません。必要に応じてgithub-pages環境のRequired reviewersを設定してください。

詳しいGitHub公式手順:
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

地図の出典は `site/THIRD_PARTY.md`。YouTubeはユーザーが読み込み操作をした場合だけ接続します。
