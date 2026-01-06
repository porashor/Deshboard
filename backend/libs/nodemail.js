import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Transport configuration (example: Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,     // your email
    pass: process.env.EMAIL_PASS      // app password 
  }
});

export default transporter;
