const AnimeEpisode = require('../../domain/animeEpisode');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'qwerty$1234',
        database: 'upanime'
    },
});

module.exports = class PostgresAnimeRepository {
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
        for(let anime of animes){
            knex('animeepisodes').insert({
                animename: anime.animeName,
                episodenumber: anime.number,
                episodeurl: anime.url,
                site: anime.site,
                addeddate: anime.addedDate
            }).then((result) => {
                console.log('Created');
            });
        }
    }

}