export const SUPPORTED_ASSETS = [
  { id: "BTC", title: "Bitcoin (BTC)" },
  { id: "ETH", title: "Ethereum (ETH)" },
  { id: "SOL", title: "Solana (SOL)" },
] as const;

export type SupportedAssetId = (typeof SUPPORTED_ASSETS)[number]["id"];
