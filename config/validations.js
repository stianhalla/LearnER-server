/**
 * Her kan man endre teksten på validerings melllinger.
 * */
const {userType, notation} = require('./types')

// Validerings tekster (for built in validation msg felt)
module.exports.notNullMsg = 'Field cannot be null';
module.exports.notEmptyMsg = 'Field cannot be empty';
module.exports.isEmailMsg = 'Email must be a valid email';
module.exports.isIntMsg = 'Field must be of type Integer';
module.exports.isDateMsg = 'Date must be in correct format';
module.exports.lenMsg = 'Field input must fall within specified range';
module.exports.lenPwdMsg = 'Password needs to be at least 8 characters';

// Egendefinerete valideringer
module.exports.isNotation = (val) => {
    if( ![notation.ER, notation.UML, notation.SIMPLIFIED_ER].includes(val) ){
        throw new Error(`Wrong value for user type, valid values is ${notation.ER}, ${notation.UML} and ${notation.SIMPLIFIED_ER} `)
    }
}
module.exports.isUserType = (val) => {
    if( ![userType.STUDENT, userType.TEACHER].includes(val) ){
        throw new Error(`Wrong value for user type, valid values is ${userType.STUDENT} and ${userType.TEACHER}`)
    }
}
module.exports.isBoolean = (val) => {
    if(typeof val !== 'boolean'){
        throw new Error('Only boolean values are allowed')
    }
}
module.exports.isJSON = (val) => {
    // TODO
}
module.exports.isUsername = (val) => {
    if(val.toString().length > 32){
        throw new Error('Maximum 32 characters allowed in username')
    }
    if(val.toString().length < 2){
        throw new Error('Minimum 2 characters allowed in username')
    }
}
