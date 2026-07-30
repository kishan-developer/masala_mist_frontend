const nodemailer = require('nodemailer');

async function test() {
  const credentials = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'gunnikij1665@gmail.com',
      pass: 'udtxamepqtgxvlhh',
    },
  };

  console.log("Testing with credentials:", credentials.auth.user);

  try {
    const transporter = nodemailer.createTransport(credentials);
    await transporter.verify();
    console.log("SUCCESS: Connection successful.");
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

test();
