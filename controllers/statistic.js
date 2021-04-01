/**
 * @author Stian Helgerud
 * Kontroller som håndterer statisitkk
 * */

const {Op} = require("sequelize");
const { User, Avatar, Rank, Login, Answer, Exercise, User_exercise_stat, Difficulty_level } = require('../models')

/**
 * Returnerer all nødvendig data som skal vises på dashboard siden
 * */
exports.dashboard = async (req, res, next) => {

    // Henter først bruker og gjør den om til ett json objekt, så vi kan legge til elementer
    const user = await createUserWithStats(req.user);

    // Henter top 5 brukere
    const topFive = await User.findAll({
        order: [['score', 'desc']],
        limit: 5,
        include: [{model: Avatar, as: 'avatar'}, {model: Rank, as: 'rank'}],
        where: { verified: true }
    });

    // Henter ut den siste avataren
    const lastAvatar = await Avatar.findOne({order: [["id", "desc"]]})

    // Henter Oppgave statisitkk
    const exercisesStats = await createExercisesStats(req.user.id);

    // Henter Innlogginger
    const logins = await createLoginStats(req.user.id);

    // Henter data som skal vises i grafen
    const chart = await createChartData(req.user.id);

    return res.json({user, topFive, lastAvatar, exercisesStats, logins, chart});
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

    let nextRank = await Rank.findOne({where: { id: rank.id + 1 }});
    if(nextRank){
        const avatarUnlocked = await nextRank.getAvatars({ order: [['id', 'desc']], joinTableAttributes: []});
        nextRank = nextRank.toJSON();
        nextRank.avatarUnlocked = avatarUnlocked[0];
    }

    // Gjør om til json objekt
    const userJSON = user.toJSON();

    userJSON.placement = userPlacement;
    userJSON.avatar = avatar;
    userJSON.rank = rank;
    userJSON.nextRank = nextRank;

    return userJSON;
}

/**
 * Hjelpe funksjon som setter opp ett json objekt med statistikk egenskaper
 * @param userId -> Brukerens id
 * */
async function createExercisesStats(userId){
    const stats = await User_exercise_stat.findAll({ where: {user_id: userId} });

    if(!stats){ return null; }

    let completed = 0;
    let started = 0;

    stats.forEach(stat => {
        if(stat.completed){
            completed++;
        }else {
            started++;
        }
    });

    return {completed, started, total: stats.length};
}

/**
 * Hjelpe funksjon som setter opp ett json objekt med statistikk egenskaper
 * @param userId -> Brukerens id
 * */
async function createLoginStats(userId){
    const logins = await Login.findAll({ where: { user_id: userId } });
    if(!logins){ return null; } // Fant ingen inlogginger knyttet til bruker

    const dateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZone: 'utc',
        hour12: false,
    }
    const date = new Intl.DateTimeFormat('no-NO', dateOptions).format(logins[0].signed_in_at)

    return { firstLogin: date, totalLogins: logins.length };
}

/**
 * Hjelpe funksjon som setter opp ett json objekt med statistikk egenskaper
 * @param userId -> Brukerens id
 * */
async function createChartData(userId){
    let labels = await Difficulty_level.findAll();

    if (labels){
        labels = labels.map(diff => diff.name);
    }

    let data = await Answer.findAll({
        include: [{
            model: Exercise, as: 'exercise',
            include: [{model: Difficulty_level, as: 'difficulty_level'}]
        }]
    });

    return {labels, userData: [2,2,3,0,0] , averageData: [1,2,3,0,0]};
}
