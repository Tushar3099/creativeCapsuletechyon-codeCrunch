const express = require("express");
const router = express().Router();
const weatherService = require("../../services/weather.service");

router.get("/city/:city_name", async (req, res) => {
  const data = await weatherService.city(req.params.city_name);
  res.send(data);
});
