import { type RealtimeTopic } from "./topics";

export type SubscribeRealtimeClientMessage = {
  type: "subscribe";
  topics: RealtimeTopic[];
};

export type UnsubscribeRealtimeClientMessage = {
  type: "unsubscribe";
  topics: RealtimeTopic[];
};

export type RealtimeClientMessage =
  | SubscribeRealtimeClientMessage
  | UnsubscribeRealtimeClientMessage;
