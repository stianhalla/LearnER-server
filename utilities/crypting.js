/**
 * @author Espen Helgerud
 * Brukes til å kryptere fasit
 */

exports.encrypt = (input) => {
    const KEY = 42;

    if(typeof input !== 'string')
        input = JSON.stringify(input);

    let encryptedString = '';
    if (input.length === 0) return encryptedString;

    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i) + KEY;
        encryptedString  +=  String.fromCharCode(charCode);
    }
    return encryptedString;
};


// Blir brukt på klient siden
function decrypt(encryptedString) {
    const KEY = 42;

    let decryptedString = '';
    if (encryptedString.length === 0) return decryptedString;

    for (let i = 0; i < encryptedString.length; i++) {
        const charCode   = encryptedString.charCodeAt(i) - KEY;
        decryptedString  = decryptedString += String.fromCharCode(charCode);
    }

    return decryptedString;
}
