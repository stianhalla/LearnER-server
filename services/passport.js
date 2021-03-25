/**
 * @author Stian Helgerud
 * Autentiseringslag
 * */
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const { User } = require('../models')
const config = require('../config')

// Setter opp valg for JWT strategier
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), // Hvor i requesten ligger jwt token
    secretOrKey: config.secret
}

// Setter opp  valg for local strategi
const localOptions = {
    usernameField: 'username',
}

// Setter opp JWT for å autentisere en bruker
const jwtUser = new JwtStrategy(jwtOptions, (payload, done) => {
    // Ser om bruker id i payload objekt finnes i databasen
    User.findByPk(payload.sub)
        .then(user => {
            if(!user){ return done(null, false); } // Ingen feil (null), men fant ikke bruker
            return done(null, user); // Ingen feil (null) og bruker funnet
        })
        .catch(err => done(err, false))
})

// Setter opp JWT strategi for å autentisere en bruker med lærer rettigheter
const jwtTeacher = new JwtStrategy(jwtOptions, (payload, done) => {
    // Ser om bruker id i payload objekt finnes i databasen
    User.findByPk(payload.sub)
        .then(user => {
            if(!user){ return done(null, false); } // Ingen feil (null), men fant ikke bruker
            if(user.type !== 2){ return done(null, false); } // Ingen feil (null), men bruker har ikke 'lærer' rettigheter
            return done(null, user); // Ingen feil (null) og bruker med 'lærer' rettiheter funnet
        })
        .catch(err => done(err, false))
})

// Setter opp lokal strategi (for autenisering av email og passord)
const localSignIn = new LocalStrategy(localOptions, (username, password, done) => {
    User.findOne({ where: { username }}) // Ser om email finnes i databasen
        .then(async user => {
            if(!user){ return done(null, false) }

            if(!user.verified){ return done(null, false) } // Bruker har ikke verifisert epost

            const isValid = await user.comparePassword(password) // Venter på svar fra bcrypt sjekk
            if(!isValid) { return done(null, false)}

            return done(null, user) // Passord og email korrekt
        })
        .catch(err => done(err, false))
})

// Velg strategi med passport
passport.use('user-rule', jwtUser)
passport.use('teacher-rule', jwtTeacher)
passport.use(localSignIn) // Sjekker om vi kan gi bruker en jwt token (ved innlogging)