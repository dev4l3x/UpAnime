const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const crypto = require('crypto');

module.exports = function(){
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async function(username, password, done){
            let user = await User.findOne({email: username});
            if(!user){
                return done(user);
            }
    
            let hash = crypto.createHash('sha256');
            const pwdHashed = hash.update(password).digest('base64');
    
            if(pwdHashed !== user.password){
                return done(null, false);
            }
    
            return done(null, user);
    
        }
    ));
    
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}