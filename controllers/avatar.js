/**
 * @author Stian Helgerud
 * Kontroller som håndterer avatarer
 * */


const ErrRes = require('../config/ErrorResponse');
const SuccRes = require('../config/SuccessResponse');
const { Avatar, Rank } = require('../models');
const { notFoundErr } = require('../config/validations');
const {userType, avatarType} = require("../config/types");

// Viser alle avatarer som bruker har låst opp
exports.index = (req, res, next) => {

    Rank.findByPk(req.user.rank_id).then(async rank => {

        if(!rank || rank.length === 0){return res.status(404).json(notFoundErr);}

        const avatars = await rank.getAvatars({
            joinTableAttributes: [] // Fjerner jointable fra json
        });

        // Hvis rank ikke kan kobles til noe avatar, så er det noe galt
        if(!avatars || avatars.length === 0){
            return res.status(500).json(new ErrRes('Server error', [`Rank '${rank.name}' dos not have any avatars`]))
        }

        // Hvis admistrator legg til admin avatar
        if(req.user.type === userType.TEACHER) {
            avatars.push(avatarType.ADMIN_AVATAR);
        }

        return res.json(new SuccRes('Avatars fetched', avatars))
    }).catch(err => {
        if (!err.errors){return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
}

// Viser alle Ranks som finnes i databasen med tillhørende avatar
exports.indexAll = (req, res, next) => {

    Rank.findAll().then(async ranks => {

        if(!ranks || ranks.length === 0){return res.status(404).json(notFoundErr);}

        const jsonRanks = [];
        for (const rank of ranks){
            const avatars = await rank.getAvatars({ order: [['id', 'desc']], joinTableAttributes: []});
            const jsonRank = rank.toJSON();
            jsonRank.avatar = avatars[0];
            jsonRanks.push(jsonRank);
        }

        return res.json(new SuccRes('Ranks fetched', jsonRanks))
    }).catch(err => {
        if (!err.errors){return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
}

// Viser en ønsket avatar utifra de avatarene som bruker har låst opp
exports.show = (req, res, next) => {

    const avatarId = parseInt(req.params.id)

    Rank.findByPk(req.user.rank_id).then(async rank => {

        if(!rank || rank.length === 0){return res.status(404).json(notFoundErr);}

        const avatar = await rank.getAvatars({
            where: {id: avatarId },
            joinTableAttributes: [] // Fjerner jointable fra json
        });

        // Hvis rank ikke har ønsket avatar, så har man spurt om en avtar som ikke finnes eller ikke finnes i denne ranken
        if(!avatar || avatar.length === 0){
            return res.status(500).json(new ErrRes('Server error', [`Rank '${rank.name}' does not have that avatar`]))
        }

        return res.json(new SuccRes('Avatar fetched', avatar))
    }).catch(err => {
        if (!err.errors){return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })

}

