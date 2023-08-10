const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const salt =  await bcrypt.genSalt()
    return bcrypt.hashSync(password, salt)
}

function comparePassword(raw, hashed) {
    return bcrypt.compareSync(raw, hashed)
}

module.exports = {
    hashPassword,
    comparePassword
}