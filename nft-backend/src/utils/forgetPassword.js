// utils/forgotPassword.js

import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (email, user, resetUrl) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAIL_USER,
      pass: process.env.NODEMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAIL_USER,
    to: email,
    subject: "NFT Closet X - Password Reset Request",
    html: `
    <div style="font-family: Arial, sans-serif;">
    <div style="text-align: center;">
      <img src=" https://i.ibb.co.com/jkSbtgQc/nft-logo.png" alt="NFT Closet X"    style="width:200px; height:auto;"/>
      </div>
      </br>
      <p style="text-transform: capitalize;">Dear ${user.name.firstName} ${user.name.lastName},</p>
       </br>
      <p>You have requested to reset your password. Click the link below to reset your password:</p>
      <p>Click here: <a href="${resetUrl}">Reset Password</a></p> 
       <p>If you didn't request this, please ignore this email.</p> </br>
      <p>Best regards,</p>
      <p>The NFT Closet X Team</p>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
