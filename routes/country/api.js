const express=require('express');
const router=express.Router();
const axios=require('axios')

//Country by name.............................................................................................................

router.get("/country/name/:country_name",async(req,res)=>{
   axios({
    method: 'GET',
    url: `https://restcountries.eu/rest/v2/name/${req.params.country_name}?fullText=true`,
    headers: {
         "Content-Type":"application/json",
     }
  })
.then(function (response) {
    if(!response.data[0])
    {
        return  res.status(404).json({status:"404",message:"Record not found"})
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
        totalLanguages:response.data[0].languages.length,
        totalCurrencies:response.data[0].currencies.length
      })
}
 
})
.catch(function (error) {
//    console.log(error);
if(error.response.status==404)
return  res.status(404).json({status:"404",message:"Record not found"})
else
 return res.status(400).json({status:"400",message:"Bad request"})
});
    
})

//Country by code.........................................................................................................................

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
        return  res.status(404).json({status:"404",message:"Record not found"})
     }
   
 else{
    // console.log(JSON.stringify(response.data));
     return res.json({name:response.data.name,
         alpha2Code:response.data.alpha2Code,
         alpha3Code:response.data.alpha3Code,
         capital:response.data.capital,
         region:response.data.region,
         population:response.data.population,
         flag:response.data.flag,
         totalLanguages:response.data.languages.length,
         totalCurrencies:response.data.currencies.length,
         totalTimezones:response.data.timezones.length
       })
 }
  
 })
 .catch(function (error) {
    // console.log(error);
    if(error.response.status==404)
    return  res.status(404).json({status:"404",message:"Record not found"})
    else
     return res.status(400).json({status:"400",message:"Bad request"})
 });
     
 })

//Country by search query...........................................................................................................

router.get('/country/search',async(req,res)=>{
    let search = req.query.searchText;
    
    try{

        const response=await axios({
            method: 'GET',
            url: `https://restcountries.eu/rest/v2/name/${search}?fullText=true`,
            headers: {
                 "Content-Type":"application/json",
             }
          })
          if(response.data)
          {
            return res.json({name:response.data[0].name,
                alpha2Code:response.data[0].alpha2Code,
                alpha3Code:response.data[0].alpha3Code,
                capital:response.data[0].capital,
                region:response.data[0].region,
                population:response.data[0].population,
                flag:response.data[0].flag,
                totalLanguages:response.data[0].languages.length,
                totalCurrencies:response.data[0].currencies.length,
                totalTimezones:response.data[0].timezones.length
              })
          }
         
        
    }catch(err){
        // console.log(err)
        try{
            const response3=await axios({
                method: 'GET',
                url: `https://restcountries.eu/rest/v2/callingcode/${search}`,
                headers: {
                     "Content-Type":"application/json",
                 }
              })
              if(response3.data)
                {
                    return res.json({name:response3.data[0].name,
                        alpha2Code:response3.data[0].alpha2Code,
                        alpha3Code:response3.data[0].alpha3Code,
                        capital:response3.data[0].capital,
                        region:response3.data[0].region,
                        population:response3.data[0].population,
                        flag:response3.data[0].flag,
                        totalLanguages:response3.data[0].languages.length,
                        totalCurrencies:response3.data[0].currencies.length,
                        totalTimezones:response3.data[0].timezones.length
                    })
                }
        }catch(err){
            try{
                const response2= await axios({
                    method: 'GET',
                    url: `https://restcountries.eu/rest/v2/alpha/${search}`,
                    headers: {
                         "Content-Type":"application/json",
                     }
                  })
                  if(response2.data)
                  {
                    return res.json({name:response2.data.name,
                        alpha2Code:response2.data.alpha2Code,
                        alpha3Code:response2.data.alpha3Code,
                        capital:response2.data.capital,
                        region:response2.data.region,
                        population:response2.data.population,
                        flag:response2.data.flag,
                        totalLanguages:response2.data.languages.length,
                        totalCurrencies:response2.data.currencies.length,
                        totalTimezones:response2.data.timezones.length
                      })
                  }
            }catch(err){
                try{
                    const response4=await axios({
                        method: 'GET',
                        url: `https://restcountries.eu/rest/v2/capital/${search}`,
                        headers: {
                             "Content-Type":"application/json",
                         }
                      })
                      if(response4.data)
                        {
                            return res.json({name:response4.data[0].name,
                                alpha2Code:response4.data[0].alpha2Code,
                                alpha3Code:response4.data[0].alpha3Code,
                                capital:response4.data[0].capital,
                                region:response4.data[0].region,
                                population:response4.data[0].population,
                                flag:response4.data[0].flag,
                                totalLanguages:response4.data[0].languages.length,
                                totalCurrencies:response4.data[0].currencies.length,
                                totalTimezones:response4.data[0].timezones.length
                            })
                        }
                }catch(error){
                    // console.log(error);
                    if(error.response.status==404)
                    return  res.status(404).json({status:"404",message:"Record not found"})
                    else
                     return res.status(400).json({status:"400",message:"Bad request"})
                }
            }
        }
        
    }
})

 

module.exports=router;