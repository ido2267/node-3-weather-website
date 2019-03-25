const request = require('request')


const geocode = (address,callback)=>{
  token='pk.eyJ1IjoiaWRvMjI2NyIsImEiOiJjanRkbXc5d2UxMTR1NDNwZm4xYWdoZXNwIn0.2UxHxNFjj7rpVQT_MCntkQ'
  mpbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
//address = 'Philadelphia.json' 
const url = mpbox +address +'.json?access_token=' + token
request({url, json:true}, (error,{body})=>{
  if (error){
          callback('Unable to connect to weather site',undefined)
  } else if (body.features.length==0) {
          callback('Unable to find location',undefined)}
  else{
        
        
    callback(undefined,{
      latitude : body.features[0].center[1],
      longitude : body.features[0].center[0],
      location : body.features[0].place_name
   })
  }        
  

  })

  }

  module.exports = geocode