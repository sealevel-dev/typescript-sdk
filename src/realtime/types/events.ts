import { type V1Pool, type V1TopTradedPoolsInterval } from "~/api/v1/types";

export type PoolCreatedRealtimeEvent = {
  type: "pool-created";
  pool: V1Pool;
};

export type PoolUpdatedRealtimeEvent = {
  type: "pool-updated";
  pool: V1Pool;
};

export type PoolGraduatedRealtimeEvent = {
  type: "pool-graduated";
  pool: V1Pool;
};

export type TopTradedPoolsRealtimeEvent = {
  type: "top-traded-pools";
  interval: V1TopTradedPoolsInterval;
  pools: V1Pool[];
};

export type AssetPriceRealtimeEvent = {
  type: "price";
  asset_id: string;
  block_id: number;
  price_usd: number;
};

export type RealtimeEvent =
  | PoolCreatedRealtimeEvent
  | PoolUpdatedRealtimeEvent
  | PoolGraduatedRealtimeEvent
  | TopTradedPoolsRealtimeEvent
  | AssetPriceRealtimeEvent;
