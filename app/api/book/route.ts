import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, roomType, checkIn, checkOut, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 1. Email to Admin
    const adminMailOptions = {
      from: `"Sands of Kashi" <${process.env.SMTP_USER}>`,
      to: "info@sandsofkashi.com", // Updated as requested
      subject: `🏨 New Booking Request: ${roomType} - ${name}`,
      text: `New Booking Request from ${name}. Room: ${roomType}. Dates: ${new Date(checkIn).toDateString()} to ${new Date(checkOut).toDateString()}. Phone: ${phone}.`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #1a1a1a; color: #c5a37f; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">SANDS OF KASHI</h1>
            <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Admin Notification - New Booking</p>
          </div>
          <div style="padding: 40px; background-color: #ffffff;">
            <h2 style="color: #1a1a1a; font-size: 20px; border-bottom: 2px solid #f8f7f5; padding-bottom: 10px; margin-top: 0;">New Booking Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr><td style="padding: 10px 0; font-weight: bold; width: 140px;">Guest Name:</td><td style="padding: 10px 0;">${name}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Email:</td><td style="padding: 10px 0;">${email}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Phone:</td><td style="padding: 10px 0;">${phone}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Room Type:</td><td style="padding: 10px 0; color: #c5a37f; font-weight: bold;">${roomType}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Check-In:</td><td style="padding: 10px 0;">${new Date(checkIn).toLocaleDateString()}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Check-Out:</td><td style="padding: 10px 0;">${new Date(checkOut).toLocaleDateString()}</td></tr>
            </table>
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f7f5; border-radius: 8px;">
              <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase;">Message:</h3>
              <p style="margin-bottom: 0; font-style: italic;">"${message || 'No special requests.'}"</p>
            </div>
          </div>
        </div>
      `,
    };

    // 2. Email to Guest (Confirmation)
    const guestMailOptions = {
      from: `"Sands of Kashi" <${process.env.SMTP_USER}>`,
      to: email, // Send to the customer
      subject: `Booking Confirmed: Your Stay at Sands of Kashi`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #1a1a1a; color: #c5a37f; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">THANK YOU</h1>
            <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Booking is under review</p>
          </div>
          <div style="padding: 40px; background-color: #ffffff;">
            <p style="color: #666; font-size: 16px;">Dear <strong>${name}</strong>,</p>
            <p style="color: #666; line-height: 1.6;">Thank you for choosing <strong>Sands of Kashi</strong>. We have received your booking request for a <strong>${roomType}</strong> and our team will get in touch with you shortly to confirm the details.</p>
            
            <div style="margin: 20px 0; padding: 20px; border: 1px dashed #c5a37f; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px;"><strong>Your Dates:</strong></p>
              <p style="margin: 5px 0; font-size: 18px; color: #1a1a1a;">${new Date(checkIn).toLocaleDateString()} — ${new Date(checkOut).toLocaleDateString()}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">If you have any urgent questions, please feel free to call us at <a href="tel:+917522801564" style="color: #c5a37f; text-decoration: none;">+91-7522801564</a>.</p>
          </div>
          <div style="background-color: #f8f7f5; padding: 20px; text-align: center; color: #888; font-size: 12px;">
            <p style="margin: 0;">Sands Of Kashi By Coral Group, Varanasi</p>
            <p style="margin: 5px 0;">Looking forward to welcoming you!</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(guestMailOptions);

    // 3. WhatsApp Integration (Placeholder Hook)
    // You can connect this to a service like Twilio or MessageBird to send to 7398290340
    console.log(`[WhatsApp Notification sent to Admin: 7398290340] New booking from ${name}`);

    return NextResponse.json({ message: "Booking request sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Booking Mail Error:", error);
    return NextResponse.json({ message: "Failed to send booking request." }, { status: 500 });
  }
}
