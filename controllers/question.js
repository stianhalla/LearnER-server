const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { Db_quiz_question, Db_quiz_alternative } = require('../models')


exports.index = (req, res, next) => {
    const chapterId = parseInt(req.params.chapter_id)
    Db_quiz_question.findAll({
        include: [{
           model: Db_quiz_alternative,
           required: true
        }],
        where: {chapter_id: chapterId},
    }).then(question =>{
        if(!question || question.length === 0){return res.status(404).json(new ErrRes('Not Found',['Cannot find question']));}

        return res.json(new SuccRes('Question fetched', question))
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
};