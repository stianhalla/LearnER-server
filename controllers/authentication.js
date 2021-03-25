/**
 * @author Stian Helgerud
 * Kontroller som håndterer autentisering
 * */

const jwt = require('jwt-simple')
const nodemailer = require("nodemailer");
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

// Genererer en jwt-token
const tokenForEmail = (userId) => {
    return jwt.encode(userId, config.secret);
}

// Email sender
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

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

            // Sender e-post til bruker
            sendMail(email, user.id); // Venter ikke på att emailen skal sendes (ikke await)

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

    const userId = jwt.decode(req.params.token, config.secret);

    try{
        await User.update({verified: true}, {where: {id: userId}}) // finner bruker og verifiserer

        // TODO returner bruker til egen side for å vise att mail er verifisert
        return res.json(new SuccRes(
            'Email confirmed',
            { message: 'You can now sign in to the application'}
        ));
    }catch (err){
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    }
}

// Finner ut hvilke type feil som gjør att ikke bruker kan logge seg inn (Må gjøres manuelt, da passport ikke sender like 401 meldinger)
exports.error = async (req, res, next) => {
    const user = await User.findOne({where: {email: req.body.email}});

    // Fant ikke bruker - epost er feil
    if(!user){ return res.status(401).json(new ErrRes("Unauthenticated", ['Feil brukernavn eller passord'])) }
    // Feil passord
    if(!user.comparePassword(req.body.password)) { return res.status(401).json(new ErrRes("Unauthenticated", ['Feil brukernavn eller passord'])) }
    // Bruker har ikke verifisert seg
    if (!user.verified){ return res.status(401).json(new ErrRes("Unauthenticated", ['E-post er ikke bekreftet'])) }
}

/**
 * Hjelpefunksjon som sender mail
 * @param email -> e-post adresse som mailen skal sendes til
 * @param userId -> bruker id som brukes for å sette opp url som kal verifisere bruker
 * */
async function sendMail(email, userId){

    const emailToken = tokenForEmail(userId)
    const url = `${process.env.API_URL}/auth/verify/${emailToken}`

    // send mail with defined transport object
    transporter.sendMail({
        from: process.env.EMAIL,
        to: email, // list of receivers
        subject: "Konto-verifikasjon: LearnER", // Subject line
        html: "Hei. <br/> Velkommen som bruker av denne applikasjonen. <br/> Klikk på linken under for å aktivere kontoen din eller kopier og lim inn hvis den ikke er klikkbar. <br/> Aktiveringslink: " +
            `<a href="${url}">${url}</a>`
    });
}

