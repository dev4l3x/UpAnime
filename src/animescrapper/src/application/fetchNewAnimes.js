
module.exports = class FetchNewAnimes{
    
    #scrapper;
    #animeRepository;

    constructor(scrapper, animeRepository){
        this.#scrapper = scrapper;
        this.#animeRepository = animeRepository;
    }

    fetch(){
        this.#scrapper.fetch().then(lastestAnimes =>{
            this.#animeRepository.save(lastestAnimes);
        });

    }
}