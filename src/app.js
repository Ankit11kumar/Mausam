const express=require('express')
const path=require('path')
const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//Define paths for express config
const publicstaticpath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicstaticpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ankit',
        footer_name:'Created by Ankit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us',
        name:'Using this application you can search weather for any location in the world!!',
        footer_name:'Created by Ankit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Need help?',
        help_text:'Please refer to our official website for any help regarding your search.',
        footer_name:'Created by Ankit'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

        geocode(req.query.address,(error,data)=>{
            if(error)
            return res.send({error})
            
            const full_location=data.place
            forecast(data.longitude,data.latitude,(error,data)=>{
                if(error)
                res.send({error})
                else
                res.send({
                    data:data,
                    location:full_location
                })
            })
        
        })

    
})


app.get('*',(req,res)=>{
    res.send('<h1>Error 404: Page not Found!!</h1>')
})

app.listen(port,()=>{
    console.log('Server started on port '+ port)
})