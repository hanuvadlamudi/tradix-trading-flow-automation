import type { TriggerKind } from "../types/nodes.js";

export type CatalogItem<T extends string = string> = {
  id: T;
  title: string;
  description: string;
};

export const SUPPORTED_TRIGGERS: CatalogItem<TriggerKind>[] = [
  {
    id: "timer-trigger",
    title: "Schedule timer",
    description: "Fire on a fixed interval",
  },
  {
    id: "price-trigger",
    title: "Price threshold",
    description: "Fire when market price crosses a level",
  },
];
