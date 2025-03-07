import createClient, { type ClientOptions } from "openapi-fetch";

import { API_DEFAULT_BASE_URL } from "../const";
import { type paths } from "./schema";

export type V1ApiClientOptions = ClientOptions & {
  baseUrl?: string;
  accessToken: string;
};

export function createV1ApiClient(options: V1ApiClientOptions) {
  const baseUrl = `${options?.baseUrl ?? API_DEFAULT_BASE_URL}/v1`;
  const client = createClient<paths>({
    baseUrl,
    headers: {
      Authorization: `Bearer ${options.accessToken}`,
    },
  });

  return client;
}
