/**
 * Kontroller for å håndtere bruker requests
 * */

const {User, Avatar, Rank, Rank_has_avatar} = require('../models')
const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { notFoundErr } = require('../config/validations')

// Henter alle brukere som er verifisert
exports.index = (req, res, next) => {

    User.findAll({
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}],
        where: { verified: true }
    }).then(users => {

        if (!users || users.length === 0) {return res.status(404).json(new ErrRes('Not Found',['Can not find any users']));}

        return res.json(new SuccRes('Users fetched', users));
    })
    .catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.message,err.errors.map(error => error.message)));
    })
}

// Henter en valgt bruker hvis verifisert
exports.show = (req, res, next) => {

    User.findByPk(req.params.id, {
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}],
        where: { verified: true }
    }).then(user => {

        if (!user || user.length === 0) {return res.status(404).json(new ErrRes('Not Found',['Can not find user']));}

        return res.json(new SuccRes('User fetched',user));
    })
    .catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.message,err.errors.map(error => error.message)));
    })
}

// Henter innloget bruker TODO Trenger ikke bruke findByPk når user allerede er i req.user
exports.me = (req, res, next) => {

    User.findByPk(req.user.id, {
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}]
    }).then(user => {

        if (!user || user.length === 0){return res.status(404).json(new ErrRes('Not Found',['Can not find user']));}

        return res.json(new SuccRes('User fetched',user));
    })
    .catch(err => {
        if (!err.errors){return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.message,err.errors.map(error => error.message)));
    })
}

// Oppdaterer en valgt bruker
exports.update = async (req, res, next) => {

    const user = req.user;
    const candidateId = parseInt(req.params.id)
    const body = req.body;
    const resBody = {}; // Body som skal oppdatere databasen

    // Bruker kan bare endre data om seg selv
    if (user.id !== candidateId) {return res.sendStatus(401);}

    if(!isValidPassword(req, resBody)){
       return res.status(422).json(new ErrRes('Validation Error', ['Passwords needs to be identical']))
    }

    if(req.body.avatar_id) {
            const validAvatar = await Rank_has_avatar.findOne({
                where: {rank_id: req.user.rank_id, avatar_id: req.body.avatar_id}
            });
        // Fant ikke noe rad (ikke gyldig avatar)
        if(!validAvatar) {
            return res.status(422).json(new ErrRes('Validation Error', ['You have not unlocked this avatar']))
        }else { // Gyldig avatar
            resBody.avatar_id = body.avatar_id;
        }
    }

    if(body.username){
        resBody.username = body.username;
    }

    if(body.email){
        resBody.email = body.email;
    }

    if(body.selected_notation){
        resBody.selected_notation = body.selected_notation;
    }

    // Oppdaterer bruker
    user.update(resBody).then(async updatedUser => {

        if(!updatedUser || updatedUser === 0){return res.status(404).json(notFoundErr)}

        const resUser = updatedUser.toJSON();
        const rank = await updatedUser.getRank();
        const avatar = await updatedUser.getAvatar();

        resUser.rank = rank;
        resUser.avatar = avatar;

        // Bruker oppdatert
        return res.json(new SuccRes('User updated', resUser ));
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
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

        if(!deleted || deleted === 0){return res.status(404).json(notFoundErr)}

        return res.json(new SuccRes('User deleted', null))
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
}

// Henter en topliste med gitt antall brukere (kun verifiserte brukere)
exports.leaderboard = (req, res, next) => {

    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Hvis ikke query parameter er oppgitt, så bruk 10

    User.findAll({
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}],
        order: [['score', 'DESC']],
        limit: limit,
        where: { verified: true }
    }).then(users => {

        if (!users || users.length === 0) {return res.status(404).json(new ErrRes('Not Found',['Can not find any users']));}

        return res.json(new SuccRes('Leaderboard fetched', users));
    })
    .catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.message,err.errors.map(error => error.message)));
    })
}

/**
 * Hjelpe metoder
 * */
const isValidPassword = (req, resBody) => {
    // Hvis det ikke er oppgitt noe passord
    if (!req.body.password_1 && !req.body.password_2){ return true}
    if(req.body.password_1 === req.body.password_2) {
        resBody.password = req.body.password_1; // Setter passord i request body
        return true;
    }
    return false;
};

