const AnimeEpisode = require('../domain/animeepisode');
const DateRetriever = require('../domain/date/dateRetriever');
module.exports = class MemoryAnimeReceiver {
    #animes = [
        new AnimeEpisode('Anime1', '1', 'http://animeflv.net', 'AnimeFLV', DateRetriever.getToday()),
        new AnimeEpisode('Anime2', '2', 'http://animeflv.net', 'AnimeFLV', DateRetriever.getToday()),
        new AnimeEpisode('Anime3', '3', 'http://animeflv.net', 'AnimeFLV', DateRetriever.getToday()),
        new AnimeEpisode('Anime4', '4', 'http://animeflv.net', 'AnimeFLV', DateRetriever.getToday()),
        new AnimeEpisode('Anime5', '5', 'http://animeflv.net', 'AnimeFLV', DateRetriever.getToday()),
        new AnimeEpisode('Anime6', '6', 'http://animeflv.net', 'AnimeFLV', DateRetriever.getToday()),
    ]

    onNewAnimesReceive(callback){
        callback(this.#animes);
    }
}