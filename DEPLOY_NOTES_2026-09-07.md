# デプロイ時の注意（まだデプロイしていない）

## 手順（メモリ [[nakamura_site_deploy]] のとおり）
1. `npm run build`
2. `~/Dropbox/データ/2026-09-06/nakamurahiroyuki_site_redesign_preview/deploy_prep.sh <このディレクトリ>`
   （`deploy/` にしか無い10種を保全し、丸ごとバックアップを取ってから差し替える）
3. `cd ~/Desktop/nakamurahiroyuki && ./deploy.sh`
🔴 push では本番に出ない（Netlify CI は停止中）。デプロイは `deploy.sh` のみ。

## 🔴 今回だけ必要な `_redirects` の追記
`/video` の単独ページを廃止して `/work` に統合したので、**旧URLの受けを1行足す**。
`deploy/_redirects` は repo に無く `deploy/` 直下にしかないので、**手で足す**こと。

```
/video          /#/work           301!
```

置き場所 = 既存の `/about` 〜 `/sen-no-tsudoi` の 301 群の直後（catch-all `/*` より前）。
★ 実測: 現在 `https://nakamurahiroyuki.info/video` は catch-all で 200/text-html を返すが、
   HashRouter なので実際には Home が出る＝**そもそも深いリンクとして機能していない**。
   SPA 内の `/#/video` は App.tsx 側で `/work` へリダイレクト済み。

## デプロイ前に必ず確認
- `curl -s https://nakamurahiroyuki.info/ | grep -o "index-[A-Za-z0-9_-]*\.js"` と
  `grep -o "assets/index-[A-Za-z0-9_-]*\.js" ~/Desktop/nakamurahiroyuki/deploy/index.html` が**一致**すること
  （＝ deploy/ が本番と同じ状態から始められる）。2026-09-07 時点では両方 `index-DqG9yBGi.js` で一致を実測済み。
- デプロイしたら **必ずこのブランチをコミット/タグする**。9/6 はこれを怠って本番のソースを失った。
