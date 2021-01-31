const cheerio = require('cheerio');
const axios = require('axios');
const AnimeEpisode = require('../domain/animeEpisode');

module.exports = class AnimeFlvScrapper{

    constructor(){
    }

    fetch(){
        let resultPromise = new Promise((resolve, reject) =>{

            axios.get("https://www3.animeflv.net").then((response) => {

                const $ = cheerio.load(response.data);

                var childs = $('ul.ListEpisodios li a');

                var animes = [];

                for(let child of childs){
                    var url = child.attribs['href'];
                    var info = child.children;
                    var episodeNumber = info.find(c => 'attribs' in c && c.attribs['class'] === 'Capi').children[0].data;
                    var animeName = info.find(c => 'attribs' in c && c.attribs['class'] === 'Title').children[0].data;

                    animes.push(new AnimeEpisode(animeName, episodeNumber, `https://www3.animeflv.net${url}`, 'AnimeFLV'));
                    
                }

                resolve(animes);
            });
        
        });
        return resultPromise;
    }

}