import createClient, { type ClientOptions } from "openapi-fetch";

import { API_DEFAULT_BASE_URL } from "./const";
import { type paths } from "./schema";

export type ApiClientOptions = ClientOptions & {
  baseUrl?: string;
  apiKey: string;
};

export function createApiClient(options: ApiClientOptions) {
  const client = createClient<paths>({
    baseUrl: options?.baseUrl ?? API_DEFAULT_BASE_URL,
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
    },
  });

  return client;
}
