import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request body:", body);
    console.log("EMAIL_USER:", process.env.EMAIL_USER );
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS );
    console.log("RECEIVER_EMAIL:", process.env.RECEIVER_EMAIL);


    const { name, email, company, phoneNumber, subject, message } = body;

    // Validate incoming data
    if (!name || !email || !subject || !message) {
      console.error("Validation failed. Missing fields.");
      return NextResponse.json(
        { success: false, message: "Required fields are missing." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true, // Enable debugging logs
  debug: true, // Show debugging output
    });

 
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `Contact us Form: ${subject}`,
      html: `
        <div>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber || "N/A"}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
    });

    console.log("Email sent successfully.");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/send-email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email." },
      { status: 500 }
    );
  }
}
