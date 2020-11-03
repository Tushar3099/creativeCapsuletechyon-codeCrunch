const keys = require("../config/keys");
const token = keys.TWITTER_BEARER_TOKEN;
const baseUrl = `https://api.twitter.com/1.1/statuses/user_timeline.json`;
const queryString = require("query-string");
const axios = require("axios");
class twitterService {
  async tweet(newQuery) {
    try {
      const query = queryString.stringify({ ...newQuery, count: 10 });
      //   console.log(`${baseUrl}?${query}`);
      const res = await axios.get(`${baseUrl}?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports.twitterService = new twitterService();
