const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../infraestructure/models/user');


router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local') ,(req, res) => {
    let token = jwt.sign({email: req.user.email}, "secretkey");
    
    res.setHeader('Set-Cookie', `token=${token}`);

    res.render('index');
});

router.post('/register', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let hash = crypto.createHash('sha256');
    const pwdHashed = hash.update(password).digest('base64');

    let user = new User({ email, password: pwdHashed });
    user.save();

    return res.send(user);
});

module.exports = router;