const FetchAnime = require('./application/fetchNewAnimes');
const FlvScrapper = require('./infraestructure/animeflvscrapper');
const AnimeRepository = require('./infraestructure/database/inMemoryAnimeService');


const fetch = new FetchAnime(new FlvScrapper(), new AnimeRepository());

fetch.fetch();




