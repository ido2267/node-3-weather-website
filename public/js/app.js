
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#Message-1')
const messageTwo = document.querySelector('#Message-2')
// messageOne.textContent ='From Javascript'

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location = search.value
//console.log(location)//
messageOne.textContent =''
messageTwo.textContent =''

fetch('http://localhost:3000/weather?address='+location).then((response)=>{

  response.json().then((data)=>{
    if (data.error){
      messageTwo.textContent = data.error
      return
    }
          messageOne.textContent = data.location + ' ' +  data.address
          messageTwo.textContent = data.summary + ' ' + data.Temprature
      

  })
})
})



