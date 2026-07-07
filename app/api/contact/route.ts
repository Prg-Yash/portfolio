import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Gmail SMTP Configuration using App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "yashnimse92@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD || "fmvdtqklepbjhpna",
      },
    });

    // Format the email content
    const mailOptions = {
      from: `"Portfolio Telemetry Portal" <${process.env.GMAIL_USER || "yashnimse92@gmail.com"}>`,
      to: "yashnimse92@gmail.com", // Send directly to Yash's inbox
      replyTo: email,
      subject: `[Portfolio Commission] New Message from ${name}`,
      text: `
NEW ASTRAL TRANSMISSION RECEIVED VIA PORTFOLIO PORTAL

01 // IDENTIFICATION
Name / Studio: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

02 // MESSAGE
${message}

──────────────────────────────────────────────────────
Sent from Portfolio Telemetry Portal (Stage 09 Legacy)
      `,
      html: `
        <div style="font-family: monospace, sans-serif; max-width: 600px; margin: 0 auto; background-color: #111; color: #eee; padding: 30px; border: 1px solid #333; border-radius: 12px;">
          <h2 style="color: #ffd890; border-bottom: 1px solid #333; padding-bottom: 15px; letter-spacing: 2px;">✦ NEW TELEMETRY TRANSMISSION</h2>
          
          <div style="margin: 25px 0;">
            <p style="color: #888; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px;">01 // IDENTIFICATION</p>
            <p style="font-size: 16px; margin: 0 0 8px 0;"><strong>Name / Studio:</strong> ${name}</p>
            <p style="font-size: 16px; margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #ffd890;">${email}</a></p>
            <p style="font-size: 16px; margin: 0 0 8px 0;"><strong>Phone:</strong> ${phone || "<span style='color:#666;'>Not provided</span>"}</p>
          </div>

          <div style="margin: 25px 0;">
            <p style="color: #888; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px;">02 // MESSAGE</p>
            <div style="background-color: #1a1a1a; border-left: 3px solid #ffd890; padding: 15px; font-family: sans-serif; font-size: 15px; line-height: 1.6; color: #fff; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 30px; border-top: 1px solid #333; pt-15; font-size: 11px; color: #666; text-align: center; letter-spacing: 1px;">
            SENT FROM PORTFOLIO 2.0 TELEMETRY PORTAL · STAGE 09 LEGACY
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Transmission sent successfully." });
  } catch (error: any) {
    console.error("Error sending telemetry transmission:", error);
    return NextResponse.json(
      { error: "Failed to send transmission.", details: error.message },
      { status: 500 }
    );
  }
}
