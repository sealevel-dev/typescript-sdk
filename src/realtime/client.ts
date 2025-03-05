import EventEmitter from "eventemitter3";
import { type CloseEvent, type ErrorEvent } from "undici-types";
import { z } from "zod";

import { type RealtimeCloseCode } from "./close-code";
import { REALTIME_DEFAULT_URL } from "./const";
import { type RealtimeClientMessage } from "./types/client";
import { type RealtimeServerMessage } from "./types/server";
import { type RealtimeTopic } from "./types/topics";

const realtimeClientOptionsSchema = z.object({
  apiKey: z.string(),
  url: z.string().default(REALTIME_DEFAULT_URL),
  reconnect: z.boolean().default(true),
  reconnectInterval: z.number().default(1000),
});
export type RealtimeClientOptions = z.input<typeof realtimeClientOptionsSchema>;
type ParsedRealtimeClientOptions = z.output<typeof realtimeClientOptionsSchema>;

export type RealtimeCloseEvent = CloseEvent & {
  code: (typeof RealtimeCloseCode)[keyof typeof RealtimeCloseCode];
};

export type RealtimeClientEvents = {
  disconnect: (event?: RealtimeCloseEvent) => void;
  connect: () => void;
  error: (error: Error) => void;
  message: (message: RealtimeServerMessage) => void;
};

export class RealtimeClient extends EventEmitter<RealtimeClientEvents> {
  #options: ParsedRealtimeClientOptions;
  #userDisconnected = false;
  #ws: WebSocket | null = null;

  constructor(options: RealtimeClientOptions) {
    super();
    this.#options = realtimeClientOptionsSchema.parse(options ?? {});
  }

  connect = () => {
    if (this.#ws) {
      throw new Error("connect: websocket already intialized");
    }

    const url = new URL(this.#options.url);
    url.searchParams.set("api_key", this.#options.apiKey);

    this.#userDisconnected = false;
    this.#ws = new WebSocket(url);
    this.#ws.addEventListener("message", this.#handleMessage);
    this.#ws.addEventListener("error", this.#handleError);
    this.#ws.addEventListener("close", this.#handleClose);
    this.#ws.addEventListener("open", this.#handleOpen);
  };

  send = (message: RealtimeClientMessage) => {
    if (!this.#ws) {
      throw new Error(
        "send: websocket not initialized, please connect before trying to send a message",
      );
    }

    this.#ws.send(JSON.stringify(message));
  };

  subscribe = (topics: RealtimeTopic[]) => {
    this.send({ type: "subscribe", topics });
  };

  unsubscribe = (topics: RealtimeTopic[]) => {
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
      code: event.code as RealtimeCloseEvent["code"],
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
      data = JSON.parse(event.data) as RealtimeServerMessage;
    } catch (error) {
      this.emit("error", new Error("Invalid message format", { cause: error }));
      return;
    }

    this.emit("message", data);
  };
}

export function createRealtimeClient(options: RealtimeClientOptions) {
  return new RealtimeClient(options);
}
