import { type RealtimeV1Event } from "./events";

export type RealtimeV1EventsMessage = {
  type: "events";
  events: RealtimeV1Event[];
};

export type RealtimeV1ServerMessage = RealtimeV1EventsMessage;
