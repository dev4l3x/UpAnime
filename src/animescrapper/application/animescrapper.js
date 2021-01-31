const cheerio = require('cheerio');

module.exports = class AnimeScrapper {

    $;

    constructor(html){
        this.$ = cheerio.load(html);
    }
}