const express = require("express");

const amqplib = require("amqplib");
const {emailService}  = require("./services");
async function connectQueue(){
    try{
        const connection = await amqplib.connect("amqp://localhost");

        const channel = await connection.createChannel();

        await channel.assertQueue("noti-queue" );

        channel.consume("noti-queue", async(data) => {
           
            const object = JSON.parse(`${Buffer.from(data.content)}`);

           await emailService.sendEmail({
                mailFrom: "airlinenotification2905@gmail.com",
                mailTo: object.recepientEmail,
                subject: object.subject,
                text: object.text
            });
         
            channel.ack(data);
        });
    }catch (error) {
        console.error( error);
    }
}


const {serverConfig , logger}  = require("./config")
const apiRoutes = require("./routes");

const mailsender = require("./config/email-config");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, async()=> {
    console.log(`Server is running on port ${serverConfig.PORT}`);
    await connectQueue();
    console.log("connected to queue");
});

