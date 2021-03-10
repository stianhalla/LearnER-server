
const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { Db_quiz_alternative } = require('../models')


exports.index = (req, res, next) => {
    const altId = parseInt(req.params.question_id)
    Db_quiz_alternative.findAll({
        where: {question_id: altId},
    }).then(alternative =>{
        if(!alternative || alternative.length === 0){return res.status(404).json(new ErrRes('Not Found',['Cannot find question']));}

        return res.json(new SuccRes('Question fetched', alternative))
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
}

exports.show = (req, res, next) => {

}