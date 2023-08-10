const passport = require("passport")
const {Strategy} = require("passport-local")
const User = require("../database/Schemas/User")
const {comparePassword} = require("../utils/helpers")


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
        try {
            const user = await User.findById(id);
            done(null, user)
        } catch (error) {
            console.log(error);
        }
  });


passport.use(new Strategy({
    usernameField: 'email',
}, async (username, password,done) => {
    try {
        if (!username || !password) throw new Error("Fields Not Complete")
        const user = await User.findOne({ email: `${username}` })
        // console.log(user);
        if (!user) throw new Error("User not found")
        const isVerified = comparePassword(password, user.password)
        if (!isVerified) done(new Error("not verified"), null)
        else {
            done(null, user)
        }
    } catch (error) {
        console.log(error);
    }

}))