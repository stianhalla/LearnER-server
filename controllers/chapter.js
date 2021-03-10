const ErrRes = require('../config/ErrorResponse')
const SuccRes = require('../config/SuccessResponse')
const { User } = require('../models')


exports.index = (req, res, next) => {

}

exports.show = (req, res, next) => {

}

/*
catch metode :
.catch(err => {
        if (!err.errors) {return res.status(500).json(new ErrRes(err.name, [err.message]));}
        return res.status(422).json(new ErrRes(
            err.name,
            err.errors.map(error => error.message)
        ))
    })

hvis ikke funnet:
if(!answers || answers.length === 0){
            return res.status(404).json(new ErrRes(
                'Not Found',
                ['You don not have any answers yet']
            ))
        }
*/