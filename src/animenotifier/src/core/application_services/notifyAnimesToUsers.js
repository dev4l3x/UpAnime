module.exports = function({ userRepository, formatter }){

    const notifier = {
        async notify(animesToNotify){
            let users = await userRepository.getUsers();
            for(let user of users){
                let tags = user.tags;
                let animes = animesToNotify.filter(anime => tags.some((tag) => anime.animeName.includes(tag)));
                return formatter.format(animes);
            }
        }
    };

    return notifier;
}