/**
 * @author Stian Helgerud
 * Kontroller som håndterer besvarelser
 * */

const { Op } = require("sequelize")
const { onExerciseCompleted } = require('../utilities/statistic')
const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { Answer, Exercise, Difficulty_level, Rank } = require('../models')
const { notFoundErr } = require('../config/validations')
const { onAnswerCreated } = require('../utilities/statistic')

// Henter alle besvarelsene til innlogget bruker
exports.index = (req, res, next) => {
    Answer.findAll({
        where: {user_id: req.user.id}
    }).then(answers => {
        if(!answers || answers.length === 0){return res.status(404).json(new ErrRes('Not Found',['You don not have any answers yet']));}

        return res.json(new SuccRes('Answers fetched', answers));
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
}

// Henter en gitt besvarelse til innlogget bruker
exports.show = (req, res, next) => {
    const answerId = parseInt(req.params.id)
    Answer.findOne({
        where: { user_id: req.user.id, id: answerId}
    }).then(answer => {
        if(!answer || answer.length === 0){return res.status(404).json(new ErrRes('Not Found',['Cannot find answer']));}

        return res.json(new SuccRes('Answer fetched', answer));
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
}

// Henter den siste besvarelsen til en bruker ved gitt besvarelse
exports.showByExerciseId = (req, res, next) => {
    const exerciseId = parseInt(req.params.exercise_id)
    Answer.findOne({
        order: [
            ['id', 'DESC'],
        ],
        where: { user_id: req.user.id, exercise_id: exerciseId}
    }).then(answer => {
        if(!answer || answer.length === 0){return res.status(404).json(new ErrRes('Not Found',['Cannot find answer']));}

        return res.json(new SuccRes('Answer fetched', answer));
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
}

// Oppretter en besvarelse tilknyttet innlogget bruker
exports.create = (req, res, next) => {

    const reqBody = {
        answer: req.body.answer,
        exercise_id: req.body.exercise_id,
        user_id : req.user.id,
        with_help: req.body.with_help
    }

    Answer.create(reqBody).then( async answer => {
        if(!answer || answer.length === 0){return res.status(404).json(notFoundErr);}
        
        await onAnswerCreated(answer); // Incrementer antall forsøk i statisikk tabell

        return res.json(new SuccRes('Answer created', answer));
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
}

// Sjekker besvaresle og markerer besvarelse om levert, låser opp ranks hvis bruker går opp i rank
exports.evaluate = async (req, res, next) => {

    try{
        const user = req.user;
        const answer = req.body;
        answer.points = Math.round(answer.points); // Forsikring om att poengene er av typen integer

        const exercise = await Exercise.findOne({
            where: {id: answer.exercise_id},
            include: [{model: Difficulty_level, as: 'difficulty_level'}]
        });
        const maxPoints = exercise.extra_points + exercise.difficulty_level.points;

        // Sjekker etter fusk
        if(answer.points > maxPoints){ // Hvis poengene fra klienten er mer enn det er mulig å få på oppgaven, så er det noe galt
            return res.status(422).json(new ErrRes("Evaluation failed", ["Evaluation failed because your points are grater then the maximum possible points on this exercise"]));
        }

        if (answer.points < 0){
            return res.status(422).json(new ErrRes("Evaluation failed", ["Evaluation failed because your points are negative"]))
        }

        if(answer.user_id !== parseInt(req.user.id)){ // Forsåk på å evaluere besvarelsen til noen andre
            return res.status(422).json(new ErrRes("Evaluation failed", ["You can't evaluate a answer that is not yours"]));
        }

        // Oppdaterer brukers score
        user.score += answer.points;

        // Sjekker om bruker har gått opp i rank
        const rank = await setRank(user);

        // Lagrer endringer i bruker
        await user.save();

        // Markerer besvarelsen som levert og lagrer besvarelsen i databsen
        await Answer.update({...answer, submitted: true}, {where: {id: answer.id}})

        // Setter completed til true og completed_at til nå i statistikk tabell
        await onExerciseCompleted(answer);

        // Bygger tilbakemeding til klient
        const resMessage = buildEvaluationResponse(user, answer, maxPoints, rank );

        // Returnerer resultat til klient
        return res.json(resMessage);
    }catch (err){
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    }

}

// Fjerner valgt besvarelse tilknyttet inlogget bruker 
exports.destroy = (req, res, next) => {
    const answerId = parseInt(req.params.id);

    Answer.findOne({
        where: { id: answerId, user_id: req.user.id }
    }).then(async answer => {

        if(!answer || answer.length === 0){return res.status(404).json(notFoundErr);}

        // Slettter besvarelse
        await answer.destroy();
        return res.json(new SuccRes('Answer deleted', null))

    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    }) // // Fanger feil ved leting etter besvarelse

}

// Lager gitt JSON besvarelse i db
exports.save = (req, res, next) => {

    const answerId = parseInt(req.params.id);

    Answer.findOne({
        where: {id: answerId, user_id: req.user.id}
    }).then( async answer => {

        if(!answer || answer.length === 0){return res.status(404).json(notFoundErr);}

        const reqBody = {
            answer: req.body.answer,
            progression: parseInt(req.body.progression),
            points: parseInt(req.body.points),
            penalty_recived: parseInt(req.body.penalty_recived),
            hint_used: req.body.hint_used, // TODO Ingen funksjonalitet ennå
            times_checked: parseInt(req.body.times_checked)
        };

        // Lager json besvarelse
        const updatedAnswer = await answer.update(reqBody)
        return res.json(new SuccRes('Answer updated', updatedAnswer))

    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    }) // Fanger feil
}

// Oppdaterer hint_used eller inkrementerer times_checked
exports.update = (req, res, next) => {

    const answerId = parseInt(req.params.id);

    Answer.findOne({
        where: {id: answerId, user_id: req.user.id}
    }).then( async answer => {

        if(!answer || answer.length === 0){return res.status(404).json(notFoundErr);}

        let times_checked = answer.times_checked;
        let hint_used = answer.hint_used;

        if(req.body.hint_cliked){
            hint_used = true;
        }
        if(req.body.check_cliked){
            times_checked += 1;
        }

        const reqBody = {
            times_checked,
            hint_used
        };

        // Oppdatere besvarelse
        const updatedAnswer = await answer.update(reqBody);
        return res.json(new SuccRes('Answer updated', updatedAnswer))

    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    }) // Fanger feil
}

/***********************************************************************************************************************
 ***********************************************Hjelpe metoder**********************************************************
 **********************************************************************************************************************/

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
 * @param answer -> Answer js objekt
 * @param maxPoints -> maksimalt mulige poeng på oppgaven
 * @param rank -> js objekt som inneholder info on bruker har gått opp i rank
 * */
buildEvaluationResponse = (user, answer, maxPoints, rank) =>{
    const resMessage = {status: 'success', name: 'Evaluation succeeded', data: {}}; // Objekt som skal returneres til klient med nyttig status melding

    resMessage.data = {
        maximumPoints: maxPoints,
        yourPoints: answer.points,
        penalty: answer.penalty_recived,
        timesChecked: answer.times_checked,
        hintUsed: answer.hint_used, // Ikke i bruk ennå
        rankUp: rank.rankUp,
        avatars: rank.avatars,
        newRank: rank.newRank,
        newUserScore: user.score
    }


    return new SuccRes(resMessage.name, resMessage.data);
}





