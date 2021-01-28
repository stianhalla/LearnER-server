/**
 * Autentiseringslag
 * */
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const { User } = require('../models')
const config = require('../config')

// Setter opp valg for JWT strategien
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), // Hvor i requesten ligger jwt token
    secretOrKey: config.secret
}

// Setter opp  valg for local strategi
const localOptions = {
    usernameField: 'email', // Bruker email istede for brukernavn (default)
}

// Setter opp JWT strategi
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // Ser om bruker id i payload objekt finnes i databasen
    User.findByPk(payload.sub)
        .then(user => {
            if(!user){ return done(null, false); } // Ingen feil (null), men fant ikke bruker
            return done(null, user); // Ingen feil (null) og bruker funnet
        })
        .catch(err => done(err, false))
})

// Setter opp lokal strategi (for autenisering av email og passord)
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ where: { email }}) // Ser om email finnes i databasen
        .then(async user => {
            if(!user){ return done(null, false) }

            const isValid = await user.comparePassword(password) // Venter på svar fra bcrypt sjekk

            if(!isValid) { return done(null, false)}
            return done(null, user) // Passord og email korrekt
        })
        .catch(err => done(err, false))
})

// Velg strategi med passport
passport.use(jwtLogin) // Sjekker om request gjøres av rett bruker med rett jwt token
passport.use(localLogin) // Sjekker om vi kan gi bruker en jwt token (ved innlogging)