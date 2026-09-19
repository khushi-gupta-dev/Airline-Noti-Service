const express = require("express");




const {serverConfig , logger}  = require("./config")
const apiRoutes = require("./routes");

const mailsender = require("./config/email-config");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, async()=> {
    console.log(`Server is running on port ${serverConfig.PORT}`);
    try{
    const response = await mailsender.sendMail({
        from: serverConfig.GMAIL_EMAIL,
        to: "khushineekhra2905@gmail.com",
        subject: "Is the service working?",      
        text: "Yes it is working."
    });
    console.log(response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
});

