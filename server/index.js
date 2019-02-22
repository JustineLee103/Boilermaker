const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const { db , Users } = require('./db')
const passport = require('passport')
// configure and create our DATABASE STORE 
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({db: db})


// PASSPORT REGISTRION

passport.serializeUser((user, done) => {
    try {
        done(null, user.id)
    } catch (err) {
        done(err)
    }
});

passport.deserializeUser( async(id, done) => {
    try {
        const user = await Users.findById(id)
        done(null, user)
    } catch (err){
        done(err)
    }
})


//******//


// SYNC so that our session table gets created, and plug this into the session middleware below 
dbStore.sync();

// LOGGING middleware (helps with debugging)
app.use(morgan('dev'))

// BODY PARSING middleware (reqs will frequently contain a body. If you wnat to use it in req.body, then you have to parse using middleware!)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



//******//



// SESSION middleware - session information will be stored in the memory for the life of your server process
// session is a function that takes an object.. 
app.use(session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    store: dbStore,
    resave: false, 
    saveUninitialized: false
}))

// PASSPORT middleware - initialize will now consume our req.session object and attach the user to the request object. this must come after session middleware. 
app.use(passport.initialize())
// This will invoke our register deserializer method and attempt to put the user on the req.user
app.use(passport.session())



//******//



// API routes
app.use('/api', require('./api'))

// STATIC middleware
app.use(express.static(path.join(__dirname, '../public')))

// send index.html for any requests that DON'T match one of the API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})    



//******//


// ERROR handling middleware. This should be at the VERY end of your entry file

app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
