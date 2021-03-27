/**
 * @author Stian Helgerud
 * Klasse som brukes til å sende error respons til klient
 * */

class ErrorResponse{
    constructor(message, errors) {
        this.status = 'error';
        this.message = message;
        this.errors = errors;
    }
}

module.exports = ErrorResponse;