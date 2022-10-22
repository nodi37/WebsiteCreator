import nodemailer from 'nodemailer';
import emailConfig from '../config/emailConfig';

async function sendEmail(template: string, emailSubject: string, recipientEmail: string): Promise<void> {
    try {
        const transponder = nodemailer.createTransport(emailConfig);

        transponder.sendMail({
            from: '"WebsiteCreator"<no-reply>',
            to: recipientEmail,
            subject: emailSubject,
            html: template
        });
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail; 
