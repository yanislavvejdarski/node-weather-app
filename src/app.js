const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const port = process.env.PORT || 3000
//Define paths for Express config

const publicDirectoryPath = path.join(__dirname, '../public')
const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yanislav Vejdarski'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Yanislav Vejdarski'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yanislav Vejdarski'
    })
})
app.get('/help/*', (req, res) => {
    res.render('error404', {
        name: '404',
        errorMessage: 'Article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        name: '404',
        errorMessage: '404 Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})