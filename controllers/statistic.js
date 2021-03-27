/**
 * @author Stian Helgerud
 * Kontroller som håndterer statisitkk
 * */

const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const {Op} = require("sequelize");
const { User, Avatar, Rank } = require('../models')

/**
 * Returnerer all nødvendig data som skal vises på dashboard siden
 * */
exports.dashboard = async (req, res, next) => {

    // Henter først bruker og gjør den om til ett json objekt, så vi kan legge til elementer
    const user = await createUserWithStats(req.user);

    // Henter top 3 brukere
    const topThree = await User.findAll({
        order: [['score', 'desc']],
        limit: 3,
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}],
        where: { verified: true }
    });


    return res.json({user, topThree});
}

/**
 * Hjelpemetode som setter opp ett json objekt med statistikk egenskaper
 * @param user -> User model objekt
 * returns json user objekt
 */
async function createUserWithStats(user){
    // Finner rangeringen til brukern
    const userPlacement = await User.count({
        where: { score: { [Op.gt] : user.score }, verified: true},
    }) + 1;

    // Henter ut rank og avatar
    const rank = await user.getRank();
    const avatar = await user.getAvatar();

    // Henter ut neste rank bruker kan låse opp
    const nextRank = await Rank.findOne({where: { id: rank.id + 1 }});

    // Gjør om til json objekt
    const userJSON = user.toJSON();

    userJSON.placement = userPlacement;
    userJSON.avatar = avatar;
    userJSON.rank = rank;
    userJSON.nextRank = nextRank;

    return userJSON;
}
