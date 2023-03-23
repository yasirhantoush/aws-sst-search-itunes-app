import { SSTConfig } from "sst";
import { API } from "./stacks/ApiStack";
import { StorageStack } from "./stacks/StorageStack";

export default {
  config(_input) {
    return {
      name: "thamniah-itune-search-task",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(API);
  }
} satisfies SSTConfig;
