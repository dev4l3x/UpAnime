const mongoose = require('mongoose');
const config = require('./../../infraestructure/configuration-manager');

const DEFAULT_PORT = 27017;
const MONGO_DEFAULT_HOST = 'localhost'
const port = config.getConfig('MONGO_PORT') ?? DEFAULT_PORT;
const host = config.getConfig('MONGO_HOST') ?? MONGO_DEFAULT_HOST;
const database_name = config.getConfig('DATABASE_NAME');

module.exports = function(){
    mongoose.connect(`mongodb://${host}:${port}/${database_name}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if(err)
            throw err;
        console.log(`Connected to MongoDB`);
    });
}