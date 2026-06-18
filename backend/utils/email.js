const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html,
    });

    console.log("EMAIL SENT SUCCESS");
  } catch (err) {
    console.log("EMAIL ERROR:", err);
    throw err;
  }
};

module.exports = sendEmail;
