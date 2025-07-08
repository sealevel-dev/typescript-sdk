import { type RealtimeV1Topic } from "./topics";

export type RealtimeV1SubscribeMessage = {
  type: "subscribe";
  topics: RealtimeV1Topic[];
};

export type RealtimeV1UnsubscribeMessage = {
  type: "unsubscribe";
  topics: RealtimeV1Topic[];
};

export type RealtimeV1ClientMessage =
  | RealtimeV1SubscribeMessage
  | RealtimeV1UnsubscribeMessage;
