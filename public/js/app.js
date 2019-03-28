
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#Message-1')
const messageTwo = document.querySelector('#Message-2')
const messageThree = document.querySelector('#Message-3')
// messageOne.textContent ='From Javascript'

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location = search.value
//console.log(location)//
messageOne.textContent =''
messageTwo.textContent =''
messageThree.textContent =''

fetch('/weather?address='+location).then((response)=>{

  response.json().then((data)=>{
    if (data.error){
      messageTwo.textContent = data.error
      return
    }
          messageOne.textContent = data.location + ' ' +  data.address
          messageTwo.textContent = data.summary + ' ' + data.Temprature
          messageThree.textContent = 'Low temprature: ' + data.temperatureLow +  
          ' ; High temprature: ' + data.temperatureHigh

  })
})
})



