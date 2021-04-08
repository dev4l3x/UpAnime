const User = require('./models/user');

module.exports = class UserRepository {
    constructor() {
        
    }
    async getUsers(){
        const users = await User.find();
        return users;
    }
}