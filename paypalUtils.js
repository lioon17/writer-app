// paypalUtils.js
const { paypalClient } = require('./paypalClient');
const paypal = require('@paypal/checkout-server-sdk');

// Create PayPal order function
const createPayPalOrder = async (order) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: order.totalPrice.toFixed(2)
      },
      invoice_id: order.orderId.toString(), // Set the invoice_id to match orderId
      description: `Order #${order.orderId}`
    }]
  });

  const response = await paypalClient.execute(request);
  return response;
};

module.exports = { createPayPalOrder };
