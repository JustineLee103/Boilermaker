const Sequelize = require('sequelize')
const db = require('../database')
const crypto = require('crypto')
const _ = require('lodash')



const Users = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    googleId:{
        type: Sequelize.STRING
    }
}, {
    hooks: {
        beforeCreate: setSaltAndPassWord,
        beforeUpdate: setSaltAndPassWord
    }
})

//instance methods 
Users.prototype.correctPassword = function (candidatePassword){
    return this.Model.encryptPassword(candidatePassword, this.salt) === this.password
};

Users.prototype.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt'])
}


// class methods

Users.generateSalt = function (){
    return crypto.randomBytes(16).toString('base64')
}

Users.encryptPassword = function (plainText, salt) {
    const hash = crypto.createHash('sha1')
    hash.update(plainText)
    hash.update(salt)
    return hash.digest('hex')
};

function setSaltAndPassWord (user){
    if (user.change('password')){
        user.salt = Users.generateSalt()
        user.password = Users.encryptPassword(user.password, user.salt)
    }
}



module.exports = Users


