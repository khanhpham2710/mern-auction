const paymentVerifyTemplate = ({user, updatedUserData, proof}) => {
  const settlementDate = new Date(Date.now()).toString().substring(0, 15);

  return `
  <div>
    <p>Dear ${user.userName},</p>    
    <br>
    <br>
    <p>We are pleased to inform you that your recent payment has been successfully verified and settled. </p>
    <p>Thank you for promptly providing the necessary proof of payment. Your account has been updated, and you can now proceed with your activities on our platform without any restrictions.<p>
    <br>
    <p>Payment Details:\nAmount Settled: ${proof.amount}</p>
    <br>
    <p>Unpaid Amount: ${updatedUserData.unpaidCommission}</p>
    <p>Date of Settlement: ${settlementDate}</p>
    <br>
    <br>
    <p>Best regards,</p>
    <br>
    </div>`;
};

export default paymentVerifyTemplate;