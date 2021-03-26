
const amqp = require('amqplib');

module.exports = class RabbitMqNotifierService {

    EXCHANGE_NAME = 'animes';

    #connection;
    #channel;

    constructor(){
        
    }

    async connect(){
        debugger;
        this.#connection = await amqp.connect('amqp://rabbit');
    }

    async createChannel(){
        this.#channel = await this.#connection.createChannel();
    }

    async configureExchange(){
        this.#channel.assertExchange(this.EXCHANGE_NAME, 'fanout', {durable: true});
    }

    async notify(data) {

        await this.connect();
        await this.createChannel();
        await this.configureExchange();

        this.#channel.publish(this.EXCHANGE_NAME, '', Buffer.from(JSON.stringify(data)));
        
    }

}