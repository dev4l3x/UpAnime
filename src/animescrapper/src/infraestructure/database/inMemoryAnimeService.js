const AnimeEpisode = require('../../domain/animeEpisode');

module.exports = class InMemoryAnimeRepository {
    #animes = [
        new AnimeEpisode("test", '1', 'testurl', 'AnimeFLV'),
        new AnimeEpisode("test", '2', 'testurl', 'AnimeFLV'),
        new AnimeEpisode("test", '3', 'testurl', 'AnimeFLV'),
        new AnimeEpisode("test", '4', 'testurl', 'AnimeFLV'),
        new AnimeEpisode("test", '5', 'testurl', 'AnimeFLV'),
        new AnimeEpisode("test", '6', 'testurl', 'AnimeFLV')
    ];

    getNewerAnimesThan(date){
        return this.#animes;
    }

    save(animes){
        console.log(JSON.stringify(animes));
    }

}