const amqp = require("amqplib");
const args = process.argv.slice(2); // node productor.js *parametros*

async function start(){
    const connection = await amqp.connect("amqp://localhost"); // no es necesario especificar el puerto
    const channel = await connection.createChannel();

    const exchangeName = "exchange-fanout";
    await channel.assertExchange(exchangeName, "fanout",{ durable: true })

    const message = args.length > 0 ? args[0] : "message by default";

    channel.publish(exchangeName, "", Buffer.from(message));

    setTimeout(() => {
        connection.close();
        process.exit(1);
    }, 2000)
}

start();