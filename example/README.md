# Suhjong-wasm Example

実際のウェブサイト：[Suhjong Highest Scores](https://gw31415.github.io/suhjong-wasm/)

入力された手札からハイスコアを計算するウェブサイトとなっています。

## ディレクトリ構成

```
.
├── README.md
├── assets
│   ├── script.js
│   └── style.scss
├── config.toml
├── layouts
│   └── index.html
└── static
    └── pkg/
```

| ファイル              | 内容                                                           |
| --------------------- | -------------------------------------------------------------- |
| `assets/script.js`    | スクリプトの本体。`static/pkg` を読みこんでいる。              |
| `assets/style.scss`   | スタイルファイル。                                             |
| `layouts/index.html`  | 生成されるHTMLファイルの雛形。ここに全ての内容が埋めこまれる。 |
| `static/pkg/`         | Suhjong-wasmをビルドして作られるパッケージ。                   |
