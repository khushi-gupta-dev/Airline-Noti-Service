const express = require("express");
const amqplib = require("amqplib");
const { emailService } = require("./services");
const { serverConfig, logger } = require("./config");
const apiRoutes = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

async function connectQueue() {
    const connection = await amqplib.connect(serverConfig.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("noti-queue");

    channel.consume("noti-queue", async (data) => {
        if (!data) return;

        const object = JSON.parse(data.content.toString());
        await emailService.sendEmail({
            mailFrom: serverConfig.GMAIL_EMAIL,
            mailTo: object.recepientEmail,
            subject: object.subject,
            text: object.text
        });

        channel.ack(data);
    });
    return connection;
}

app.listen(serverConfig.PORT, async () => {
    logger.info(`Server is running on port ${serverConfig.PORT}`);
    try {
        await connectQueue();
        logger.info("Connected to RabbitMQ queue noti-queue");
    } catch (error) {
        logger.error(`RabbitMQ connection failed (${serverConfig.RABBITMQ_URL}): ${error.message}`);
    }
});

