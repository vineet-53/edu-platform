const bcrypt = require("bcrypt")
exports.passwordHash = async (password, saltRounds) => {
    try {
        return await bcrypt.hash(password, saltRounds)
    }
    catch (err) {
        console.error("error hashing password")
        throw err.message
    }
}