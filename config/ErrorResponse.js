class ErrorResponse{
    constructor(message, errors) {
        this.status = 'error';
        this.message = message;
        this.errors = errors;
    }
}

module.exports = ErrorResponse;