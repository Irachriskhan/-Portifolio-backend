import nodemailer from 'nodemailer';

async function sendNotificationEmails(
    sender: string,
    password: string,
    title: string,
    description: string,
    subscribers: Array<string>,
): Promise<void> {
    try {
        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       type: 'OAuth2',
        //       user: process.env.MAIL_USERNAME,
        //       pass: process.env.MAIL_PASSWORD,
        //       clientId: process.env.OAUTH_CLIENTID,
        //       clientSecret: process.env.OAUTH_CLIENT_SECRET,
        //       refreshToken: process.env.OAUTH_REFRESH_TOKEN
        //     }
        //   });

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: sender,
                pass: password,
            },
        });

        // Send email to each subscriber
        for (const subscriber of subscribers) {
            await transporter.sendMail({
                from: sender,
                to: subscriber,
                subject: title,
                text: `New blog post: ${title}\n\n${description}`,
            });
        }

        console.log('Notification emails sent successfully');
    } catch (error) {
        console.error('Error sending notification emails:', error);
    }
}

export default sendNotificationEmails;
