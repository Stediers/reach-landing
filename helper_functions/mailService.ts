import { FormContent } from "@data/types";

var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail({ content }: { content: FormContent }) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreply.reachgigcontactform@gmail.com",
      pass: "jnqp rppw mmmi xnba",
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
    Question: ${content.question}\n
    `,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error: Error) {
      if (error) {
        reject(error);
        throw new Error(error.message);
      } else {
        resolve(true);
        return true;
      }
    });
  });
}
