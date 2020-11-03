const keys = require("../config/keys");
const baseUrl = keys.WEATHER_BASE_URL;
const apiKey = keys.WEATHER_API_KEY;
const queryString = require("query-string");
const axios = require("axios");
class weatherService {
  async city(newQuery) {
    try {
      const query = queryString.stringify({ ...newQuery, appid: apiKey });
      const res = await axios.get(`${baseUrl}?${query}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports.weatherService = new weatherService();
