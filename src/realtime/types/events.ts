import { type Pool, type TopTradedPoolsInterval } from "~/api/types";

export type PoolCreatedRealtimeEvent = {
  type: "pool-created";
  pool: Pool;
};

export type PoolUpdatedRealtimeEvent = {
  type: "pool-updated";
  pool: Pool;
};

export type PoolGraduatedRealtimeEvent = {
  type: "pool-graduated";
  pool: Pool;
};

export type TopTradedPoolsRealtimeEvent = {
  type: "top-traded-pools";
  interval: TopTradedPoolsInterval;
  pools: Pool[];
};

export type RealtimeEvent =
  | PoolCreatedRealtimeEvent
  | PoolUpdatedRealtimeEvent
  | PoolGraduatedRealtimeEvent
  | TopTradedPoolsRealtimeEvent;
