import type { ActionKind } from "../types/nodes.js";
import type { TradeSide } from "../types/actions.js";
import type { CatalogItem } from "./triggers.js";

export const SUPPORTED_ACTIONS: CatalogItem<ActionKind>[] = [
  {
    id: "hyper-liquid",
    title: "Hyperliquid",
    description: "Place a trade on Hyperliquid",
  },
  {
    id: "lighter",
    title: "Lighter",
    description: "Place a trade on Lighter",
  },
  {
    id: "backpack",
    title: "Backpack",
    description: "Place a trade on Backpack",
  },
];

export const TRADE_SIDES: { id: TradeSide; title: string }[] = [
  { id: "Long", title: "Long" },
  { id: "Short", title: "Short" },
];
