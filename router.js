/**
 * Håndterer requests
 * */
const passport = require('passport')
const passportServices = require('./services/passport') // Blir brukt, ikke fjern!

const AuthController = require('./controllers/authentication')
const UserController = require('./controllers/user')

const AUTH = '/api/auth' // Eneste route uten flertall
const USERS = '/api/users'
const TEST = '/api/test'

// Middleware for å sette på autentisering på routes
const requireUserPrivileges = passport.authenticate('user-rule', {session: false})
const requireTeacherPrivileges = passport.authenticate('teacher-rule', {session: false})
const requireSignin = passport.authenticate('local', {session: false}) // krever email og passord

const router = (app) => {

    // TEST
    app.get(TEST, requireUserPrivileges, (req, res) => {
        return res.send({hi : req.user})
    })

    // AUTH
    app.post(AUTH + '/signin', requireSignin, AuthController.signin)
    app.post(AUTH + '/signup', AuthController.signup)

    //USERS
    app.get(USERS, requireUserPrivileges ,UserController.index)
    app.get(USERS + '/:id', requireUserPrivileges ,UserController.show)
    app.patch(USERS + '/:id', requireUserPrivileges ,UserController.update)
    app.delete(USERS + '/:id', requireUserPrivileges, UserController.destroy)

    // Route som håndterer resten TODO
}

module.exports = router;