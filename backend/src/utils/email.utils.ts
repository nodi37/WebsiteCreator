import nodemailer from 'nodemailer';
import emailConfig from '../config/emailConfig';

async function sendEmail(template: string, emailSubject: string, recipientEmail: string): Promise<void> {
    try {
        const transponder = nodemailer.createTransport(emailConfig);

        transponder.sendMail({
            from: '"Delator.no"<no-reply@delator.no>',
            to: recipientEmail,
            subject: emailSubject,
            html: template
        });
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail; 
