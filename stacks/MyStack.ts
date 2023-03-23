import { StackContext, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.hellowWorldHandler",
      "GET /search": "packages/functions/src/lambda.searchItunesPodcastsHandler",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
