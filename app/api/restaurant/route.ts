import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { type, name, guests, date, time, email, message } = data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const isReservation = type === "RESERVATION";
    const subject = isReservation 
      ? `🍽️ Table Reservation: ${name}` 
      : `📱 Restaurant Inquiry from ${email}`;

    const adminMailOptions = {
      from: `"Masala Mist Restaurant" <${process.env.SMTP_USER}>`,
      to: "info.masalamist@gmail.com", // Updated as requested
      subject: subject,
      html: isReservation ? `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #c5a059; border-radius: 10px; overflow: hidden; background-color: #0a0a0a; color: #fff;">
          <div style="background-color: #c5a059; color: #000; padding: 25px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">TABLE RESERVATION</h1>
          </div>
          <div style="padding: 30px;">
            <table style="width: 100%; color: #fff;">
              <tr><td style="padding: 8px 0; color: #c5a059;">Name:</td><td>${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #c5a059;">Guests:</td><td>${guests}</td></tr>
              <tr><td style="padding: 8px 0; color: #c5a059;">Date:</td><td>${date}</td></tr>
              <tr><td style="padding: 8px 0; color: #c5a059;">Time:</td><td>${time}</td></tr>
            </table>
          </div>
        </div>
      ` : `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #c5a059; border-radius: 10px; overflow: hidden; background-color: #0a0a0a; color: #fff;">
          <div style="background-color: #c5a059; color: #000; padding: 25px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">RESTAURANT INQUIRY</h1>
          </div>
          <div style="padding: 30px;">
             <p style="color: #c5a059;">From:</p>
             <p>${email}</p>
             <p style="color: #c5a059; margin-top: 20px;">Message:</p>
             <div style="background: #1a1a1a; padding: 15px; border-radius: 5px;">
               ${message}
             </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ message: "Inquiry sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Restaurant Mail Error:", error);
    return NextResponse.json({ message: "Failed to send inquiry." }, { status: 500 });
  }
}
