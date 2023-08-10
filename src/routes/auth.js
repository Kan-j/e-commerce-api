const { Router, response } = require('express')
const User = require("../database/Schemas/User")
const {hashPassword} = require('../utils/helpers')
const passport = require("passport")

const authRouter = Router()

require("../Strategy/local")

authRouter.post("/login", passport.authenticate('local'), (request, response) => {
    response.send("Logged In")
})


authRouter.post("/register", async (request, response) => {
    const { username, email } = request.body
    if (!username || !email) return response.send(401)
    try {
        const user = await User.findOne({ email })
        if (user) return response.send(401)
        else {
            const password = await hashPassword(request.body.password)
            console.log(password);
            const user = await User.create({username, password, email})
        }
    } catch (error) {
        console.log(error);
    }

    response.send(`${username}   ${email} `)
})

module.exports = authRouter