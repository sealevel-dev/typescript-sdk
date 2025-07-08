import EventEmitter from "eventemitter3";
import {
  type CloseEvent,
  type ErrorEvent,
  type MessageEvent,
  WebSocket,
} from "ws";
import { z } from "zod";

import { type RealtimeV2CloseCode } from "./close-code";
import { REALTIME_V2_DEFAULT_URL } from "./const";
import { type RealtimeV2ClientMessage } from "./types/client";
import { type RealtimeV2ServerMessage } from "./types/server";
import { type RealtimeV2Topic } from "./types/topics";

const realtimeClientOptionsSchema = z.object({
  url: z.string().default(REALTIME_V2_DEFAULT_URL),
  accessToken: z.string(),
  reconnect: z.boolean().default(true),
  reconnectInterval: z.number().default(1000),
});
export type RealtimeV2ClientOptions = z.input<
  typeof realtimeClientOptionsSchema
>;
type ParsedRealtimeV2ClientOptions = z.output<
  typeof realtimeClientOptionsSchema
>;

export type RealtimeV2CloseEvent = CloseEvent & {
  code: (typeof RealtimeV2CloseCode)[keyof typeof RealtimeV2CloseCode];
};

export type RealtimeV2ClientEvents = {
  disconnect: (event?: RealtimeV2CloseEvent) => void;
  connect: () => void;
  error: (error: Error) => void;
  message: (message: RealtimeV2ServerMessage) => void;
};

export class RealtimeV2Client extends EventEmitter<RealtimeV2ClientEvents> {
  #options: ParsedRealtimeV2ClientOptions;
  #userDisconnected = false;
  #ws: WebSocket | null = null;

  constructor(options: RealtimeV2ClientOptions) {
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

  send = (message: RealtimeV2ClientMessage) => {
    if (!this.#ws) {
      throw new Error(
        "send: websocket not initialized, please connect before trying to send a message",
      );
    }

    this.#ws.send(JSON.stringify(message));
  };

  subscribe = (topics: RealtimeV2Topic[]) => {
    this.send({ type: "subscribe", topics });
  };

  unsubscribe = (topics: RealtimeV2Topic[]) => {
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
      code: event.code as RealtimeV2CloseEvent["code"],
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
      data = JSON.parse(event.data) as RealtimeV2ServerMessage;
    } catch (error) {
      this.emit("error", new Error("Invalid message format", { cause: error }));
      return;
    }

    this.emit("message", data);
  };
}

export function createRealtimeV2Client(options: RealtimeV2ClientOptions) {
  return new RealtimeV2Client(options);
}
