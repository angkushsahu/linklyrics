import { createTransport } from "nodemailer";

export interface ISendResetEmail {
   email: string;
   resetToken: string;
   originUrl: string;
}

export default async function sendResetEmail({ email, originUrl, resetToken }: ISendResetEmail) {
   try {
      const transporter = createTransport({
         service: process.env.MAIL_SERVICE,
         auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS,
         },
      });

      const text: string = `
        WE GOT YOUR REQUEST TO RESET YOUR PASSWORD

        CLICK ON THE LINK BELOW WHICH WILL REDIRECT TO A PAGE WHERE YOU CAN SAFELY RESET YOUR PASSWORD

        LINK - ${originUrl}/auth/reset-password/${resetToken}

        THANKS.
        LINK-LYRIC
        `;

      const mailOptions = {
         from: process.env.MAIL,
         to: email,
         subject: "LINK-LYRIC RESET PASSWORD",
         text,
      };

      await transporter.sendMail(mailOptions);
      return { success: true, message: "Mail sent successfully" };
   } catch (error) {
      return { success: false, message: "Unable to send e-mail" };
   }
}
