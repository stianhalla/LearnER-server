/**
 * @author Stian Helgerud
 * Klasse som brukes til å sende success respons til klient
 * */

class SuccessResponse{
    constructor(message, data) {
         this.status = 'success';
         this.message = message;
         this.data = data;
    }
}

module.exports = SuccessResponse;