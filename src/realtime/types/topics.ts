export type RecentPoolsRealtimeTopic = "pools.recent";

export type TopTradedPoolsRealtimeTopic = "pools.top-traded";

export type PoolRealtimeTopic = `pool.${string}`;

export type AssetPriceRealtimeTopic = `price.${string}`;

export type RealtimeTopic =
  | RecentPoolsRealtimeTopic
  | TopTradedPoolsRealtimeTopic
  | PoolRealtimeTopic
  | AssetPriceRealtimeTopic;
