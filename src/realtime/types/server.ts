import { type RealtimeEvent } from "./events";

export type EventsRealtimeServerMessage = {
  type: "events";
  events: RealtimeEvent[];
};

export type RealtimeServerMessage = EventsRealtimeServerMessage;
