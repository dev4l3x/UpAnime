const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CookieStrategy = require('passport-cookie').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../infraestructure/schemas/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('./../../infraestructure/configuration-manager');

const secret_key = config.getConfig('SECRET_KEY') ?? 'secretkey'; 

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret_key, 
}

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

    passport.use(new JwtStrategy(opts, async function(jwtPayload, done){
        const user = await User.findOne({email: jwtPayload.email});
        if(!user){
            done(null, false);
        }

        done(null, user);
    }))
    

    passport.use(new CookieStrategy(
        async function(token, done){
            let decodedToken = jwt.verify(token, 'secretkey');
            
            if(decodedToken){
                let user = await User.findOne({email: decodedToken.email});
                if(!user){
                    return done(null, false);
                }
                done(null, user);
            }
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}