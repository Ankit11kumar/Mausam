const request = require("request")

const forecast=(longitude,latitude,callback)=>{
    const pred_url='https://api.darksky.net/forecast/9f79e8b9f80342f9c4f5fa56104bfd58/' + latitude + ',' + longitude + '?units=si'

    request({url:pred_url,json:true},(err,response)=>{

        const temp=response.body.currently.temperature
        const rain=response.body.currently.precipProbability

        if(err)
        callback('Unable to connect to weather service',undefined)
        else if(response.body.err)
        callback('Unable to find location',undefined)
        else{
        callback(undefined,
            response.body.daily.data[0].summary + 'It is currently '+ temp + ' degrees out. There is a ' +  rain + '% of rain.'
           )
        }

    })
}

module.exports=forecast;