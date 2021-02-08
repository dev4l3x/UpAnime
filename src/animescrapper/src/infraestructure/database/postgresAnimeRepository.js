const AnimeEpisode = require('../../domain/animeEpisode');
const knex = require('knex')
const PErrorHandler = require('./errorHandling/postgresErrorHandler');

module.exports = class PostgresAnimeRepository {

    connection = knex({
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        },
        pool: { min: 0, max: 7 }
    });

    #animes = [
        new AnimeEpisode("test", '1', 'testurl', 'AnimeFLV'),
        new AnimeEpisode("test", '2', 'testurl', 'AnimeFLV'),
        new AnimeEpisode("test", '3', 'testurl', 'AnimeFLV'),
        new AnimeEpisode("test", '4', 'testurl', 'AnimeFLV'),
        new AnimeEpisode("test", '5', 'testurl', 'AnimeFLV'),
        new AnimeEpisode("test", '6', 'testurl', 'AnimeFLV')
    ];

    getNewerAnimesThan(date){
        return new Promise((resolve) => {
            this.connection.select()
            .from('animeepisodes')
            .where('addeddate', '>=', date)
            .then((rows) => {
                var animes = [];
                for(let row of rows){
                    let anime = new AnimeEpisode(row['animename'], row['episodenumber'], row['episodeurl'], row['site'], row['addeddate']);
                    animes.push(anime);
                }
                resolve(animes);
            });
        })
    }

    async save(animes){
        for(let anime of animes){
            try{
                await this.connection('animeepisodes').insert({
                    animename: anime.animeName,
                    episodenumber: anime.number,
                    episodeurl: anime.url,
                    site: anime.site,
                    addeddate: anime.addedDate
                });
            }
            catch(error){
                console.log('Error inserting in db');
            }
        }
    }

}