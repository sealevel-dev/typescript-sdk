import createClient, {
  type ClientOptions,
  type Middleware,
} from "openapi-fetch";

import { type paths } from "./schema";

export type ApiClientOptions = ClientOptions & {
  baseUrl?: string;
  apiKey: string;
};

export function createApiClient(options: ApiClientOptions) {
  const middleware: Middleware = {
    async onRequest({ request }) {
      request.headers.set("Authorization", `Bearer ${options.apiKey}`);
      return request;
    },
  };
  const client = createClient<paths>({
    baseUrl: options?.baseUrl,
  });
  client.use(middleware);

  return client;
}
