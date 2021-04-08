
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://mongonotifier:27017/animenotifier', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if(err)
            throw err;
        console.log(`Connected to MongoDB`);
    });
}