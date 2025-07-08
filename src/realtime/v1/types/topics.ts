export type RealtimeV1RecentPoolsTopic = "pools.recent";

export type RealtimeV1TopTradedPoolsTopic = "pools.top-traded";

export type RealtimeV1PoolTopic = `pool.${string}`;

export type RealtimeV1AssetPriceTopic = `price.${string}`;

export type RealtimeV1Topic =
  | RealtimeV1RecentPoolsTopic
  | RealtimeV1TopTradedPoolsTopic
  | RealtimeV1PoolTopic
  | RealtimeV1AssetPriceTopic;
