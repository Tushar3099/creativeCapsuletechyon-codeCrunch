const express =require('express');
const app=express();
const bodyParser=require('body-parser');

const country=require('./routes/country/api')
const covid19=require('./routes/covid19/api')

const PORT=process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());

app.use(country)
app.use(covid19)

app.listen(PORT,()=>{
    console.log("Server is listening!! "+PORT)
})
