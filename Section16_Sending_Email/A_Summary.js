// Part1. Using AWS SES to send email
// $$$$$$  email can only send to verified email account in sandbox mode
// For best practice of managing AWS credentials, AWS SDK for JavaScript v3 automatically load credentials from various sources
// AWS credentials and config file (located at ~/.aws/credentials and ~/.aws/config on Linux and macOS, and 
// at C:\Users\USERNAME\.aws\credentials and C:\Users\USERNAME\.aws\config on Windows).
// npm install @aws-sdk/client-ses, create sendMail method in sendMail.js
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const client = new SESClient({ region: "us-east-1" });
const {source} = require('./emailAddress');

exports.sendEmail = (destination, subject, body) => {
    const params = {
        Source: source, // Use a verified sender email address
        Destination: {
            ToAddresses: [
                destination // Use a verified recipient email address
            ]
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: 'UTF-8'
            },
            Body: {
                Text: {
                    Data: body,
                    Charset: 'UTF-8'
                }
            }
        }
    };
    const command = new SendEmailCommand(params);

    const run = async () => {
    try {
        const data = await client.send(command);
    } catch (err) {
        console.log(err);
    }
    };
    run();
}
// Use it in controller
const { sendEmail } = require('../.aws/sendMail');
sendEmail(email, 'Test email', 'Hello from AWS!');