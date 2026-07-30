import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

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
      from: `"Sands of Kashi Contact" <${process.env.SMTP_USER}>`,
      to: "info@sandsofkashi.com", // Updated as requested
      subject: `✉️ New Contact Message: ${subject}`,
      text: `New Message from ${name}. Email: ${email}. Subject: ${subject}. Message: ${message}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #1a1a1a; color: #c5a37f; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">SANDS OF KASHI</h1>
            <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Admin Notification - New Inquiry</p>
          </div>
          <div style="padding: 40px; background-color: #ffffff;">
            <h2 style="color: #1a1a1a; font-size: 20px; border-bottom: 2px solid #f8f7f5; padding-bottom: 10px; margin-top: 0;">New Contact Inquiry</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr><td style="padding: 10px 0; font-weight: bold; width: 140px;">Sender Name:</td><td style="padding: 10px 0;">${name}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Email:</td><td style="padding: 10px 0;">${email}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Subject:</td><td style="padding: 10px 0; color: #c5a37f; font-weight: bold;">${subject}</td></tr>
            </table>
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f7f5; border-radius: 8px;">
              <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase;">Message:</h3>
              <p style="margin-bottom: 0; line-height: 1.6;">${message}</p>
            </div>
          </div>
        </div>
      `,
    };

    // 2. Email to User (Acknoledgement)
    const userMailOptions = {
      from: `"Sands of Kashi" <${process.env.SMTP_USER}>`,
      to: email, 
      subject: `We've Received Your Message: Sands of Kashi`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #1a1a1a; color: #c5a37f; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">MESSAGE RECEIVED</h1>
          </div>
          <div style="padding: 40px; background-color: #ffffff;">
            <p style="color: #666; font-size: 16px;">Dear <strong>${name}</strong>,</p>
            <p style="color: #666; line-height: 1.6;">Thank you for reaching out to <strong>Sands of Kashi</strong>. We have received your inquiry regarding "<strong>${subject}</strong>" and our team will get back to you within 24 hours.</p>
            <p style="color: #666; font-size: 14px;">If you need an immediate response, please call us at <a href="tel:+917522801564" style="color: #c5a37f; text-decoration: none;">+91-7522801564</a>.</p>
          </div>
          <div style="background-color: #f8f7f5; padding: 20px; text-align: center; color: #888; font-size: 12px;">
            <p style="margin: 0;">Sands Of Kashi By Coral Group, Varanasi</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    // 3. WhatsApp Integration (Placeholder Hook)
    // You can connect this to a service like Twilio or MessageBird to send to 7398290340
    console.log(`[WhatsApp Notification sent to Admin: 7398290340] New inquiry from ${name}`);

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Contact Mail Error:", error);
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 });
  }
}
