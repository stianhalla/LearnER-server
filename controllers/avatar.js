/**
 * Kontroller som håndterer avatarer
 * */

const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { Avatar, Rank } = require('../models')

// Viser alle avatarer som bruker har låst opp
exports.index = (req, res, next) => {

    Rank.findByPk(req.user.rank_id).then(async rank => {
        const avatars = await rank.getAvatars({
            joinTableAttributes: [] // Fjerner jointable fra json
        });

        // Hvis rank ikke kan kobles til noe avatar, så er det noe galt
        if(!avatars || avatars.length === 0){
            return res.status(500).json(new ErrRes('Server error', [`Rank '${rank.name}' dos not have any avatars`]))
        }

        return res.json(new SuccRes('Avatars fetched', avatars))
    }).catch(err => {
        if (!err.errors) return res.status(500).json(new ErrRes(err.name, [err.message]))
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
    })
}

// Viser en ønsket avatar utifra de avatarene som bruker har låst opp
exports.show = (req, res, next) => {
    const candidateId = parseInt(req.params.id)

    Rank.findByPk(req.user.rank_id).then(async rank => {
        const avatar = await rank.getAvatars({
            where: {id: candidateId },
            joinTableAttributes: [] // Fjerner jointable fra json
        });

        // Hvis rank ikke har ønsket avatar, så har man spurt om en avtar som ikke finnes eller ikke finnes i denne ranken
        if(!avatar || avatar.length === 0){
            return res.status(500).json(new ErrRes('Server error', [`Rank '${rank.name}' does not have that avatar`]))
        }

        return res.json(new SuccRes('Avatar fetched', avatar))
    }).catch(err => {
        if (!err.errors) return res.status(500).json(new ErrRes(err.name, [err.message]))
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
    })

}

