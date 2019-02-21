const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

// logging middleware (helps with debugging)
app.use(morgan('dev'))

// static middleware
app.use(express.static(path.join(__dirname, '../public')))

// body parsing middleware (reqs will frequently contain a body. If you wnat to use it in req.body, then you have to parse using middleware!)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// API routes
app.use('/api', require('./api'))

// send index.html for any requests that DON'T match one of the API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// error handling middleware. This should be at the VERY end of your entry file

app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
