const db = require('./database')
const Puppies = require('./models/Puppies')
const Users = require('./models/Users')


Puppies.belongsTo(Users, {as: 'puppy'})
Users.hasMany(Puppies)

module.exports = {
    db,
    Puppies,
    Users
}