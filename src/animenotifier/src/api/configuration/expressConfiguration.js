const express = require('express');
const passport = require('passport')
const cookieParser = require('cookie-parser');


module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(passport.initialize());
    app.set('view engine', 'pug');
    app.use(cookieParser());
}