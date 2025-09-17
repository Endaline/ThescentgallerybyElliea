import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // or configure SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(to: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2>Password Reset Request</h2>
        <p>You recently requested to reset your password. Click the button below to set a new one:</p>
        
        <p style="text-align: center; margin: 20px 0;">
          <a href="${resetUrl}" 
             style="display: inline-block; padding: 12px 20px; font-size: 16px; 
             background-color: #1DA1F2; color: #fff; text-decoration: none; border-radius: 6px;">
             Reset Password
          </a>
        </p>

        <p>If the button doesn’t work, copy and paste this link into your browser:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>

        <p>This link will expire in <strong>1 hour</strong>.</p>
        <p>If you didn’t request a password reset, you can safely ignore this email.</p>
      </div>
    `,
  });
}

export async function sendContactEmail(data: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"${data.fullName}" <${data.email}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Message: ${data.subject}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}
