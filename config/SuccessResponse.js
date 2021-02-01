class SuccessResponse{
    constructor(message, data) {
         this.status = 'success';
         this.message = message;
         this.data = data;
    }
}

module.exports = SuccessResponse;