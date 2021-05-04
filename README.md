# About

このサービスは自分のリリースノート、その名も”じぶんリリースノート”を公開できるサービスです。

## じぶんリリースノートとは？

- 以下のようなものを指します

[じぶん Release Notes（ver 0.31.02）｜ryoKawamata｜note](https://note.com/ryo_kawamata/n/nc5ba86c2dd02)

- 自分をなんらかのソフトウェアにたとえて、そのバージョン番号とアップデート内容を書いていくもの
    - 自分のバージョン名とともに、ここ最近でどのような活動をしたかを書いていく
- 特徴としては
    - SNSの投稿や記事の投稿のように、何らかの特定のテーマに絞った投稿ではない
    - 自分の振り返りのために使っている
    - あとから見ると、自分がどれくらいの速度で何を学び、進歩しているかがわかる
    - 他人から見ても、他人の勉強内容や速度が俯瞰できて、自分の活動の参考にできる
- エンジニア界隈で流行っている感じがするが、どの業種でも成り立ちはしそう
    - とはいえリリースノートという概念から、IT界隈に書く人は限られると思われる

## 本サービスの概要

- じぶんリリースノートを投稿できるサービス
- 投稿したものは専用のページができて、SNSでシェアするとOGP画像が表示される

[![Image from Gyazo](https://i.gyazo.com/1a2d745ba5971875384ae44fe49858ba.png)](https://gyazo.com/1a2d745ba5971875384ae44fe49858ba)

- じぶんリリースノートを投稿するだけだと、既存のブログサービスに投稿すればいいと思われるが、以下のようなメリットが有る
    - QiitaやZenn→あくまで自分の学習ログなので投稿しにくい※QiitaやZennに投稿した内容をじぶんリリースノートに加えるのはあり
    - note→すでにnoteを雑多な目的で利用しているのならば、投稿が混ざってしまう
    - SNSでシェアするときにOGP画像が専用で付与されるので本サービスを利用するほうが映える
- 入力項目が整備されている
    - リリースごとに入力する内容は以下の通り
        - バージョン
        - リリース内容
            - Keep
            - Problem
            - Try
            - Features：新しくできるようになったこと
            - Thanks To：今回のリリースにあたって感謝したい人
- 投稿する感覚は任意。個人的には毎月とか毎週というように固定頻度でやり、年齢を重ねるごとや転職するごとにメジャーアップデートにするのが良さそうと思っている

---

### β版について

- 現時点では、開発者[meijin](https://meijin.dev)がmicroCMS上に保存したコンテンツを取得して表示するだけのサービスとなっています
- 不特定多数のユーザーによる投稿、閲覧ニーズを確認すれば、認証機能や投稿機能を開発します

## 技術スタック

### Next.js

言わずとしれたReactのWebフレームワーク。今回は複数ページを持つアプリケーションでかつ今後の機能追加がある程度見込まれること、そしてAPI Routesによって動的OGP生成の実現性が高そうという点で選びました。

### React

Reactを選んだのは好みです。あわよくばRecoilやReact-flowを試したかったのですが、特性上ステート管理やリッチな機能が要らなさそうなのでこのまま薄いアプリケーションで進めるかもしれない。

### react-icon

軽く調べた程度ですが、いろいろなアイコンを引っ張ってくることができ、デフォルトで分割インポートとReactコンポーネント対応がされており、非常に対応が簡単に導入できました。

Heroiconsを本サービスでは利用しています。

### CSS Modules

CSS in JSは使おうと思いましたが、本格的なアプリケーションになる前に入れると設計がむしろカオスになる予感があったので入れませんでした。

### Playwright

OGP画像自動生成のために利用しています。

開発していた時点では、playwright-coreの次期バージョンでないとVercel環境で動作しませんでした。

https://github.com/microsoft/playwright/issues/5862

対応に必要だったと思われるポイントは主に2点です。

- playwright、playwright-coreの次期バージョンを入れ、バージョンを揃えておくこと
- Vercel環境のNodeは12にしておくこと

これらを満たしているときのみ、OGP生成が動作しました。それ以外は色々なエラーログが表示され、すべてIssueを追いましたがバージョンアップ以外に解答がないようでした。

### react-lottie

ReactでLottie FilesからダウンロードしたJSONを使えるライブラリです。一瞬で可愛らしいアニメーションを利用できました。これは便利。

### react-markdown

Reactのマークダウンパーサーです。コンポーネントの変換にも対応しており、柔軟なカスタマイズが可能です。remarkなどを生で使うよりよほど良いです。

### Google Analytics

余計なDependencyを入れたくなかったので以下の記事の通り純粋にスクリプトを埋め込む方針でやりました。

https://panda-program.com/posts/nextjs-google-analytics