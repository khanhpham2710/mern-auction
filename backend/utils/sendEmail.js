import nodeMailer from "nodemailer";
import verifyEmailTemplate from "./emailTemplate/verifyEmail.js"
import paymentVerifyTemplate from "./emailTemplate/paymentVerify.js"
import auctionWonTemplate from "./emailTemplate/auctionWon.js"

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    html: message,
  };
  await transporter.sendMail(options);
};


export const sendVerifyEmail = async (user, verificationCode, res) => {
  await sendEmail({
    email: user.email,
    subject: "Verify Email",
    message: verifyEmailTemplate(user,verificationCode)
  });

  res.status(200).json({
    success: true,
    message: `Verification email successfully sent to ${user.email}`,
  });
};


export const sendPaymentVerifyEmail = async ({
  user,
  updatedUserData,
  proof,
}) => {
  await sendEmail({
    email: user.email,
    subject: "Your Payment Has Been Successfully Verified And Settled",
    message: paymentVerifyTemplate({user, updatedUserData, proof}),
  });
};


export const sendAuctionWonEmail = async ({ auction, bidder, auctioneer }) => {
    const subject = `Congratulations! You won the auction for ${auction.title}`;
    const message = auctionWonTemplate({ auction, bidder, auctioneer })

    await sendEmail({ email: bidder.email, subject, message });
}
