
module.exports = class FetchNewAnimes{
    
    #scrapper;
    #animeRepository;

    constructor(scrapper, animeRepository){
        this.#scrapper = scrapper;
        this.#animeRepository = animeRepository;
    }

    async fetch(){
        var lastestAnimes = await this.#scrapper.fetch();
        return lastestAnimes;
    }
}