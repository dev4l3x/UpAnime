
module.exports = class AnimeEpisode {
    animeName;
    number;
    url;
    site;

    constructor(name, number, url, site){
        this.animeName = name;
        this.number = number;
        this.url = url;
        this.site = site;
    }
}