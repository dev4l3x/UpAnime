const express = require('express');
const router = express.Router();

const pug = require('pug');
const passport = require('passport');
router.get('/', passport.authenticate('cookie', {failureRedirect: '/login'}), (req, res) => {
    res.render('index', { title: 'Hey', message: `Welcome ${req.user.email}` });
});

module.exports = router;