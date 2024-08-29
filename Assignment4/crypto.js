const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');


function encryptString(text, password) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return { encrypted, iv: iv.toString('hex') };
}


function decryptString(encryptedText, ivHex, password) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}


function generateUUID() {
    return uuidv4();
}


const password = 'password123';
const textToEncrypt = 'Hello, Good Morning';
const { encrypted, iv } = encryptString(textToEncrypt, password);
console.log('Encrypted:', encrypted);
console.log('Decrypted:', decryptString(encrypted, iv, password));
console.log('Random UUID:', generateUUID());
