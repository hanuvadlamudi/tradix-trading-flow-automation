export type TradeSide = "Long" | "Short";

export type TradingMetaData = {
  type: TradeSide;
  qty: number;
  symbol: string;
};

export type ActionMetaData = TradingMetaData;
