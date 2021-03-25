const express = require('express');
const router = express.Router();

const pug = require('pug');

router.get('/', (req, res) => {
    console.log(req.cookies['access-token']);
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});

module.exports = router;