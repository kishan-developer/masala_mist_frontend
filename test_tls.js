const nodemailer = require('nodemailer');

async function test() {
  const credentials = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: 'info@sandsofkashi.in',
      pass: 'udtxamepqtgxvlhh',
    },
  };

  console.log("Testing with TLS (Port 587) for:", credentials.auth.user);

  try {
    const transporter = nodemailer.createTransport(credentials);
    await transporter.verify();
    console.log("SUCCESS: Connection successful with TLS.");
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

test();
