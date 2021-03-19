
const ReceiverService = require('./infraestructure/rabbitmqReceiverService');

const receiver = new ReceiverService();

receiver.on((message) => {
    console.log(message);
});
