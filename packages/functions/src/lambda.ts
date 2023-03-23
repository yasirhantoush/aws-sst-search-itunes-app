import { ApiHandler } from "sst/node/api";
import { Time } from "@thamniah-task1-sst-app/core/time";
import axios from 'axios';

export const hellowWorldHandler = ApiHandler(async (_evt) => {
  return {
    body: `Hello world. The time is ${Time.now()}`,
  };
});

export const searchItunesPodcastsHandler = ApiHandler(async (_evt) => {
  console.log(_evt.queryStringParameters);
  const term = _evt.queryStringParameters?.term || '';
  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${term}`);
    return { body: response.data };
  } catch (err) {
    throw new Error('Error occured during fetch itunes api');
  }
});

