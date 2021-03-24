const express = require('express');
const passport = require('passport')

module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(passport.initialize());
}