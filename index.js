const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const country = require("./routes/country/api");
const weather = require("./routes/weather/api");
const twitter = require("./routes/twitter/api");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(country);
app.use("/weather", weather);
app.use("/twitter", twitter);

app.listen(PORT, () => {
  console.log("Server is listening!! " + PORT);
});
