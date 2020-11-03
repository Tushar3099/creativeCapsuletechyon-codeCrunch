const keys = require("../config/keys");
const token = keys.TWITTER_BEARER_TOKEN;
const baseUrl1 = `https://api.twitter.com/1.1/statuses/user_timeline.json`;
const baseUrl2 = `https://api.twitter.com/1.1/search/tweets.json`;
const queryString = require("query-string");
const axios = require("axios");
class twitterService {
  async tweetUsername(newQuery) {
    try {
      const query = queryString.stringify({ ...newQuery, count: 10 });
      //   console.log(`${baseUrl}?${query}`);
      const res = await axios.get(`${baseUrl1}?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async tweetHashTag(newQuery) {
    try {
      const query = queryString.stringify({ ...newQuery, count: 10 });
      //   console.log(`${baseUrl2}?${query}`);
      const res = await axios.get(`${baseUrl2}?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.statuses;
    } catch (error) {
      throw error;
    }
  }
}

module.exports.twitterService = new twitterService();
