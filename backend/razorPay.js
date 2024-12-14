import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Razorpay from 'razorpay';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// Initialize Express
const pay = express();
 // Default to 5000 if not provided

// Middleware setup
pay.use(bodyParser.json());
pay.use(bodyParser.urlencoded({ extended: true }));
pay.use(cors());

// Create Order Route
pay.post('/orders', async (req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // Ensure the amount is in paise (multiplying by 100)
    const amountInPaise = req.body.amount * 100; // Amount in INR

    const options = {
        amount: amountInPaise,
        currency: req.body.currency || 'INR', // Default to INR if currency is not specified
        receipt: `receipt#${Date.now()}`,
        payment_capture: 1 // Automatic payment capture
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount / 100 // Send amount in INR (not paise)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get Payment Details Route
pay.get("/payment/:paymentId", async (req, res) => {
    const { paymentId } = req.params;

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    try {
        const payment = await razorpay.payments.fetch(paymentId);

        if (!payment) {
            return res.status(500).json({ error: "Error fetching payment details" });
        }

        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount / 100, // Convert amount to INR
            currency: payment.currency
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch payment details" });
    }
});

// Verify Payment Signature Route
pay.post("/verify-payment", (req, res) => {
    const { payment_id, order_id, signature } = req.body;

    const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${order_id}|${payment_id}`)
        .digest('hex');

    if (generated_signature === signature) {
        res.json({ message: "Payment verified successfully" });
    } else {
        res.status(400).json({ error: "Payment verification failed" });
    }
});

export default pay;