const FetchAnime = require('./application/fetchNewAnimes');
const FlvScrapper = require('./infraestructure/animeflvscrapper');
const AnimeRepository = require('./infraestructure/database/postgresAnimeRepository');
require('dotenv').config();
const cron = require('node-cron');
const amqp =  require('amqplib/callback_api');


const fetch = new FetchAnime(new FlvScrapper(), new AnimeRepository());
const notifyNewAnimes = require('./application/notifyNewAnimes');

cron.schedule('* * * * *', async function(){
    let animes = await fetch.fetch();
    notifyNewAnimes(animes);
    console.log('Fetch animes');
    console.log(animes);
})

