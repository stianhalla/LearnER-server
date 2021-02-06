/**
 * Kontroller som håndterer besvarelser
 * */

const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { Answer } = require('../models')
const { notFoundErr } = require('../config/validations')
const { beforeAnswerUpdate } = require('../utilities/gamification')
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

// Oppdaterer valgt besvarelse tilknyttet innlogget buker
exports.update = (req, res, next) => {

    const answerId = parseInt(req.params.id);

    Answer.findOne({
        where: {id: answerId, user_id: req.user.id}
    }).then( async answer => {

        if(!answer || answer.length === 0){return res.status(404).json(notFoundErr);}

        let times_checked = answer.times_checked;
        let hint_used = answer.hint_used

        if(req.body.hint_cliked){
            hint_used = true;
        }
        if(req.body.check_cliked){
            times_checked += 1;
        }

        const reqBody = {
            answer: req.body.answer,
            times_checked,
            hint_used
        }

        // Oppdaterer tabeller knyttet til spill logikk
        if(req.body.answer){ // Kun hvis requesten inneholder json besvarelse
            const start = new Date();
            await beforeAnswerUpdate(req.user, answer);
            const end = new Date();
            console.log("Tid for spill logikk: ", end - start , "ms");
        }

        // Oppdatere besvarelse
        const updatedAnswer = await answer.update(reqBody)
        return res.json(new SuccRes('Answer updated', updatedAnswer))


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




