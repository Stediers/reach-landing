import { FormContent } from "@data/types";

var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail({ content} : { content: FormContent }) {


  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: "reachgig.connect@gmail.com",
    subject: `New Question from ${content.name} via Contact Form`,
    text: `
    Name: ${content.name}\n
    Phone: ${content.phone}\n
    Email: ${content.email}\n
    Message: ${content.message}\n
    `,
  };

  transporter.sendMail(mailOptions, function (error:Error) {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}