const pug = require('pug');
const path = require('path');

module.exports = class HtmlFormatterService{
    format(animes){
        return pug.renderFile(path.join(process.cwd(), 'templates/animeEmail.pug'), {animes});
    }
}