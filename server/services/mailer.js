import nodemailer from "nodemailer"; // Library for email service
import dotenv from "dotenv";

dotenv.config();

const user = process.env.EMAIL;
const pass = process.env.EMAIL_PSWD;

// Setting up nodemailer using gmail
let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass
    }
});

export const sendEmail = (email, newPassword) => {
    return new Promise((resolve, reject) => {
      transport.sendMail(
        {
          from: user,
          to: email,
          subject: "DAM Login Configuration",
          html: `
          <div>
              <h1>Greetings from DAM</h1>
              <p>You can login to your account with your new password: <b>${newPassword}</b><br /> We highly recommend you change the password later through user settings.</p>
              <p>Best Regards, <br />Team DAM </p>
          </div>
          `,
        },
        (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
};
  