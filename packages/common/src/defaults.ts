import type { TradingMetaData } from "./types/actions.js";

export const DEFAULT_TRADE_META: TradingMetaData = {
  type: "Long",
  qty: 1,
  symbol: "BTC",
};

export const DEFAULT_TIMER_META = {
  time: 3600,
} as const;

export const DEFAULT_PRICE_TRIGGER_META = {
  asset: "BTC",
  price: 0,
} as const;
