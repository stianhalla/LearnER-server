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

// Bruker local passport strategi
const signup = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    // Lager en ny buker i databasen og returnerer en jwt token for innlogging
    User.create({ username, email, password })
        .then(user => { res.json({ token: tokenForUser(user) }) })
        .catch(err => { res.status(422).send(err) })
}

// Bruker jwt passport strategi
const signin = (req, res, next) => {
    const user = req.user // Kommer fra done(null, user) i passport
    res.json({ token: tokenForUser(user) })
}

exports.signup = signup;
exports.signin = signin;