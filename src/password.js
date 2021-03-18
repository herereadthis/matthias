const CryptoJS = require('crypto-js');
const fs = require('fs');
const yaml = require('js-yaml');

const seedPhrase = 'bomb shine fabric elephant still hip open cloth barrel orphan nut diet';

const privateKey = CryptoJS.SHA256(seedPhrase).toString();
console.log(`Private Key:\n${privateKey}`);


let keys;
try {
    let rawdata = fs.readFileSync('./src/secrets/dummy-keys.json');
    keys = JSON.parse(rawdata);
} catch (err) {
    console.error('could not read JSON file');
}

// Get document, or throw exception on error
let secret;
try {
    secret = yaml.load(fs.readFileSync('./src/secrets/secret.yml', 'utf8'));
} catch (err) {
    console.error(err);
}


/*
// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(keys), privateKey).toString();

console.log(ciphertext);

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, privateKey);
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
console.log(decryptedData);
*/


// Encrypt
var ciphertext2 = CryptoJS.AES.encrypt(JSON.stringify(secret), privateKey).toString();

console.log(ciphertext2);

// Decrypt
var bytes2  = CryptoJS.AES.decrypt(ciphertext2, privateKey);
var decryptedData2 = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8));
console.log(decryptedData2);
