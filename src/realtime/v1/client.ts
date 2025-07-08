import EventEmitter from "eventemitter3";
import {
  type CloseEvent,
  type ErrorEvent,
  type MessageEvent,
  WebSocket,
} from "ws";
import { z } from "zod";

import { type RealtimeV1CloseCode } from "./close-code";
import { REALTIME_V1_DEFAULT_URL } from "./const";
import { type RealtimeV1ClientMessage } from "./types/client";
import { type RealtimeV1ServerMessage } from "./types/server";
import { type RealtimeV1Topic } from "./types/topics";

const realtimeClientOptionsSchema = z.object({
  url: z.string().default(REALTIME_V1_DEFAULT_URL),
  accessToken: z.string(),
  reconnect: z.boolean().default(true),
  reconnectInterval: z.number().default(1000),
});
export type RealtimeV1ClientOptions = z.input<
  typeof realtimeClientOptionsSchema
>;
type ParsedRealtimeV1ClientOptions = z.output<
  typeof realtimeClientOptionsSchema
>;

export type RealtimeV1CloseEvent = CloseEvent & {
  code: (typeof RealtimeV1CloseCode)[keyof typeof RealtimeV1CloseCode];
};

export type RealtimeV1ClientEvents = {
  disconnect: (event?: RealtimeV1CloseEvent) => void;
  connect: () => void;
  error: (error: Error) => void;
  message: (message: RealtimeV1ServerMessage) => void;
};

export class RealtimeV1Client extends EventEmitter<RealtimeV1ClientEvents> {
  #options: ParsedRealtimeV1ClientOptions;
  #userDisconnected = false;
  #ws: WebSocket | null = null;

  constructor(options: RealtimeV1ClientOptions) {
    super();
    this.#options = realtimeClientOptionsSchema.parse(options ?? {});
  }

  connect = () => {
    if (this.#ws) {
      throw new Error("connect: websocket already intialized");
    }

    const url = new URL(this.#options.url);
    url.searchParams.set("access_token", this.#options.accessToken);

    this.#userDisconnected = false;
    this.#ws = new WebSocket(url);
    this.#ws.addEventListener("message", this.#handleMessage);
    this.#ws.addEventListener("error", this.#handleError);
    this.#ws.addEventListener("close", this.#handleClose);
    this.#ws.addEventListener("open", this.#handleOpen);
  };

  send = (message: RealtimeV1ClientMessage) => {
    if (!this.#ws) {
      throw new Error(
        "send: websocket not initialized, please connect before trying to send a message",
      );
    }

    this.#ws.send(JSON.stringify(message));
  };

  subscribe = (topics: RealtimeV1Topic[]) => {
    this.send({ type: "subscribe", topics });
  };

  unsubscribe = (topics: RealtimeV1Topic[]) => {
    this.send({ type: "unsubscribe", topics });
  };

  disconnect = () => {
    if (!this.#ws) {
      throw new Error(
        "disconnect: websocket not initialized, please connect before trying to disconnect",
      );
    }

    this.#userDisconnected = true;
    this.#removeListeners();
    this.#ws.close();
    this.#ws = null;
    this.emit("disconnect");
  };

  #reconnect = () => {
    if (!this.#userDisconnected) {
      this.connect();
    }
  };

  #removeListeners = () => {
    if (!this.#ws) {
      throw new Error("disconnect: websocket not initialized");
    }

    this.#ws.removeEventListener("message", this.#handleMessage);
    this.#ws.removeEventListener("error", this.#handleError);
    this.#ws.removeEventListener("close", this.#handleClose);
    this.#ws.removeEventListener("open", this.#handleOpen);
  };

  #handleOpen = () => {
    this.emit("connect");
  };

  #handleClose = (event: CloseEvent) => {
    this.#removeListeners();
    this.#ws = null;
    this.emit("disconnect", {
      ...event,
      code: event.code as RealtimeV1CloseEvent["code"],
    });

    if (this.#options.reconnect) {
      setTimeout(this.#reconnect, this.#options.reconnectInterval);
    }
  };

  #handleError = (event: ErrorEvent) => {
    this.emit("error", new Error(event.message, { cause: event }));
  };

  #handleMessage = (event: MessageEvent) => {
    if (typeof event.data !== "string") {
      this.emit("error", new Error("Invalid message format"));
      return;
    }

    let data;
    try {
      data = JSON.parse(event.data) as RealtimeV1ServerMessage;
    } catch (error) {
      this.emit("error", new Error("Invalid message format", { cause: error }));
      return;
    }

    this.emit("message", data);
  };
}

export function createRealtimeV1Client(options: RealtimeV1ClientOptions) {
  return new RealtimeV1Client(options);
}
