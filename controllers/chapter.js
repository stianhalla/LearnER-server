const ErrRes = require('../config/ErrorResponse');
const SuccRes = require('../config/SuccessResponse');
const { Db_quiz_chapter} = require('../models');


exports.index = (req, res, next) => {
    const noe = parseInt(req.params.id)
    Db_quiz_chapter.findAll({raw: true, nest: true }).then(chapter => {
    if(!chapter || chapter.length === 0){return res.status(404).json(new ErrRes('Not Found', ['Cannot find any chapters']));}

    return res.json(new SuccRes('Chapters fetched', chapter))
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
};

exports.show = (req, res, next) => {
    Db_quiz_chapter.findOne({
        where: { id: req.params.id }
    }).then(chapter => {

        if(!chapter || chapter.length === 0){return res.status(404).json(new ErrRes('Not Found',['Cannot find exercise']));}

        return res.json(new SuccRes('Exercise fetched', chapter))
    }).catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(err.name,err.errors.map(error => error.message)));
    })
};