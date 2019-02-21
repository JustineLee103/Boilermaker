const Sequelize = require('sequelize')
const db = require('../database')

const Puppies = db.define('puppies', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Puppies
