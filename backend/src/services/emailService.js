import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendCertificateEmail = async (to, pdfPath, jpgPath, name) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"CertiMail" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Certificate is Ready 🎓",
    text: `Hello ${name},\n\nHere is your certificate!`,
    attachments: [
      { filename: `${name}.pdf`, path: pdfPath },
      { filename: `${name}.jpg`, path: jpgPath },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Email sent to ${to}`);
};
