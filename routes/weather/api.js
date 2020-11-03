const express = require("express");
const router = express.Router();
const { weatherService } = require("../../services/weather.service");

router.get("/city/:city_name", async (req, res) => {
  try {
    const data = await weatherService.city({ q: req.params.city_name });
    res.send({
      country: data.sys.country,
      name: data.name,
      temp: data.main.temp,
      min_temp: data.main.temp_min,
      max_temp: data.main.temp_max,
      latitude: data.coord.lon,
      longitude: data.coord.lat,
    });
  } catch (error) {
    res.send({
      status: error.status || 404,
      message: error.message || "Weather data not found",
    });
  }
});
router.get("/search", async (req, res) => {
  try {
    const { latitude, longitude, pin_code } = req.query;
    if (latitude && longitude) {
      const data = await weatherService.city({
        lat: latitude,
        lon: longitude,
      });
      res.send({
        country: data.sys.country,
        name: data.name,
        temp: data.main.temp,
        min_temp: data.main.temp_min,
        max_temp: data.main.temp_max,
        latitude: data.coord.lon,
        longitude: data.coord.lat,
      });
    } else if (pin_code) {
      const data = await weatherService.city({
        zip: `${pin_code},in`,
      });
      res.send({
        country: data.sys.country,
        name: data.name,
        temp: data.main.temp,
        min_temp: data.main.temp_min,
        max_temp: data.main.temp_max,
        latitude: data.coord.lon,
        longitude: data.coord.lat,
      });
    } else {
      throw { status: 400, message: "Bad Request" };
    }
  } catch (error) {
    res.send({
      status: error.status || 404,
      message: error.message || "Weather data not found",
    });
  }
});

module.exports = router;
