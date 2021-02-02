/**
 * Kontroller som håndterer autentisering
 * */

const jwt = require('jwt-simple')
const config = require('../config')
const { User, Login } = require('../models')
const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')

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
        .then(user =>  {

            // Bruker logges automatiks på, så logges innloggingen i logins tabell
            Login.create({user_id: user.id}) // Gjøres async

            return res.json(new SuccRes(
                'User created',
                { token: tokenForUser(user) }
            ))
        })
        .catch(err =>  {
            if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
            return res.status(422).json(new ErrRes(
                    err.name,
                    err.errors.map(error => error.message)
                )
            )
        })
}

// Logger inn en bruker
exports.signin =  (req, res, next) => {
    const user = req.user // Kommer fra done(null, user) i passport
    if(!user){ return res.status(404).json(new ErrRes(
        'Not Found',
        ['Can not find user']
    ))}

    // Innlogging logges
    Login.create({user_id: user.id}) // Gjøres async

    return res.json(new SuccRes(
        'User signed in',
        { token: tokenForUser(user) }
    ));
}


