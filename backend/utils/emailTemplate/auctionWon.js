const auctionWonTemplate = ({bidder, auction, auctioneer}) => {
  return `<div>
    <p>Dear ${bidder.userName},</p>
    <br> <br>
    <p>Congratulations! You have won the auction for ${auction.title}</p>
    <br> <br>
    <p>Before proceeding for payment contact your auctioneer via your auctioneer email:${auctioneer.email}</p> 
    <br> <br>
    <p>Please complete your payment using one of the following methods: </p>
    <br> <br>
    1. **Bank Transfer**: 
    <br>
    - Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName} 
    - Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber} 
    - Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}
    <br> <br>

    2. **PayPal**:
    <br>
    - Send payment to: ${auctioneer.paymentMethods.paypal.paypalEmail}
    <br> <br>

    3. **Cash on Delivery (COD)**:
    - If you prefer COD, you must pay 20% of the total amount upfront before delivery.
    - To pay the 20% upfront, use any of the above methods.
    - The remaining 80% will be paid upon delivery.
    - If you want to see the condition of your auction item then send your email on this: ${auctioneer.email}
    <br>

    <p>Please ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.</p>
    <br>
    <p>Thank you for participating!</p>
    <br>
    Best regards,
    <br>
    </div>`;
};
