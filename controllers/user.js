/**
 * Kontroller for å håndtere bruker requests
 * */

const {User, Avatar, Rank, Rank_has_avatar} = require('../models')
const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const {userType} = require('../config/types')

// Henter alle brukere
exports.index = (req, res, next) => {
    User.findAll({
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}]
    })
        .then(users => {
            if (!users || users.length === 0) {
                return res.status(404).json(new ErrRes(
                    'Not Found',
                    ['Can not find any users']
                ))
            }
            return res.json(new SuccRes(
                'Users fetched',
                users
            ));
        })
        .catch(err => {
            if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
            return res.status(422).json(new ErrRes(
                err.message,
                err.errors.map(error => error.message)
            ));
        })
}

// Henter en valgt bruker
exports.show = (req, res, next) => {
    User.findByPk(req.params.id, {
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}]
    })
        .then(user => {
            if (!user) {
                return res.status(404).json(new ErrRes(
                    'Not Found',
                    ['Can not find user']
                ))
            }
            return res.json(new SuccRes(
                'User fetched',
                user
            ));
        })
        .catch(err => {
            if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
            return res.status(422).json(new ErrRes(
                err.message,
                err.errors.map(error => error.message)
            ))
        })
}

// Henter innloget bruker
exports.me = (req, res, next) => {
    User.findByPk(req.user.id, {
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}]
    })
        .then(user => {
            if (!user) {
                return res.status(404).json(new ErrRes(
                    'Not Found',
                    ['Can not find user']
                ))
            }
            return res.json(new SuccRes(
                'User fetched',
                user
            ));
        })
        .catch(err => {
            if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
            return res.status(422).json(new ErrRes(
                err.message,
                err.errors.map(error => error.message)
            ))
        })
}

// Oppdaterer en valgt bruker
exports.update = async (req, res, next) => {
    const user = req.user;
    const candidateId = parseInt(req.params.id)

    // Bruker kan endre data om seg selv
    if (user.id !== candidateId) {
        // Kan ikke endre annet en egen bruker
        return res.sendStatus(401)
    }

    if(!isValidPassword(req)){
       return res.status(422).json(new ErrRes('Validation Error', ['Passwords needs to be identical']))
    }

    const validAvatar = await Rank_has_avatar.findOne({
        where: {rank_id: req.user.rank_id, avatar_id: req.body.avatar_id}
    })

    // Fant ikke noe rad (ikke gyldig avatar)
    if(!validAvatar) {
        return res.status(422).json(new ErrRes('Validation Error', ['You have not unlocked this avatar']))
    }

    // Sender bare med data som skal kunne endres av bruker
    const body = req.body;
    const reqBody = {
        username: body.username,
        password: body.password_1,
        email: body.email,
        selected_notation: body.selected_notation,
        avatar_id: body.avatar_id
    }

    // Oppdaterer bruker
    user.update(reqBody).then(updatedUser => {
        // Bruker oppdatert
        return res.json(new SuccRes('User updated', updatedUser))
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
    })


}

// Sletter en valgt bruker
exports.destroy = (req, res, next) => {
    const user = req.user;
    const candidatId = parseInt(req.params.id);
    // Sjekker om bruker prøver å slette sin egen bruker
    if(user.id !== candidatId) {
        return res.sendStatus(401);
    }

    user.destroy().then(deleted =>{
        return res.json(new SuccRes('User deleted', null))
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
    })
}

/**
 * Hjelpe metoder
 * */
const isValidPassword = (req) => {
    // Hvis det ikke er oppgitt noe passord
    if (!req.body.password_1 && !req.body.password_2){ return true}
    if(req.body.password_1 === req.body.password_2) { return true}
    return false;
}

