# BTC/USD Trading Signal Generator

BTCUSD の価格データをリアルタイムで取得し、テクニカル指標に基づいてトレードシグナルを生成する Web アプリケーション。

## 機能

- BTC/USD のリアルタイム価格取得（5 分間隔）
- テクニカル指標に基づくトレードシグナル生成（BUY/SELL/HOLD）
- 価格とシグナルの可視化

## 技術スタック

- React + TypeScript
- Material-UI
- Alpha Vantage API
- Axios

## システム構成

### 1. データ取得 (`src/api/forexApi.ts`)

- Alpha Vantage API を使用して BTC/USD のリアルタイム価格を取得
- 環境変数で管理された API キーを使用

### 2. データ管理 (`src/utils/dataStore.ts`)

- 最新 100 件の価格データを保持
- FIFO（First In First Out）方式でデータを管理

### 3. シグナル生成 (`src/utils/signalGenerator.ts`)

テクニカル指標の計算と判断：

- SMA（単純移動平均）
  - 短期：5 期間
  - 長期：20 期間
- RSI（相対力指数）：14 期間

トレードシグナルの判定条件：

- BUY: 短期 SMA > 長期 SMA かつ RSI < 65
- SELL: 短期 SMA < 長期 SMA かつ RSI > 35
- HOLD: 上記以外

### 4. UI (`src/App.tsx`, `src/components/ForexChart.tsx`)

- 現在の価格とトレードシグナルの表示
- チャートによる価格推移の可視化
- 5 分ごとの自動更新

## セットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/w712915/forex-trading-signal.git
cd forex-trading-signal
```

2. 依存パッケージのインストール

```bash
npm install
```

3. 環境変数の設定
   `.env`ファイルを作成し、Alpha Vantage API キーを設定

```bash
cp env.example .env
```

4. アプリケーションの起動

```bash
npm run dev
```

## 注意事項

- Alpha Vantage API の無料版を使用する場合、API コール制限があります
- このアプリケーションは教育目的で作成されており、実際の投資判断には使用しないでください
- テクニカル指標のパラメータは暗号資産市場の特性を考慮して調整されていますが、必要に応じて変更可能です

## ライセンス

MIT
