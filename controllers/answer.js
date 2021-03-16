/**
 * Kontroller som håndterer besvarelser
 * */

const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { Answer } = require('../models')
const { notFoundErr } = require('../config/validations')
const { onJsonAnswerRecived } = require('../utilities/gamification')
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

// Sjekker om besvarelse kan evalueres til completed, og eventulet oppdaterer databsen
exports.evaluate = (req, res, next) => {

    const answerId = parseInt(req.params.id);

    Answer.findOne({
        where: {id: answerId, user_id: req.user.id}
    }).then( async answer => {

        if(!answer || answer.length === 0){return res.status(404).json(notFoundErr);}

        if(!req.body.answer){res.status(404).json(new ErrRes('Not found', ['Request does not contain a JSON answer']))}

        answer.answer = req.body.answer;
        const resMessage = await onJsonAnswerRecived(req.user, answer); // Om alt går som det skal, så oppdaterer metoden databasen automatiks.

        if(resMessage.status === 'error'){
            return res.status(422).json(new ErrRes(resMessage.name, resMessage.message));
        }

        if(resMessage.status === 'success') {
            return res.json(new SuccRes(resMessage.name, resMessage.message));
        }

    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    }) // Fanger feil ved leting etter besvarelse
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




