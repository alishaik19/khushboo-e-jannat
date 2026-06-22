const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const email = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // 👈 yaha
      to,
      subject,
      html,
    });

    console.log("EMAIL SENT:", data);
  } catch (err) {
    console.log("EMAIL ERROR:", err);
    throw err;
  }
};

module.exports = email;
