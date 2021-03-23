
const ReceiverService = require('./infraestructure/rabbitmqReceiverService');
const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost:27017/animenotifier', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err)
        throw err;
    console.log(`Connected to MongoDB`);
});

const app = express();
const port = 3000;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    tags: []
});

const User = mongoose.model('User', UserSchema);

const receiver = new ReceiverService();

receiver.on((message) => {
    console.log(message);

});

app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.send('Hello world');
});

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

app.post('/login', passport.authenticate('local') ,(req, res) => {
    let token = jwt.sign({email: req.user.email}, "secretkey");
    
    res.send({ 
        access_token: token, 
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    });
});

app.post('/register', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let hash = crypto.createHash('sha256');
    const pwdHashed = hash.update(password).digest('base64');

    let user = new User({ email, password: pwdHashed });
    user.save();

    return res.send(user);
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

process.on('uncaughtException', (err, origin) => {
    console.log('Error', err);
})
