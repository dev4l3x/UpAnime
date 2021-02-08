module.exports = class PostgresErrorHandler{
    static handle(errorCode){
        switch(errorCode){
            case '23505':
                console.log('Entity already exists in db');
                break;
            default:
                console.log('Error while inserting in db');
        }
    }
}