const makePaymentController = (req, res) => {
    const { amount, paymentMethod } = req.body; 
    
    
    res.json({ message: 'Payment successful', amount, paymentMethod });
  };
  
  module.exports = makePaymentController;