
const NotifierService = require('../infraestructure/rabbitmqNotifierService');



module.exports = function notifyNewAnimes(animes){
    
    const service = new NotifierService();
    service.notify(animes);

}
 