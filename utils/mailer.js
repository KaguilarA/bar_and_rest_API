import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

// Load environment variables
process.loadEnvFile();

const {
  SENDGRID_API_KEY: api_key
} = process.env;

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key
  }
}));

export default (to, subject, html) => {
  
}