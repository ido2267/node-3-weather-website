
const request = require('request')

const forecast =(lat,long,callback) =>{
  key = '8f5d62073342525c4c2614a370dd6609'
  
  
   const url = 'https://api.darksky.net/forecast/' + key +'/'+ lat +',' +long + '?exclude=minutely,hourly,flags&units=si&lang=en'
   request({url, json:true},(error,{body})=>{
         //  console.log(body.currently)  
         if (error){
          callback ('Unable to connect to weather site',undefined)
         }
         else if (body.error) {
          callback(body.error,undefined)
         }
         else{
           callback(undefined, {
         summary: body.daily.data[0].summary,
         temperature: body.currently.temperature,
         probability:  body.currently.precipProbability
         }  ) }
        })
      }     
   
module.exports = forecast      