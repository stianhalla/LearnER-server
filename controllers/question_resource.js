const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { Quiz_question_has_resource, Db_quiz_resource } = require('../models')


exports.index = (req, res, next) => {
    const quesId = parseInt(req.params.question_id)
    Quiz_question_has_resource.findAll({
        include: [{model:Db_quiz_resource, as: 'resource', attributes: ['title', 'text']}],
        where: {question_id: quesId},
        }).then(resource => {
        if(!resource || resource.length === 0){return res.status(404).json(new ErrRes('Not Found',['Cannot find question']));}

        return res.json(new SuccRes('Question fetched', resource))
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
}

exports.show = (req, res, next) => {

}