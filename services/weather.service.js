const keys = require("../config/keys");
const baseUrl = keys.WEATHER_BASE_URL;
const apiKey = keys.WEATHER_API_KEY;
const queryString = require("query-string");
const axios = require("axios");
class weatherService {
  async city(newQuery) {
    try {
      //   console.log(cityName);
      //   console.log(apiKey);
      const query = queryString.stringify({ ...newQuery, appid: apiKey });
      //   console.log(`${baseUrl}?${query}`);
      const res = await axios.get(`${baseUrl}?${query}`);
      //   console.log(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  //   async search(newQuery) {
  //     try {
  //     //   console.log(cityName);
  //       //   console.log(apiKey);
  //       const query = queryString.stringify({...newQuery,appid: apiKey,});
  //     //   console.log(`${baseUrl}?${query}`);
  //       const res = await axios.get(`${baseUrl}?${query}`);
  //       console.log(res.data);
  //       return res.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
}

module.exports.weatherService = new weatherService();
