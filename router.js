/**
 * Håndterer requests
 * */
const passport = require('passport')
const passportServices = require('./services/passport') // Blir brukt, ikke fjern!

const AuthController = require('./controllers/authentication')
const UserController = require('./controllers/user')
const AnswerController = require('./controllers/answer')
const AvatarController = require('./controllers/avatar')
const ExerciseController = require('./controllers/exercise')
const StatisticController = require('./controllers/statistic')
const ChapterController = require('./controllers/chapter')
const QuestionController = require('./controllers/question')
const QuestionResourceController = require('./controllers/question_resource')
const QuizController = require('./controllers/quiz')

const AUTH = '/api/auth' // Eneste route uten flertall
const USERS = '/api/users'
const ANSWERS = '/api/answers'
const AVATARS = '/api/avatars'
const EXERCISES = '/api/exercises'
const STATS = '/api/stats'
const TEST = '/api/test'
const CHAPTERS = '/api/chapters'
const QUESTIONS = '/api/questions'
const QUESTION_RESOURCE = '/api/questionResource'
const QUIZ = '/api/quiz'


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
    app.post(AUTH + '/error', AuthController.error)
    app.get(AUTH + '/verify/:token', AuthController.verify)

    // USERS
    app.get(USERS, requireUserPrivileges ,UserController.index)
    app.get(USERS + '/me', requireUserPrivileges ,UserController.me)
    app.get(USERS + '/leaderboard', requireUserPrivileges ,UserController.leaderboard)
    app.get(USERS + '/:id', requireUserPrivileges ,UserController.show)
    app.patch(USERS + '/:id', requireUserPrivileges ,UserController.update)
    app.delete(USERS + '/:id', requireUserPrivileges, UserController.destroy)

    // ANSWERS
    app.get(ANSWERS, requireUserPrivileges, AnswerController.index)
    app.get(ANSWERS + "/:id", requireUserPrivileges, AnswerController.show)
    app.get(ANSWERS + "/with/:exercise_id", requireUserPrivileges, AnswerController.showByExerciseId)
    app.post(ANSWERS, requireUserPrivileges, AnswerController.create)
    app.post(ANSWERS + "/evaluate", requireUserPrivileges, AnswerController.evaluate)
    app.patch(ANSWERS + "/:id", requireUserPrivileges, AnswerController.update)
    app.patch(ANSWERS + "/:id/save", requireUserPrivileges, AnswerController.save)
    app.delete(ANSWERS + "/:id", requireUserPrivileges, AnswerController.destroy)

    // AVATARS
    app.get(AVATARS, requireUserPrivileges, AvatarController.index)
    app.get(AVATARS + "/all",  AvatarController.indexAll)
    app.get(AVATARS + "/:id", requireUserPrivileges, AvatarController.show)

    // EXERCISES
    app.get(EXERCISES, requireUserPrivileges, ExerciseController.index)
    app.get(EXERCISES + "/:id", requireUserPrivileges, ExerciseController.show)

    // STATS
    app.get(STATS, requireUserPrivileges, StatisticController.dashboard)
    app.get(STATS + "/achievements", requireUserPrivileges, StatisticController.achievements)
    app.post(STATS + "/achievements/:id", requireUserPrivileges, StatisticController.retrieveReward)

    //CHAPTERS
    app.get(CHAPTERS, requireUserPrivileges, ChapterController.index)
    app.patch(CHAPTERS + "/:id", requireUserPrivileges, ChapterController.update)
    app.patch(CHAPTERS + "/increment/:id", requireUserPrivileges, ChapterController.incrementAttempts)

    //QUESTIONS WITH ALTERNATIVES
    app.get(QUESTIONS + "/:chapter_id", requireUserPrivileges, QuestionController.index)

    //QUESTION_RESOURCE
    app.get(QUESTION_RESOURCE + "/:question_id", requireUserPrivileges, QuestionResourceController.index)

    //QUIZ
    app.post(QUIZ, requireUserPrivileges, QuizController.submit) // Body = { points: x }

    //404 Route (Alltid behold denne som siste route)
    app.get('*', function(req, res){
        res.status(404).send('<h1>404 Nothing here</h1>');
    });
}

module.exports = router;