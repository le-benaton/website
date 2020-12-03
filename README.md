# 西宮・夙川のフレンチレストラン「ル・ベナトン」
西宮・夙川のフレンチレストラン「ル・ベナトン」Webサイトのレポジトリです。以下URLで公開しています。

[benaton.net](https://www.benaton.net/)

## 更新用リンク
|  項目  |  ファイル  |
| ---- | ---- |
|  お知らせ（画像あり）  |  https://github.com/le-benaton/website/edit/master/src/data/announcement.ts  |
|  お知らせ  |  https://github.com/le-benaton/website/edit/master/src/data/news.ts  |
|  白ワイン  |  https://github.com/le-benaton/website/edit/master/src/data/white-wine.ts  |
|  赤ワイン  |  https://github.com/le-benaton/website/edit/master/src/data/red-wine.ts  |
|  シャンパン  |  https://github.com/le-benaton/website/edit/master/src/data/champagne-wine.ts  |

### お知らせ（画像あり）に利用する画像をアップロードする方法
1. 画像を用意します。事前に、縦横300px程度にリサイズしてください。
2. 画像ファイル名に日本語が使われている場合、英数字のファイル名に変更します
3. https://github.com/le-benaton/website/tree/master/src/template/images/announcement にアクセスして、右上の `Add file` > `Upload files` からファイルをアップロードしてコミットします。
3. URLは、 `images/announcement/` + ファイル名となります。例えば `104380ga10000003.jpg` というファイルをアップロードした場合、 `images/announcement/104380ga10000003.jpg` を以下のように `image` に指定ください。

```ts
{
  image: 'images/announcement/104380ga10000003.jpg',
  title: 'クリスマス限定特別セットの予約受付をはじめました',
  body: 'クリスマスという特別な日に、ご家庭の食卓を華やかに彩る2～3人前のオードブルを予約限定で提供します。ブルゴーニュの定番料理「ジャンボン・ペルシエ」やミニサイズの鳥の丸焼きみたいな感じでライティングするんですがよく考えたらメニューわからないのでこんな感じです。電話にてご予約ください。',
},
```

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
