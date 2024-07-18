// paypalClient.js
const paypal = require('@paypal/checkout-server-sdk');

// PayPal environment setup
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);

// PayPal client setup
const paypalClient = new paypal.core.PayPalHttpClient(environment);

module.exports = { paypalClient };
