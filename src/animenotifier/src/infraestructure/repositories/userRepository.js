const User = require('../schemas/user');

const repository = {}

repository.getUsers = async function(){
    return await User.find();
}


module.exports = function(){
    return repository;
};

// function UserRepository(){

// }

// UserRepository.prototype.getUsers = async function (){
//     const users = await User.find();
//     return users;
// }