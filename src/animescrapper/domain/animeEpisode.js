
module.exports = class AnimeEpisode {
    animeName;
    number;
    url;

    constructor(name, number, url){
        this.animeName = name;
        this.number = number;
        this.url = url;
    }
}