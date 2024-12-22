export interface ForexData {
  timestamp: string;
  rate: number;
}

export interface TradingSignal {
  timestamp: string;
  signal: "BUY" | "SELL" | "HOLD";
  price: number;
}
