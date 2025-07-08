export type RealtimeV2RecentPoolsTopic = "pools.recent";

export type RealtimeV2PoolTopic = `pool.${string}`;

export type RealtimeV2AssetPriceTopic = `price.${string}`;

export type RealtimeV2AssetTransactionsTopic = `txns.${string}`;

export type RealtimeV2Topic =
  | RealtimeV2RecentPoolsTopic
  | RealtimeV2PoolTopic
  | RealtimeV2AssetPriceTopic
  | RealtimeV2AssetTransactionsTopic;
