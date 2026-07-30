require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function test() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();
    console.log("SUCCESS: Connection successful. App password is valid.");
    
    // Optional: actually send a test email to the configured TO_EMAIL
    /*
    await transporter.sendMail({
      from: `"Test Client" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "Test Authentication",
      text: "This is a test message to verify nodemailer."
    });
    console.log("Test email sent.");
    */
  } catch (err) {
    console.error("ERROR: Authentication or connection failed:", err.message);
  }
}

test();
