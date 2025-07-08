import {
  type V2AssetPrice,
  type V2Pool,
  type V2Transaction,
} from "~/api/v2/types";

export type RealtimeV2PoolCreatedEvent = {
  type: "pool_created";
  data: V2Pool;
};

export type RealtimeV2PoolUpdatedEvent = {
  type: "pool_updated";
  data: V2Pool;
};

export type RealtimeV2TransactionEvent = {
  type: "transaction";
  data: V2Transaction;
};

export type RealtimeV2AssetPriceEvent = {
  type: "asset_price";
  data: V2AssetPrice;
};

export type RealtimeV2Event =
  | RealtimeV2PoolCreatedEvent
  | RealtimeV2PoolUpdatedEvent
  | RealtimeV2TransactionEvent
  | RealtimeV2AssetPriceEvent;
