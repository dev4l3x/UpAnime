module.exports = class AnimeEpisode {
    animeName;
    number;
    url;
    site;
    addedDate; 

    constructor(name, number, url, site, addedDate){
        this.animeName = name;
        this.number = number;
        this.url = url;
        this.site = site;
        this.addedDate = addedDate;
    }
}