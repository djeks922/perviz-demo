const {
  validatePaymentPayload
} = require('../square-server/schema');
const { ApiError, client: square } = require('../square-server/square');

const makePaymentController = async (req, res) => {
  const { amount, payload } = req.body;

  if (!validatePaymentPayload(payload)) {
    return res.status(400).send('Bad Request');
  }

  try {

    const payment = {
      idempotencyKey: payload.idempotencyKey,
      locationId: payload.locationId,
      sourceId: payload.sourceId,
      amountMoney: {
        amount,
        currency: 'USD',
      },
    };

    if (payload.customerId) {
      payment.customerId = payload.customerId;
    }

    if (payload.verificationToken) {
      payment.verificationToken = payload.verificationToken;
    }

    const paymentResponse = square.paymentsApi.createPayment(
      payment
    );
    const { result } = await paymentResponse.then((response) => {
      return response
    })


    return res.json({
      success: true,
      payment: {
        id: result.payment.id,
        status: result.payment.status,
        receiptUrl: result.payment.receiptUrl,
        orderId: result.payment.orderId,
      },
    });
  } catch (ex) {
    if (ex instanceof ApiError) {
      return res.status(400).send(ex.error);
    } else {
      return res.status(400).send(`Error creating payment on attempt ${ex}`);
    }
  }


};

module.exports = { makePaymentController };