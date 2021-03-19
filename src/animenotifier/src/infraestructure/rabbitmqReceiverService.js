
const amqp = require('amqplib');
module.exports = class RabbitMqReceiverService {

    #connection;
    #channel;
    #queue; 

    EXCHANGE_NAME = 'animes';

    async prepare(){
        this.#connection = await amqp.connect('amqp://rabbit');
        this.#channel = await this.#connection.createChannel();
        this.#channel.assertExchange(this.EXCHANGE_NAME, 'fanout', {
            durable: true
        });

        this.#queue = await this.#channel.assertQueue('', { exclusive: false });

        this.#channel.bindQueue(this.#queue.queue, this.EXCHANGE_NAME, '');
    }

    async on(callback){
        await this.prepare();
        this.#channel.consume(this.#queue.queue, function(message){
            callback(message.content.toString());
        });
    }
}