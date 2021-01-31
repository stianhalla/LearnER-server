/**
 * Kontroller som håndterer autentisering
 * */

const jwt = require('jwt-simple')
const config = require('../config')
const { User } = require('../models')

// Genererer en jwt-token
const tokenForUser = (user) => {
    const timestamp = new Date().getTime() // Tidspunkt token ble laget
    return jwt.encode({ sub: user.id, iat: timestamp}, config.secret)
}

// Oppretter en ny bruker og logger den inn
exports.signup = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    // Lager en ny buker i databasen og returnerer en jwt token for innlogging
    User.create({ username, email, password })
        .then(user =>  res.json({ token: tokenForUser(user) }) )
        .catch(err =>  res.status(403).send(err.errors) )
}

// Logger inn en bruker
exports.signin = (req, res, next) => {
    const user = req.user // Kommer fra done(null, user) i passport
    return res.json({ token: tokenForUser(user) });
}


