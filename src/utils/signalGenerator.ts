import { ForexData, TradingSignal } from "../types/forex";
import ForexDataStore from "./dataStore";

const calculateSMA = (data: number[], period: number): number => {
  if (data.length < period) return 0;
  const sum = data.slice(-period).reduce((a, b) => a + b, 0);
  return sum / period;
};

const calculateRSI = (data: number[], period: number = 14): number => {
  if (data.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = data.length - period; i < data.length; i++) {
    const difference = data[i] - data[i - 1];
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }

  const rs = gains / losses;
  return 100 - 100 / (1 + rs);
};

export const generateSignals = (data: ForexData): TradingSignal => {
  ForexDataStore.addData({
    timestamp: data.timestamp,
    rate: data.rate,
  });

  const rates = ForexDataStore.getRates();

  // テクニカル指標の計算
  const shortSMA = calculateSMA(rates, 5); // 5期間SMA
  const longSMA = calculateSMA(rates, 20); // 20期間SMA
  const rsi = calculateRSI(rates); // 14期間RSI

  // 暗号資産向けにシグナル判定ロジックを調整
  let signal: "BUY" | "SELL" | "HOLD" = "HOLD";

  if (shortSMA > longSMA && rsi < 65) {
    // RSIのしきい値を調整
    signal = "BUY";
  } else if (shortSMA < longSMA && rsi > 35) {
    // RSIのしきい値を調整
    signal = "SELL";
  }

  return {
    timestamp: data.timestamp,
    signal,
    price: data.rate,
  };
};
