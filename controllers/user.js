/**
 * Kontroller for å håndtere bruker requests
 * */

const { User, Avatar, Rank } = require('../models')
const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')

// Henter alle brukere
exports.index = (req, res, next) => {
    const users = User.findAll({
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}]
    })
        .then(users => {
            if(!users){ return res.status(500).json(new ErrRes(
                'Server error',
                ['Can not find any users']
            ))}
            return res.json(new SuccRes(
                'Users fetched',
                users
            ));
        })
        .catch(err => {
            return res.status(err.status || 422).json(new ErrRes(
                err.message,
                err.errors.map(error => error.message)
            ));
        })
}

// Henter en valgt bruker
exports.show = (req, res, next) => {
    const user = User.findByPk(req.params.id, {
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}]
    })
        .then(user => {
            if(!user){ return res.status(500).json(new ErrRes(
                'Server error',
                ['Can not find user']
            )) }
            return res.json(new SuccRes(
                'User fetched',
                user
            ));
        })
        .catch(err => res.status(err.status || 422).json(new ErrRes(
            err.message,
            err.errors.map(error => error.message)
        )))
}

// Oppdaterer en valgt bruker
exports.update = (req, res, next) => {

}

// Sletter en valgt bruker
exports.destroy = (req, res, next) => {

}
