const express =require('express');
const app=express();
const bodyParser=require('body-parser');

// const demo=require('./routes/demo')


const PORT=process.env.PORT || 8000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());

// app.use(demo)


app.listen(PORT,()=>{
    console.log("Server is listening!! "+PORT)
})
