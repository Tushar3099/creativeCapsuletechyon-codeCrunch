const express=require('express');
const router=express.Router();
const axios=require('axios')

router.get("/country/name/:country_name",async(req,res)=>{
   axios({
    method: 'GET',
    url: `https://restcountries.eu/rest/v2/name/${req.params.country_name}?fullText=true`,
    headers: {
         "Content-Type":"application/json",
     }
  })
.then(function (response) {
    if(!response.data)
    {
        return  res.status(404).json({error:"Record not found"})
    }
//   console.log(JSON.stringify(response.data));
else{
    return res.json({name:response.data[0].name,
        alpha2Code:response.data[0].alpha2Code,
        alpha3Code:response.data[0].alpha3Code,
        capital:response.data[0].capital,
        region:response.data[0].region,
        population:response.data[0].population,
        flag:response.data[0].flag,
        totalLanguages:response.data[0].languages,
        totalCurrencies:response.data[0].currencies
      })
}
 
})
.catch(function (error) {
//    console.log(error);
   if(error.response.status==404)
   return  res.status(404).json({error:"Record not found"})
   else
    return res.status(400).json({error:"Bad request"})
});
    
})

router.get("/country/code/:country_code",async(req,res)=>{
    axios({
     method: 'GET',
     url: `https://restcountries.eu/rest/v2/alpha/${req.params.country_code}`,
     headers: {
          "Content-Type":"application/json",
      }
   })
 .then(function (response) {
     if(!response.data)
     {
         return  res.status(404).json({error:"Record not found"})
     }
   
 else{
    console.log(JSON.stringify(response.data));
     return res.json({name:response.data.name,
         alpha2Code:response.data.alpha2Code,
         alpha3Code:response.data.alpha3Code,
         capital:response.data.capital,
         region:response.data.region,
         population:response.data.population,
         flag:response.data.flag,
         totalLanguages:response.data.languages,
         totalCurrencies:response.data.currencies,
         totalTimezones:response.data.timezones
       })
 }
  
 })
 .catch(function (error) {
    console.log(error);
    if(error.response.status==404)
    return  res.status(404).json({error:"Record not found"})
    else
     return res.status(400).json({error:"Bad request"})
 });
     
 })
 

module.exports=router;