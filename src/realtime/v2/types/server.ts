import { type RealtimeV2Event } from "./events";

export type RealtimeV2EventsMessage = {
  type: "events";
  events: RealtimeV2Event[];
};

export type RealtimeV2ServerMessage = RealtimeV2EventsMessage;
