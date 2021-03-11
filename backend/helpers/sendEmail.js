const nodemailer = require('nodemailer');

const sendEmail = async options => {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "71bb35b9809033",
          pass: "61353d498b777d"
        }
      });

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transport.sendMail(message)
}

module.exports = sendEmail;