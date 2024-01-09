const crypto = require('crypto');

function generateHash(secret, salt = '') {
    return crypto.pbkdf2Sync(secret, salt, 10000, 64, 'sha512').toString('hex');
}

function getPasswordHash(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = generateHash(password, salt);
    return { hash, salt }
}

module.exports = {
    getPasswordHash,
    generateHash,
};