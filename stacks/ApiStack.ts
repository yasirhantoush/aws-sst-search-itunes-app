import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function API({ stack }: StackContext) {
  const { table } = use(StorageStack);
  
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.hellowWorldHandler",
      "GET /search": "packages/functions/src/lambda.searchItunesPodcastsHandler",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { 
    api,
  }
}
