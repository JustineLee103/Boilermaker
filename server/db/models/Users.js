const Sequelize = require('sequelize')
const db = require('../database')

const Users = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Users
