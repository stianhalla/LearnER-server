/**
 * @author Stian Helgerud
 * Kontroller som håndterer autentisering
 * */

const jwt = require('jwt-simple')
const config = require('../config')
const { User, Login } = require('../models')
const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { notFoundErr } = require('../config/validations')

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
        .then( async user =>  {

            if(!user || user.length === 0){return res.status(404).json(notFoundErr)}

            // Sender med rank og avatar
            const jsonUser = user.toJSON();
            try {
                jsonUser.avatar = await user.getAvatar();
                jsonUser.rank = await user.getRank();
            }catch (err){
                console.log("Fikk ikke hentet ut avatar og rank fra database")
            }

            try {
                // Bruker logges automatiks på, så logges innloggingen i logins tabell
                await Login.create({user_id: user.id})
            }catch (err){
                console.log("Fikk ikke logget innlogginen til datasen")
            }

            // TODO Send epost til bruker

            return res.json(new SuccRes(
                'User created',
                { message: `Confirm your email address before you can sign in`, user: jsonUser }
            ))
        })
        .catch(err =>  {
            if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
            return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
        })
}

// Logger inn en bruker
exports.signin = async (req, res, next) => {
    const user = req.user // Kommer fra done(null, user) i passport

    if(!user || user.length === 0){return res.status(404).json(new ErrRes('Not Found',['Cannot find user to sign in']));}

    // Sender med rank og avatar
    const jsonUser = user.toJSON();
    try {
        jsonUser.avatar = await user.getAvatar();
        jsonUser.rank = await user.getRank();
    }catch (err){
        console.log("Fikk ikke hentet ut avatar og rank fra database")
    }

    // Innlogging logges
    try {
        await Login.create({user_id: user.id})
    }catch (err){
        console.log("Fikk ikke logget innlogginen til datasen")
    }

    return res.json(new SuccRes(
        'User signed in',
        { token: tokenForUser(user), user : jsonUser }
    ));
}

// Verifiserer bruker fra email
exports.verify = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.body.user_id) // finner bruker som skal verifiseres

        await user.update({ verified: true });

        return res.json(new SuccRes(
            'Email confirmed',
            { message: 'You can now sign in to the application' }
        ));
    }catch (err){
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    }
}


