import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json();

        // Validate input
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create transporter with Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Your Gmail address
                pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
            },
        });

        // Email to you (the inquiry)
        const mailToYou = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Your email
            subject: `New Contact from Portfolio - ${name}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
            .value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📧 New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">From your portfolio website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">📋 Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="footer">
                <p>Sent from your portfolio contact form</p>
                <p>Reply directly to this email to respond to ${name}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
            replyTo: email, // When you reply, it goes to the sender
        };

        // Auto-reply email to sender
        const autoReply = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Thank you for contacting Mohamed Arshad',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-copy { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd; color: #666; }
            .signature { margin-top: 20px; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">✅ Message Received!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for reaching out</p>
            </div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for contacting me! I've received your message and will get back to you as soon as possible, usually within 24-48 hours.</p>
              
              <div class="message-copy">
                <h3 style="margin-top: 0; color: #667eea;">📋 Your Message:</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>

              <p>If you have any urgent queries, feel free to reach out to me directly at:</p>
              <ul>
                <li>📧 Email: mohamedarshad1507@gmail.com</li>
                <li>💼 LinkedIn: <a href="https://www.linkedin.com/in/mohamed-arshad-3b8269380/">Mohamed Arshad</a></li>
                <li>🔗 GitHub: <a href="https://github.com/mohamedarshad-code">@mohamedarshad-code</a></li>
              </ul>

              <div class="signature">
                <p>Best regards,<br>
                <strong>Mohamed Arshad M</strong><br>
                Full Stack & Flutter Developer<br>
                Coimbatore, Tamil Nadu, India</p>
              </div>

              <div class="footer">
                <p style="font-size: 12px; color: #999;">
                  This is an automated response. Please do not reply to this email.<br>
                  If you need immediate assistance, please send a new email to mohamedarshad1507@gmail.com
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
        };

        // Send both emails
        await transporter.sendMail(mailToYou);
        await transporter.sendMail(autoReply);

        return NextResponse.json(
            { message: 'Email sent successfully!' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Email send error:', error);
        return NextResponse.json(
            { error: 'Failed to send email', details: error.message },
            { status: 500 }
        );
    }
}
