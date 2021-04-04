/**
 * @author Stian Helgerud
 * Kontroller som håndterer statisitkk
 * */

const {Op} = require("sequelize");
const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const {achievementType} = require('../config/types')
const { User, Avatar, Rank, Login, Answer, Exercise, User_exercise_stat, Difficulty_level, Achievement, User_has_achievement } = require('../models')

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

    return res.json(new SuccRes("Dashboard stats fetched",{user, topFive, lastAvatar, exercisesStats, logins, chart})   );
}

/**
 * Returnerer all nødvendig informasjon for å vise achievements på profil siden
 * */
exports.achievements = async (req, res, next) => { // TODO Dokumenter i postman

    // Henter ut alle achievements
    const achievements = await Achievement.findAll();

    // henter ut all brukerns oppnådde achievements
    const userAchievements = await req.user.getAchievements({joinTableAttributes: ['reward_retrieved']});

    // Sjekker om bruker har låst opp noen nye achivements og oppretter en response objekt tabell
    const resObjectArr = await evaluateAchievements(achievements, userAchievements, req.user);

    return res.json(new SuccRes('Achievements updated and fetched', resObjectArr))
}

/**
 * Henter poeng for å fullføre en achivment
 * */
exports.retrieveReward = async (req, res, next) => { // TODO dokumneter i postman
    try{
        const user = req.user;
        const achi =  await Achievement.findByPk(req.params.id);

        if(!achi){ return res.status(404).json(new ErrRes('Not found', ['Achievement does not exist'])) }

        // Objekt som vet om bruker allerede har hentet ut poeng
        const achiJoin = await User_has_achievement.findOne({ where: {user_id: user.id, achievement_id: achi.id}});

        if(!achiJoin){ return res.status(422).json(new ErrRes('Validation Error', ['Achievements is not unlocked'])) }
        if(achiJoin.reward_retrieved){ return res.status(422).json(new ErrRes('Validation Error', ['Reward already retrieved'])) }

        // Oppdaterer brukers score
        user.score += achi.reward;

        // Sjekker om bruker har gått opp i rank
        const rank = await setRank(user);

        // Lagrer endringer i bruker
        await user.save();

        // Markerer att poengene er hentet ut fra achivment
        await User_has_achievement.update( {reward_retrieved: true} , { where: {user_id: user.id, achievement_id: achi.id} });

        // Bygger tilbakemeding til klient
        const resMessage = buildEvaluationResponse(user, achi, rank);

        // Returnerer resultat til klient
        return res.json(resMessage);
    }catch (err){
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    }

}

/***********************************************************************************************************************
 ***********************************************Hjelpe metoder**********************************************************
 **********************************************************************************************************************/

/**
 * Hjelpemetode som sjekker om brukeren har låst opp noen nye achievements
 * Og oppdaterer eventuelt databasen
 * @param allAchi -> Alle achivements i databasen
 * @param userAchi -> Alle achivements som brukeren har låst opp
 * @param user -> bruker
 * returns JavaScript objekt tabell som inneholder alle Achievements med egenskaper som forteller om den er låst,
 * låst opp (uten å ha hentet poeng) eller låst opp (og poeng er hentet ut)
 * */
async function evaluateAchievements(allAchi, userAchi, user){
    const resArr = [];
    const unlocked = new Map();
    userAchi.forEach(achi => { unlocked.set(achi.id, achi) });

    // Går gjennom tabell med alle achivments og sjekker de som ikke er låst opp
    for (const achi of allAchi) {
        if(unlocked.has(achi.id)){ // Achivment er låst opp allerede
            const unlockedAchi = unlocked.get(achi.id).toJSON();

            // Sjekker om poegn allerede er hentet ut
            // TODO Her burde det gått å hentet ut verdi fra unlockedAchi, men det ser ikke ut til å fungere, så her kommer en "unødvendig", men nødvendig spørring
            let reward_retrieved = await User_has_achievement.findOne({ where: {user_id: user.id, achievement_id: achi.id}});
            if(reward_retrieved === null || reward_retrieved === undefined) { reward_retrieved = false }else {
                reward_retrieved = reward_retrieved.reward_retrieved;
            }

            let done = 0; // Hvor mye brukeren har gjort på achivmentetn
            if(achi.type === achievementType.COMPLETED_EXERCISES){
                done = await User_exercise_stat.count({where: { user_id: user.id, completed: true }});
            }
            if (achi.type === achievementType.WITHOUT_CHECK){
                done = await Answer.count({where: { user_id: user.id, submitted: true, times_checked: 0 }});
            }

            resArr.push({...unlockedAchi, done: Number.isInteger(done) ? done : 0, unlocked: true, reward_retrieved, user_has_achievements: undefined})
        }else {
            // Sjekker om achivment har blitt fullført
            const checkedAchi = await checkAchievement(achi, user);
            resArr.push(checkedAchi);
        }
    }

    return resArr;
}

/**
 * Hjelpemetod som sjekker om en achivment er blitt fullført
 * Oppdaterer også databasen
 * @param achi -> Achivment som skal sjekkes
 * @param user -> bruker
 * returns JavaScript achivment objekt som inneholder  egenskaper som forteller om den er låst,
 * låst opp (uten å ha hentet poeng) eller låst opp (og poeng er hentet ut)
 * */
async function checkAchievement(achi, user){
    const type = achi.type;

    if (type === achievementType.COMPLETED_EXERCISES){
        const exercisesCompleted = await User_exercise_stat.count({where: { user_id: user.id, completed: true }});
        const achievementUnlocked = exercisesCompleted >= achi.condition;
        if(achievementUnlocked){ // Oppdaterer database
            await user.addAchievement(achi);
        }
        return {...achi.toJSON(), done: Number.isInteger(exercisesCompleted) ? exercisesCompleted : 0 , unlocked: achievementUnlocked, reward_retrieved: false};
    }

    if (type === achievementType.WITHOUT_CHECK){
        const exercisesCompletedWithoutCheck = await Answer.count({where: { user_id: user.id, submitted: true, times_checked: 0 }});
        const achievementUnlocked = exercisesCompletedWithoutCheck >= achi.condition;
        if(achievementUnlocked){ // Oppdaterer database
            await user.addAchievement(achi);
        }
        return {...achi.toJSON(), done: Number.isInteger(exercisesCompletedWithoutCheck) ? exercisesCompletedWithoutCheck : 0 , unlocked: achievementUnlocked, reward_retrieved: false};
    }

    return null;
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
    if(!logins || logins.length === 0){ return null; } // Fant ingen inlogginger knyttet til bruker

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

    // Tabell som inneholder en tablell for hver vanklighetsgrad med da om hvor mange ganger noen har trykker sjekk
    const averageData = new Array(labels.length);
    const userData = new Array(labels.length);

    // Fyller tabell med data
    data.forEach(answer => {
        const idx = answer.exercise.difficulty_level.id - 1;
        const timesChecked = answer.times_checked;
        if(!averageData[idx]){
            averageData[idx] = [];
            averageData[idx].push(timesChecked);
        }else {
            averageData[idx].push(timesChecked);
        }

        // Hvis denne besvarelsen også er brukern sin, så tar vi det med i egen tabell
        if (answer.user_id === userId){
            if(!userData[idx]){
                userData[idx] = [];
                userData[idx].push(timesChecked);
            }else {
                userData.push(timesChecked);
            }
        }

    });

    // tabeller som skal returneres
    const averageDataReturn = new Array(averageData.length);
    const userDataReturn = new Array(averageData.length);

    for (let i = 0 ; i < averageData.length; i++){

        if (!averageData[i]){ break ; }

        let sum = 0;
        let total = averageData[i].length;
        averageData[i].forEach(num => {
            sum += num;
        })

        // Legger til gjennomsnittet i retur tabell
        averageDataReturn[i] = sum / total;
    }

    for (let i = 0 ; i < userData.length; i++){

        if (!userData[i]){ break ; }

        let sum = 0;
        let total = userData[i].length;
        userData[i].forEach(num => {
            sum += num;
        })

        // Legger til gjennomsnittet i retur tabell
        userDataReturn[i] = sum / total;
    }

    return {labels, userData: userDataReturn , averageData: averageDataReturn };
}

/**
 * Funksjon som oppdaterer ranken til en bruker
 * Obs! Bruker må ha fått ny score før denne funksjonen kalles
 * @param user -> User model objekt
 * returns boolean -> Om bruker har gått opp i rank eller ikke
 * */
setRank = async (user) => {
    const oldRank = user.rank_id;
    const newRank = await Rank.findOne({
        where: { points_required: { [Op.lte] : user.score }},
        order: [['id', 'desc']]
    })

    user.rank_id = newRank.id;

    let avatars = null;

    // Henter nyeste avatar, hvis bruker har godt opp i rank
    if(oldRank !== newRank.id){
        avatars = await newRank.getAvatars({order: [['id', 'desc']], joinTableAttributes: []});
    }

    return {
        rankUp: oldRank !== newRank.id,
        avatars: avatars,
        newRank: oldRank !== newRank.id ? newRank : null
    } ;
}

/**
 * Funksjon som bygger opp tilbakemelding til klienten
 * @param user -> User model objekt
 * @param achi -> Achivment
 * @param rank -> js objekt som inneholder info on bruker har gått opp i rank
 * */
buildEvaluationResponse = (user, achi, rank) =>{
    const resMessage = {status: 'success', name: 'Evaluation succeeded', data: {}}; // Objekt som skal returneres til klient med nyttig status melding

    resMessage.data = {
        rewardRetrieved: achi.reward,
        rankUp: rank.rankUp,
        avatars: rank.avatars,
        newRank: rank.newRank
    }


    return new SuccRes(resMessage.name, resMessage.data);
}