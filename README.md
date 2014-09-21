# [markdown2bootstrapのコードブロックが残念だったので修正した - Qiita](http://qiita.com/tukiyo3/items/2243ea8c17fcdf2b6d10)

markdown2bootstrapのコードブロックが残念だったので修正した

ちょっと頑張ったけど全然ダメな箇所もあって力尽きた。

* [成果物 download](https://github.com/tukiyo/markdown2bootstrap)

## 修正内容

![before_after.png](https://qiita-image-store.s3.amazonaws.com/0/25728/fc8c1652-949c-1df2-2696-faf266f578ef.png "before_after.png")



# オリジナルの使い方

* [renier/markdown2bootstrap](https://github.com/renier/markdown2bootstrap)

```bash:インストール
npm install markdown2bootstrap
```

```bash:markdown->html変換
cp -a node_modules/markdown2bootstrap/bootstrap .
node_modules/.bin/markdown2bootstrap doc1.md
```

doc1.htmlが生成される。

```bash:タイトルを付けたい場合
node_modules/.bin/markdown2bootstrap -h true doc1.md
```
