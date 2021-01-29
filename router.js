/**
 * Håndterer requests
 * */

const passport = require('passport')
const Authentication = require('./controllers/authentication')
const AUTH = '/api/auth/'
const passportServices = require('./services/passport') // Blir brukt, ikke fjern!

// Middleware for å sette på autentisering på routes
const requireUserPrivileges = passport.authenticate('user-rule', {session: false})
const requireTeacherPrivileges = passport.authenticate('teacher-rule', {session: false})
const requireSignin = passport.authenticate('local', {session: false}) // krever email og passord

const router = (app) => {

    // Test route
    app.get('/', requireTeacherPrivileges, (req, res) => {
        res.send({hi : 'there'})
    })

    app.post(AUTH + 'signin', requireSignin, Authentication.signin)

    app.post(AUTH + 'signup', Authentication.signup)
}

module.exports = router;