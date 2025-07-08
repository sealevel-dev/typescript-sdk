import { type RealtimeV2Topic } from "./topics";

export type RealtimeV2SubscribeMessage = {
  type: "subscribe";
  topics: RealtimeV2Topic[];
};

export type RealtimeV2UnsubscribeMessage = {
  type: "unsubscribe";
  topics: RealtimeV2Topic[];
};

export type RealtimeV2ClientMessage =
  | RealtimeV2SubscribeMessage
  | RealtimeV2UnsubscribeMessage;
