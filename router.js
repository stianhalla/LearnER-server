/**
 * Håndterer requests
 * */

const passport = require('passport')
const Authentication = require('./controllers/authentication')
const AUTH = '/api/auth/'
const passportService = require('./services/passport')

// Middleware for å sette på autentisering på routes
const requireAuth = passport.authenticate('jwt', {session: false}) // krever token i header
const requireSignin = passport.authenticate('local', {session: false}) // krever email og passord

const router = (app) => {

    // Test route
    app.get('/', requireAuth, (req, res) => {
        res.send({hi : 'there'})
    })

    app.post(AUTH + 'signin', requireSignin, Authentication.signin)

    app.post(AUTH + 'signup', Authentication.signup)
}

module.exports = router;