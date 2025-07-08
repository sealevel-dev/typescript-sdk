import { type V1Pool, type V1TopTradedPoolsInterval } from "~/api/v1/types";

export type RealtimeV1PoolCreatedEvent = {
  type: "pool-created";
  pool: V1Pool;
};

export type RealtimeV1PoolUpdatedEvent = {
  type: "pool-updated";
  pool: V1Pool;
};

export type RealtimeV1PoolGraduatedEvent = {
  type: "pool-graduated";
  pool: V1Pool;
};

export type RealtimeV1TopTradedPoolsEvent = {
  type: "top-traded-pools";
  interval: V1TopTradedPoolsInterval;
  pools: V1Pool[];
};

export type RealtimeV1AssetPriceEvent = {
  type: "price";
  asset_id: string;
  block_id: number;
  price_usd: number;
};

export type RealtimeV1Event =
  | RealtimeV1PoolCreatedEvent
  | RealtimeV1PoolUpdatedEvent
  | RealtimeV1PoolGraduatedEvent
  | RealtimeV1TopTradedPoolsEvent
  | RealtimeV1AssetPriceEvent;
