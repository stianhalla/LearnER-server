/**
 * Kontroller for oppgaver
 * */

const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { userType } = require('../config/types')
const { Exercise, User, Difficulty_level } = require('../models')


exports.index = (req, res, next) => {
    Exercise.findAll({
        include: [{model: User, as: 'author'}, {model: Difficulty_level, as: 'difficulty_level'}],
        where: { public: true }
    }).then(exercises => {
        if(!exercises || exercises.length === 0){
            return res.status(404).json(new ErrRes(
                'Not Found',
                ['Cannot find any exercises']
            ))
        }

        return res.json(new SuccRes('Exercises fetched', exercises))
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
    })
}

exports.show = (req, res, next) => {
    Exercise.findOne({
        include: [{model: User, as: 'author'}, {model: Difficulty_level, as: 'difficulty_level'}],
        where: { public: true, id: req.params.id }
    }).then(exercise => {
        if(!exercise || exercise.length === 0){
            return res.status(404).json(new ErrRes(
                'Not Found',
                ['Cannot find exercise']
            ))
        }

        return res.json(new SuccRes('Exercise fetched', exercise))
    })
}



