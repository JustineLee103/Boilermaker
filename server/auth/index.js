const router = require('express').Router();
const Users = require('../db/models/Users')
module.exports = router

router.post('/login', async(req, res, next) => {
    try {
        const user = await Users.findOne({where: {email: req.body.email}})
        if (!user) {
            console.log('No such user found: ', req.body.email)
            res.status(401).send('Wrong username and/or password')
        } else if (!user.correctPassword(req.body.password)){
            console.log('Incorrect password for user: ', req.body.email)
            res.status(401).send('Wrong username and/or password')
        } else {
            req.login(user, err => (err ? next(err) : res.json(user)))
        }
    } catch (err) {
        next(err)
    }
})

router.post('/signup', async(req, res, next) =>{
    try {
        const user = await Users.create(req.body)
        req.login(user, err => (err ? next(err) : res.json(user))) // req.login allows us to serialize the user and user will be assigned to req.user
    } catch(err){
        if(err.name === 'SequelizeUniqueConstraintError') {
            res.status(401).send('User already exists')
        } else {
            next(err)
        }
    }
})

router.post('/logout', (req, res) => {
    req.logout() //this is a passport method created from passport.initialize. this will remove user from session and delete req.user
    req.session.destroy() // this is from express.session this logs out the user AND forgets taht this client was connected to us 
    res.redirect('/') // redirect to homepage
})

//who is currently logged in ? the front end has amnesia! So when you refresh, the frontend forgest who's logged in
// browser will ask the server, am i logged in? Server will provide this information! 
router.get('/me', (req, res) => {
    res.json(req.user)
})