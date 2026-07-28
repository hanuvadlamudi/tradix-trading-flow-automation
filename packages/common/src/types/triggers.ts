export type TimerNodeMetaData = {
  time: number;
};

export type PriceTriggerNodeMetaData = {
  asset: string;
  price: number;
};

export type TriggerMetaData = TimerNodeMetaData | PriceTriggerNodeMetaData;
