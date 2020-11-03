const express = require("express");
const router = express.Router();
const axios = require("axios");
const https = require("https");
//Country by name.............................................................................................................

router.get("/covid/country/name/:country_name", async (req, res) => {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios({
    method: "GET",
    url: `https://covid19-api.com/country?name=${req.params.country_name}&format=json`,
    httpsAgent: agent,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (!response.data) {
        return res.status(404).json({ error: "Record not found" });
      } else {
        // console.log(JSON.stringify(response.data));
        return res.json({
          country: response.data[0].country,
          confirmed: response.data[0].confirmed,
          recovered: response.data[0].recovered,
          capital: response.data[0].capital,
          critical: response.data[0].critical,
          deaths: response.data[0].deaths,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      // if(error.response.status==404)
      // return  res.status(404).json({error:"Record not found"})
      // else
      //  return res.status(400).json({error:"Bad request"})
    });
});

router.get("/covid/country/code/:country_code", async (req, res) => {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios({
    method: "GET",
    url: `https://covid19-api.com/country/code?code=${req.params.country_code}&format=json`,
    httpsAgent: agent,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (!response.data) {
        return res.status(404).json({ error: "Record not found" });
      } else {
        // console.log(JSON.stringify(response.data));
        return res.json({
          country: response.data[0].country,
          confirmed: response.data[0].confirmed,
          recovered: response.data[0].recovered,
          capital: response.data[0].capital,
          critical: response.data[0].critical,
          deaths: response.data[0].deaths,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      // if(error.response.status==404)
      // return  res.status(404).json({error:"Record not found"})
      // else
      //  return res.status(400).json({error:"Bad request"})
    });
});

router.get("/covid/country/search", async (req, res) => {
  let search = req.query.searchText;
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await axios({
      method: "GET",
      url: `https://covid19-api.com/country?name=${search}&format=json`,
      httpsAgent: agent,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data) {
      // console.log(JSON.stringify(response.data));
      return res.json({
        country: response.data[0].country,
        confirmed: response.data[0].confirmed,
        recovered: response.data[0].recovered,
        capital: response.data[0].capital,
        critical: response.data[0].critical,
        deaths: response.data[0].deaths,
      });
    }
  } catch (err) {
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const response2 = await axios({
        method: "GET",
        url: `https://covid19-api.com/country/code?code=${search}&format=json`,
        httpsAgent: agent,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response2.data) {
        return res.json({
          country: response2.data[0].country,
          confirmed: response2.data[0].confirmed,
          recovered: response2.data[0].recovered,
          capital: response2.data[0].capital,
          critical: response2.data[0].critical,
          deaths: response2.data[0].deaths,
        });
      }
    } catch (error) {
      console.log(error);
      // if(error.response.status==404)
      // return  res.status(404).json({error:"Record not found"})
      // else
      //  return res.status(400).json({error:"Bad request"})
    }
  }
});

module.exports = router;
