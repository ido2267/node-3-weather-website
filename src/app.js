const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecats')
const port = process.env.PORT || 3000  // for heroku 
const app = express()

// define paths 
publicDirPath = path.join(__dirname,'../public')
templatesDirPath = path.join(__dirname,'../templates/views')
partialsDirPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs') 
app.set('views',templatesDirPath) 
hbs.registerPartials(partialsDirPath)
// setup static directory to serve
app.use(express.static(publicDirPath))
 
app.get('',(req,res)=>{
  res.render('index',{title:'Weather',
           name: 'Ido Sokolovsky'})

  })

  
app.get('/help',(req,res)=>{
  res.render('help',{forecast:"38 degrees",location:"India",title:'Weather',
  name: 'Ido Sokolovsky'})

  })

app.get('/about',(req,res)=>{
  
res.render('about',{title:'About page',
name: 'Ido Sokolovsky'})
})

app.get('/weather',(req,res)=>{
  if (!req.query.address){
    return res.send({
       error:"You must provide an address"
     })
  } 
  address = req.query.address

////////////////////////////////

geocode(address, (error,{latitude,longitude,location}={})=>{

  if (error){
          return   res.send({ error: "Address " + address +" wasn't found."})
             }
   
  
   forecast(latitude, longitude,(error,{summary,temperature,probability})=>
    {if (error){
         
        return   res.send({ error: "An error occured in the weather server."})
            }
  
    res.send({
         location,
         address,
         Temprature:  temperature + ' Celsius',
         Probabilty: Math.round(probability * 100)    +'%', 
         summary
        
    })
    })
  
      }
  )})
///////////////////////////////////


 


app.get('/products',(req,res)=>{

  if (!req.query.search){
    return res.send({
       error:"You must provide a searchh term"
     })
  } 

  console.log(req.query.search)
  res.send({products:[]}
    ) 
})  


  app.get('/help/*',(req,res)=>{    // * - match anything that wasn't macthed until now

    //res.send('Help article not found')
    res.render('page404',{title:'404 page',
                          name: 'Ido Sokolovsky',
                          errormessage:"Help article not found"})

  })

app.get('*',(req,res)=>{    // * - match anything that wasn't macthed until now

        res.render('page404',{title:'404 page',
        name: 'Ido Sokolovsky',
        errormessage:"Page not found"})

  })


app.listen(port,()=>{
  console.log('Server is listening on port ' + port)
})  