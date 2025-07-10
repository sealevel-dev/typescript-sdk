export type RealtimeV2RecentPoolsTopic = "pools.recent";

export type RealtimeV2PoolTopic = `pools.${string}`;

export type RealtimeV2AssetPriceTopic = `assets.${string}.price`;

export type RealtimeV2AssetTransactionsTopic = `assets.${string}.transactions`;

export type RealtimeV2Topic =
  | RealtimeV2RecentPoolsTopic
  | RealtimeV2PoolTopic
  | RealtimeV2AssetPriceTopic
  | RealtimeV2AssetTransactionsTopic;
