/**
 * Usage, improt the module anywhere you need to send email,
 * @example import MailService from '../../mail-service';
 */

const nodemailer = require('nodemailer');

export default class MailService {

    public static transporter: any = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '******', // TODO add the email as parameter variable
            pass: '******', // TODO add password to email as parameter variable
        },
    });

    /**
     * Usage:
     * sendMail is static, thus no initialization of the class is required
     * @param, {Object} mailOptions is an object of sender's detials
     * @example let mailOptions = {
     *               from: 'working.space.inc@gmail.com',
     *               to: 'martinavagyan@gmail.com',
     *               subject: 'Sending Email using Node.js',
     *               text: 'That was easy!'
     *           };
     *
     */
    public static sendMail(mailOptions: object) {
        this.transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
