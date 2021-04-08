const HtmlFormatterService = require('./htmlFormatterService');

module.exports = class NotifyAnimesToUsers {


    constructor(userRepository){
        this.userRepository = userRepository;
        this.formatter = new HtmlFormatterService();
    }

    async notify(animesToNotify){
        debugger;
        let users = await this.userRepository.getUsers();
        for(let user of users){
            let tags = user.tags;
            let animes = animesToNotify.filter(anime => tags.some((tag) => anime.animeName.includes(tag)));
            return this.formatter.format(animes);
        }
    }
}