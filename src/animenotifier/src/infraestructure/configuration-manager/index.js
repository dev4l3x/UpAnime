require('dotenv').config();

const configurationManager = {};

configurationManager.getConfig = function(name){
    _ensureConfigExists(name);
    return process.env[name];
}

function _ensureConfigExists(name){
    if(!(name in process.env)){
        throw new Error(`Enviroment variable with name ${name} does not exist`);
    }
}


module.exports = configurationManager;