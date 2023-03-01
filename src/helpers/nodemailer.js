const nodemailer = require('nodemailer');

require('dotenv').config();

const sendEmail = async (emailTo, subject, html) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.NodemailerMail, // generated ethereal user
            pass: process.env.NodemailerPassword
        },
    })

    // send mail with defined transport object
    await transporter.sendMail({
        from: process.env.NodemailerMail, // sender address
        to: emailTo, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    });
}

module.exports = {
    sendEmail
}