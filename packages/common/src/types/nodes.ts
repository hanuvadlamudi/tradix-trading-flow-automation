import type { TradingMetaData } from "./actions.js";
import type { PriceTriggerNodeMetaData, TimerNodeMetaData } from "./triggers.js";

export type TriggerKind = "price-trigger" | "timer-trigger";
export type ActionKind = "hyper-liquid" | "backpack" | "lighter";
export type NodeKind = TriggerKind | ActionKind;

export type NodeRole = "action" | "trigger";

export type NodeMetaData =
  | TradingMetaData
  | PriceTriggerNodeMetaData
  | TimerNodeMetaData;

export type WorkflowNodeData = {
  type: NodeKind;
  kind: NodeRole;
  metaData: NodeMetaData;
  label: string;
};

export type WorkflowNode = {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: WorkflowNodeData;
};

export type WorkflowEdge = {
  id: string;
  source: string;
  target: string;
};
