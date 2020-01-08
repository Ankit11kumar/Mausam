const request=require('request')


const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiYW5raXQtMDciLCJhIjoiY2s0dGlwaHRwMDd4NjNzcWJkazc2cG4waSJ9.GEMzRZ1Pq8ZK7iecdnflqA&limit=1"

    request({url:url,json:true}, (err,response)=>{
        if(err)
        callback('Connection cannot be established',undefined)
        else if(response.body.features.length===0)
        callback('Place cannot be found. Please enter a valid location',undefined)
        else{
        callback(undefined,{
            longitude: response.body.features[0].center[0],
            latitude: response.body.features[0].center[1],
            place: response.body.features[0].place_name
           })
        }
    })
}

module.exports=geocode;