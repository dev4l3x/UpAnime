const express = require('express');
const passport = require('passport');
const User = require('../../infraestructure/schemas/user');
const router = express.Router();

router.get('/tags', passport.authenticate('jwt'), (req, res) => {
    res.send(req.user.tags);
});

router.post('/tags', passport.authenticate('jwt'), (req, res) => {
    req.user.tags = req.body.tags;
    req.user.save();
    res.send({message: 'Modified'});
});

module.exports = router;