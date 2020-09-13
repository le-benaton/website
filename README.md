# 西宮・夙川のフレンチレストラン「ル・ベナトン」
西宮・夙川のフレンチレストラン「ル・ベナトン」Webサイトのレポジトリです。以下URLで公開しています。

[benaton.net](https://www.benaton.net/)

## 更新用リンク
|  項目  |  ファイル  |
| ---- | ---- |
|  お知らせ  |  https://github.com/le-benaton/website/edit/master/src/data/news.ts  |
|  白ワイン  |  https://github.com/le-benaton/website/edit/master/src/data/white-wine.ts  |
|  赤ワイン  |  https://github.com/le-benaton/website/edit/master/src/data/red-wine.ts  |
|  シャンパン  |  https://github.com/le-benaton/website/edit/master/src/data/champagne-wine.ts  |

### 更新に失敗した
ビルドに必要な情報を間違って削除してしまったり、フォーマットを変更してしまった時、Webサイトには反映されずに更新できなかったという通知が更新を行ったユーザのメールアドレスにいきます。更新後に反映されなかった場合は、メールをご確認ください。

## ライセンス
### テキスト・写真データ
本レポジトリにあるテキスト、写真データは著作権をル・ベナトンが有しており、**オープンソースではありません**。本レポジトリをForkすることの制限はありませんが、それ以外の場所で引用の範囲を越える利用については固くお断りしています。

### ソースコード
ソースコード（テキスト・写真データ以外）はMITライセンスで公開しています。

Copyright (c) 2020 Le Benaton<br />
Released under the MIT license

## 構成
本レポジトリは以下のように設定されています。
```
le-benaton/
├── .github/ ............. GitHub Actionsのコントロール
├── scripts/ ............. テンプレート反映用スクリプト
├── src/
│   ├── data/ ............ お知らせ、ワインリストのデータ
│   └── template/ ........ Webサイトテンプレート
├── .gitignore ........... GitHubで管理しないソースコードの指定
├── package.json ......... ライブラリ管理用ファイル
├── package-lock.json .... ライブラリのバージョンチェック用（自動生成）
├── prettier.config.js ... ソースコードの自動整形設定ファイル
├── README.md ............ 本ファイル
└── tsconfig.json ........ スクリプト設定ファイル
```

### インストールからビルド方法
以下コマンドによって `www/` が生成されます。wwwが公開用ファイル一式です。

```bash
% git clone git@github.com:le-benaton/website.git
% cd website
% npm install
% npm run build
```

#### 開発用コマンド
以下コマンドを実行すると、 `src` 以下を監視して、変更があった時 `npm run build` を実行します。

```bash
% npm run watch
```
