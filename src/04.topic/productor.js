const amqp = require("amqplib");
const args = process.argv.slice(2); // node productor *mensaje* *routing key*

async function start(){
    const connection = await amqp.connect("amqp://localhost"); // no es necesario especificar el puerto
    const channel = await connection.createChannel();

    const exchangeName = "exchange-topic";
    await channel.assertExchange(exchangeName, "topic",{ durable: true })

    const message = args.length > 0 ? args[0] : 'Mensaje por defecto';
    const routingKey = args.length > 1 ? args[1] : 'key';

    channel.publish(exchangeName, routingKey, Buffer.from(message));
    console.log(` [X] Send %s:%s ${routingKey} ${message}`);

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 2000);
}

start();