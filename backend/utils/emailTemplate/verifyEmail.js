const verifyEmailTemplate = (user) => {
  const url = `${process.env.FRONTEND_URL}/verify-email?code=${user._id}`;

  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
  <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
  <br>
    <p style="font-size: 16px; color: #333;">Dear ${user.name}</p>    
    <p style="font-size: 16px; color: #333;">Thank you for registering.</p>
    <div style="text-align: center; margin: 20px 0;"> 
      <a href=${url} style="font-size: 16px;>
        Verify Email
      </a>
    </div>
      <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
      <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
        <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
      </footer>
    </div>
  `;
};

export default verifyEmailTemplate;
