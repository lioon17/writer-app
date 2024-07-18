/*const axios = require('axios');
require('dotenv').config(); // Ensure you load environment variables

// Function to generate access token
async function generateAccessToken() {
    try {
        const response = await axios({
            url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'grant_type=client_credentials',
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error generating access token:', error.response ? error.response.data : error.message);
    }
}

// Function to create an order
exports.createOrder = async () => {
    try {
        const accessToken = await generateAccessToken();
        if (!accessToken) {
            throw new Error('Failed to generate access token');
        }

        const response = await axios({
            url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        items: [
                            {
                                name: 'writer check',
                                description: 'essay',
                                quantity: 1,
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: '100.00'
                                }
                            }
                        ],
                        amount: {
                            currency_code: 'USD',
                            value: '100.00',
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: '100.00'
                                }
                            }
                        }
                    }
                ],
                application_context: {
                    return_url: `${process.env.BASE_URL}/complete-order`,
                    cancel_url: `${process.env.BASE_URL}/cancel-order`,
                    shipping_preference: 'NO_SHIPPING',
                    user_action: 'PAY_NOW',
                    brand_name: 'writersblock.com'
                }
            })
        });

        // Extract approval link from the response
        const approvalLink = response.data.links.find(link => link.rel === 'approve').href;
        return approvalLink;
    } catch (error) {
        console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
};

// Invoke createOrder function to test it
exports.createOrder().then(approvalLink => {
    console.log('Approval Link:', approvalLink);
});

exports.capturePayment = async (orderId) => {
    try {
        const accessToken = await generateAccessToken();
        const response = await axios({
            url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data; // Return the captured payment data
    } catch (error) {
        throw new Error('Error capturing payment: ' + (error.response ? error.response.data : error.message));
    }
}; */