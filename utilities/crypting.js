/**
 * @author Espen Helgerud
 * Brukes til å kryptere fasit
 */

exports.encrypt = (input) => {
    const NUMBER_OF_SHIFTS = 1;

    if(typeof input !== 'string')
        input = JSON.stringify(input);

    let encryptedString = '';
    if (input.length === 0) return encryptedString;

    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i) + NUMBER_OF_SHIFTS;
        encryptedString  +=  String.fromCharCode(charCode);
    }
    return encryptedString;
};


// Blir brukt på klient siden
function decrypt(encryptedString) {
    const NUMBER_OF_SHIFTS = 1;

    let decryptedString = '';
    if (encryptedString.length === 0) return decryptedString;

    for (let i = 0; i < encryptedString.length; i++) {
        const charCode   = encryptedString.charCodeAt(i) - NUMBER_OF_SHIFTS;
        decryptedString  = decryptedString += String.fromCharCode(charCode);
    }

    return decryptedString;
}
