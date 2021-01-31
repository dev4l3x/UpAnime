const axios = require('axios');
const jsdom = require('jsdom');
const cheerio = require('cheerio');
const {JSDOM} = jsdom;
const AnimeEpisode = require('./domain/animeEpisode');


axios.get("https://www3.animeflv.net").then((response) => {
    const dom = new JSDOM(response.data);

    const $ = cheerio.load(response.data);

    var childs = $('ul.ListEpisodios li a');

    var animes = [];

    for(let child of childs){
        var url = child.attribs['href'];
        var info = child.children;
        var episodeNumber = info.find(c => 'attribs' in c && c.attribs['class'] === 'Capi').children[0].data;
        var animeName = info.find(c => 'attribs' in c && c.attribs['class'] === 'Title').children[0].data;
        animes.push(new AnimeEpisode(animeName, episodeNumber, `https://www3.animeflv.net${url}`));
    }

    console.log(animes);

})

class Scrapper {

    #content;
    #dom;

    Scrapper(htmlContent){
        this.#content = htmlContent;
        this.#dom = new JSDOM(htmlContent);
    }

    #getElementsByQuery(query){
        
    }

}




