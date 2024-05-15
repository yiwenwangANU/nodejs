const crypto = require('crypto');


function generateRandomBytes(size) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(size, (err, buffer) => {
            if(err) reject(err);
            else resolve(buffer.toString('hex'));
        })
    })
}

module.exports = generateRandomBytes;