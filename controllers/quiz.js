const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { Rank } = require('../models')
const {Op} = require("sequelize");

// Henter ut poegn fra en quiz
exports.submit = async (req, res, next) => {
    const user = req.user;
    const points = req.body.points;

    // Hvor mange poeng det maksimalt er mulig å få på en quiz
    const maxPoints = 2000; // TODO Her må du endre Ale :)

    // Sjekker etter fusk
    if (points > maxPoints){
        return res.status(422).json(new ErrRes(
            "Validation error",
            [`It is not possible to get ${req.body.points}!`]
        ))
    }

    // Oppdaterer brukers score
    user.score += points;

    // Sjekker om bruker har gått opp i rank
    await updateRank(user);

    // Lagrer endringer i bruker
    const updatedUser = await user.save();

    return res.json(new SuccRes("User updated", {updatedUser, pointsReceived: points}));
}

/**
 * Funksjon som oppdaterer ranken til en bruker
 * Obs! Bruker må ha fått ny score før denne funksjonen kalles
 * @param user -> User model objekt
 * returns boolean -> Om bruker har gått opp i rank eller ikke
 * */
updateRank = async (user) => {

    const newRank = await Rank.findOne({
        where: { points_required: { [Op.lte] : user.score }},
        order: [['id', 'desc']]
    })

    user.rank_id = newRank.id;
}