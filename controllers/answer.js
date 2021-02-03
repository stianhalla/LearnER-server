/**
 * Kontroller som håndterer besvarelser
 * */
const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { Answer, User } = require('../models')

// Henter alle besvarelsene til innlogget bruker
exports.index = (req, res, next) => {
    Answer.findAll({
        where: {user_id: req.user.id}
    }).then(answers => {
        if(!answers || answers.length === 0){
            return res.status(404).json(new ErrRes(
                'Not Found',
                ['You don not have any answers yet']
            ))
        }
        return res.json(new SuccRes('Answers fetched', answers))
    }).catch(err => {
        if (!err.errors) return res.status(500).json(new ErrRes(err.name, [err.message]))
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
    })
}

// Henter en gitt besvarelse til innlogget bruker
exports.show = (req, res, next) => {
    const candidateId = parseInt(req.params.id)
    Answer.findOne({
        where: { user_id: req.user.id, id: candidateId}
    }).then(answer => {
        if (!answer) {
            return res.status(404).json(new ErrRes(
                'Not Found',
                ['Can not find answer']
            ))
        }
        return res.json(new SuccRes('Answer fetched', answer))
    }).catch(err => {
        if (!err.errors) return res.status(500).json(new ErrRes(err.name, [err.message]))
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
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

    Answer.create(reqBody).then(answer => {
        // TODO Oppdater eller opprett rad i user_exercise_stats (øk attempts til 1)
        return res.json(new SuccRes('Answer created', answer))
    }).catch(err => {
        if (!err.errors) return res.status(500).json(new ErrRes(err.name, [err.message]))
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
    })
}

// Oppdaterer valgt besvarelse tilknyttet innlogget buker
exports.update = (req, res, next) => {
    const candidateId = parseInt(req.params.id);

    Answer.findOne({
        where: {id: candidateId, user_id: req.user.id}
    }).then( async answer => {
        if(!answer){
            return res.sendStatus(401)
        }

        let times_checked = answer.times_checked;
        let hint_used = answer.hint_used

        if(req.body.hint_cliked){
            hint_used = true;
        }
        if(req.body.check_cliked){
            times_checked += 1;
        }

        // TODO Øk progression (0 - 100%)
        // TODO Sjekk og øk penalty_recived
        // TODO Beregn poeng når progression === 100% (oppgaven er løst)
        // TODO Sett til completed i user_exercise_stats og set completed_at til nå


        const reqBody = {
            answer: req.body.answer,
            times_checked,
            hint_used
        }

        const updatedAnswer = await answer.update(reqBody)

        return res.json(new SuccRes('Answer updated', updatedAnswer))
    }).catch(err => {
        if (!err.errors) return res.status(500).json(new ErrRes(err.name, [err.message]))
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
    })
}

// Fjerner valgt besvarelse tilknyttet inlogget bruker 
exports.destroy = (req, res, next) => {
    const candidateId = parseInt(req.params.id);

    Answer.findOne({
        where: { id: candidateId, user_id: req.user.id }
    }).then(async answer => {
        if(!answer){
            return res.sendStatus(401);
        }

        await answer.destroy();
        return res.json(new SuccRes('Answer deleted', null))

    }).catch(err => {
        if (!err.errors) return res.status(500).json(new ErrRes(err.name, [err.message]))
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
    })

}



