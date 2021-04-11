const pug = require('pug');
const path = require('path');

const formatter = {};

formatter.format = function(animes){
    return pug.renderFile(path.join(process.cwd(), 'templates/animeEmail.pug'), {animes});
}



module.exports = function(){
    return formatter;
}