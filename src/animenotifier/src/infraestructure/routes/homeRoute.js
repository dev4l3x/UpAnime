const express = require('express');
const router = express.Router();

const pug = require('pug');
const passport = require('passport');
router.get('/', passport.authenticate('cookie'), (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});

module.exports = router;