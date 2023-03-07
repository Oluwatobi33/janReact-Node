const { createTransport } = require("nodemailer")

const sendMail = ({ to, subject, text }) => {
    const transporter = createTransport({
        host: "smtp.gmail.com",
        secure: true,
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.APP_MAIL,
            pass: process.env.APP_PASSWORD
        },

    })
    const info = transporter.sendMail({
        from: process.env.APP_MAIL,
        to,
        subject,
        text

    })
    console.log(info);
}

module.exports = { sendMail }