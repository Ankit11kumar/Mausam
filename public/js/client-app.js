const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    const location=search.value

    fetch("http://localhost:3000/weather?address="+location+'"').then((response)=>{
    response.json().then((datafromserver)=>{
        if(datafromserver.error){
            messageOne.textContent=datafromserver.error
        }
        else{
        messageOne.textContent=datafromserver.location
        messageTwo.textContent=datafromserver.data
        }
    })
})
    
})