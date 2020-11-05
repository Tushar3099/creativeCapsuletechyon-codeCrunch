const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const country=require('./routes/country/api')
const covid19=require('./routes/covid19/api')
const weather = require("./routes/weather/api");
const twitter = require("./routes/twitter/api");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(country)
app.use(covid19)
app.use("/weather", weather);
app.use("/twitter", twitter);

app.get('/',(req,res)=>{
    res.send("Hello!! Team 'Shweta' and 'Tushar' here. ")
})

app.get('*',(req,res)=>{
  res.status(400).json({status:400,message:"Bad request"})
})

app.listen(PORT, () => {
  console.log("Server is listening!! " + PORT);
});
