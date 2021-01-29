/**
 * Kontroller for å håndtere bruker requests
 * */

const { User, Avatar, Rank } = require('../models')

// Henter alle brukere
exports.index = (req, res, next) => {
    const users = User.findAll({
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}]
    })
        .then(users => { res.json(users) })
        .catch(err => { res.status(422).json(err) })
}

// Henter en valgt bruker
exports.show = (req, res, next) => {

}

// Oppdaterer en valgt bruker
exports.update = (req, res, next) => {

}

// Sletter en valgt bruker
exports.destroy = (req, res, next) => {

}
