import { StackContext, Api, use } from "sst/constructs";
import { Table } from "sst/constructs";

export function StorageStack({ stack, app }: any) {
  // Create the DynamoDB table
  const table = new Table(stack, "itune_search_data", {
    fields: {
      id: "string",
      userId: "string",
      searchTerm: "string",
      searchResults: "string",
    },
    primaryIndex: { partitionKey: "id", sortKey: "searchTerm" },
  });

  return {
    table,
  };
}
