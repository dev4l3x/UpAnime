
const amqp = require('amqplib');

let connection, channel, queue;
const EXCHANGE_NAME = 'animes';

async function _connect(){
    connection = await amqp.connect('amqp://rabbit');
    channel = await connection.createChannel();
    channel.assertExchange(EXCHANGE_NAME, 'fanout', {
        durable: true
    });

    queue = await this.channel.assertQueue('', { exclusive: false });

    channel.bindQueue(queue.queue, EXCHANGE_NAME, '');
}

async function onReceive(callback){
    await _connect();
    channel.consume(queue, (message) => {callback(message.content.toString())});
}



module.exports = { on: onReceive };