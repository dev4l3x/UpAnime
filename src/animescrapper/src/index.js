const FetchAnime = require('./application/fetchNewAnimes');
const FlvScrapper = require('./infraestructure/animeflvscrapper');
const AnimeRepository = require('./infraestructure/database/postgresAnimeRepository');
require('dotenv').config();
const amqpHandler =  require('amqplib/callback_api');


const fetch = new FetchAnime(new FlvScrapper(), new AnimeRepository());

fetch.fetch().then(r => {
    var date = new Date();
    date.setMinutes(date.getMinutes() - 20);
    new AnimeRepository().getNewerAnimesThan(date).then((result) => {
        let lastAddedAnimes = JSON.stringify(result);

        amqpHandler.connect(`amqp://${process.env.MQ_HOST}`, (error, connection) => {
            if(error){
                console.log(error);
            }

            connection.createChannel((channelError, channel) => {
                if(channelError){
                    console.log('Error trying to crate the channel');
                }
                
                channel.assertExchange('new_animes', 'fanout');

                channel.publish('new_animes', 'all', Buffer.from(lastAddedAnimes));

                channel.close(() => {
                    connection.close(() => {
                        process.exit(0);
                    });
                });

            });
        });


    });
});

