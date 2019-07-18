const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000
//Define paths for Experss config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hadnlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'))
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arturas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About The App',
        name: 'Arturas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Arturas',
        message: 'This is the help page!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            });
        } 
    
        forecast(lat, long, (error, {temp, rain, daily, low, high}) => {
            if(error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                location: location,
                address: req.query.address,
                daily: daily,
                temperature: temp,
                chanceOfrain: rain,
                forecast: `${daily} Right now it is ${temp}C outside with a ${rain}% chance of rain. The low temperature of the day will be ${low}C and the high will be ${high}C.`
            })
          });
    });
})

app.get('/help/*', (req, res) => {
    res.render('404Help', {
        name: 'Arturas',
        title: 'Help error!',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search ) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query);
    res.send({
        products: [],
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        name: 'Arturas',
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server has started on port " + port)
})