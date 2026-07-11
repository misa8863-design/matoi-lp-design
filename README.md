# LP制作ポートフォリオ

HTML / CSS / JavaScriptだけで動く、さくらのレンタルサーバ向け静的サイトです。

## 公開方法

`lp-portfolio-sakura-ready` フォルダの中身を、さくらサーバーの公開フォルダへアップロードしてください。
一般的にはファイルマネージャーまたはFTPで `www` フォルダへ配置します。

## 最初に変更する場所

1. `index.html` の `matoi` を屋号に変更
2. `index.html` 内で `CTA差し替え` を検索し、Instagram・公式LINEのURLを変更
3. 料金、文章、著作権表記を実際の内容に変更

## 制作実績を追加する方法

1. 実績画像を `assets/images` に入れます（例：`work-new.jpg`）
2. `works.json` をテキストエディタで開きます
3. 最後の実績の `}` の後ろにカンマを追加し、次の形をコピーします

```json
{
  "title": "実績名",
  "category": "SALON / LANDING PAGE",
  "description": "制作内容を短く記載",
  "image": "assets/images/work-new.jpg",
  "alt": "画像の内容を説明"
}
```

JSONでは最後の項目の後ろにカンマを付けないでください。

## 画像について

- ヒーロー画像：`assets/images/hero-workspace.png`
- 実績画像：`assets/images/work-*.svg`
- 同じファイル名で上書きすればHTMLの修正は不要です
- 実績画像は横4:3（例：1200 × 900px）がおすすめです

## ローカル確認

`works.json` の読み込み確認には、簡易Webサーバーを使います。

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000/lp-portfolio-sakura-ready/` を開いてください。
