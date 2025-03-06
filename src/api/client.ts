import createClient, { type ClientOptions } from "openapi-fetch";

import { API_DEFAULT_BASE_URL, API_VERSION_PATH } from "./const";
import { type paths } from "./schema";

export type ApiClientOptions = ClientOptions & {
  baseUrl?: string;
  apiKey: string;
};

export function createApiClient(options: ApiClientOptions) {
  const baseUrl = `${options?.baseUrl ?? API_DEFAULT_BASE_URL}/${API_VERSION_PATH}`;
  const client = createClient<paths>({
    baseUrl,
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
    },
  });

  return client;
}
