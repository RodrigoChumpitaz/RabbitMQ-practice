const amqp = require('amqplib')

async function start(){
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queueName = "queue01";
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, message => {
        console.log(message.content.toString());
    }, { noAck: true })

}
start();