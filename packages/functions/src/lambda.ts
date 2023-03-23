import { ApiHandler } from "sst/node/api";
import { Time } from "@thamniah-task1-sst-app/core/time";
import axios from 'axios';
import * as uuid from "uuid";
import AWS from "aws-sdk";
import { Table } from "sst/node/table";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const hellowWorldHandler = ApiHandler(async (_evt) => {
  return {
    body: `Hello world. The time is ${Time.now()}`,
  };
});

export const searchItunesPodcastsHandler = ApiHandler(async (_evt) => {
  // call itunes api
  const term = _evt.queryStringParameters?.term || '';
  let searchResults;
  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${term}`);
    searchResults = response.data;
  } catch (e: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e?.message }),
    };
  }

  // insert record in table
  const params = {
    TableName: Table.itune_search_data.tableName,
    Item: {
      // The attributes of the item to be created
      id: uuid.v1(), // A unique uuid
      userId: "123", // The id of the author
      searchTerm: term,
      searchResults: searchResults,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  try {
    await dynamoDb.put(params).promise();
  } catch (e: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }

  return { body: searchResults };

});

