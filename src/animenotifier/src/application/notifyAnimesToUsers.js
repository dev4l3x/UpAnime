const UserRepository = require('../infraestructure/userRepository');



module.exports = async function(animesToNotify){
    let repo = new UserRepository();
    let users = await repo.getUsers();
    for(let user of users){
        let tags = user.tags;
        let animes = animesToNotify.filter(anime => tags.some((tag) => anime.name.includes(tag)));

    }
}