module.exports = class GetLastestAnimeEpisodes{

    #animeService;

    constructor(animeService){
        this.#animeService = animeService;
    }

    get(){
        var todayDate = new Date().getUTCDate();
        var animes = this.#animeService.getNewerAnimesThan(todayDate);
        return JSON.stringify(animes);
    }
 }