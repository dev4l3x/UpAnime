const AnimeScrapper = require('AnimeScrapper');

class AnimeFlvScrapper extends AnimeScrapper{

    constructor(html){
        super(html);
    }

    getLastestAnimes(){
        var lastestLiElements = $('ul.ListEpisodios').chil;

    }

}