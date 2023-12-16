const amqp = require('amqplib')

async function start(){
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchangeName = "exchange-fanout";
    await channel.assertExchange(exchangeName, "fanout",{ durable: true })
    const asserQueue = await channel.assertQueue("", { exclusive: true });


    await channel.bindQueue(asserQueue.queue, exchangeName, "");

    channel.consume(asserQueue.queue, message => {
        console.log(`Message received: ${message.content.toString()}`);
    }, { noAck: true })

}
start();