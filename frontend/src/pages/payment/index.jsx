import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import "../../styles/payment.css";
import logo from "../../svgs/devMerge.png"
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

// Plan data
const plans = [
  {
    title: "Free Plan",
    price: "$0/month",
    amount: "0.00", // PayPal amount
    features: ["10 Free Merges", "Basic Support", "EXPLORE FOR FREE"],
    buttonText: "Get Started",
    isPayable: false, // Mark as non-payable
  },
  {
    title: "Pro Plan",
    price: "$10/month",
    amount: "10.00", // PayPal amount
    features: ["Unlimited Private Merges", "Advanced Support", "More Resources"],
    buttonText: "Subscribe Now",
    isPayable: true, // Mark as payable
  },
  {
    title: "Team Plan",
    price: "$20/month",
    amount: "20.00", // PayPal amount
    features: ["Collaboration Tools", "Team Management", "Priority Support"],
    buttonText: "Join Team",
    isPayable: true, // Mark as payable
  },
];

const USD_TO_INR_CONVERSION_RATE = 80; // Example conversion rate (USD to INR)

function Payment() {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // To store selected plan data
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  // Load PayPal script and handle button rendering dynamically
  useEffect(() => {
    const paypalScript = document.createElement("script");
    paypalScript.src = `https://www.paypal.com/sdk/js?client-id=AaL1AAxtaC3fmpBd2LLT5Ckzylh1d13DHnC1pZLCPPm-b5Z6CoSYBERA-xlV4NQgywuchAAkQ2hzvzxk&currency=USD`;
    paypalScript.async = true;
    paypalScript.onload = () => {
      if (window.paypal && selectedPlan !== null && selectedPlan.isPayable) {
        // Initialize PayPal button only for payable plans
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: selectedPlan.amount, // Dynamic amount from selected plan
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`Transaction completed for ${selectedPlan.title} by ${details.payer.name.given_name}`);
              setShowModal(false); // Close the modal after successful payment
            });
          },
          onError: (err) => {
            console.error("PayPal transaction error", err);
            alert("An error occurred with the payment.");
          },
        }).render("#paypal-button-container"); // Render PayPal button inside the modal
      }
    };
    document.body.appendChild(paypalScript);

    // Load Razorpay script
    const razorpayScript = document.createElement("script");
    razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
    razorpayScript.async = true;
    razorpayScript.onload = () => {
      setIsRazorpayLoaded(true);
    };
    document.body.appendChild(razorpayScript);

    return () => {
      // Clean up PayPal script on unmount
      document.body.removeChild(paypalScript);
      document.body.removeChild(razorpayScript);
    };
  }, [selectedPlan]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan); // Set selected plan data
    if (plan.isPayable) {
      setShowModal(true); // Open the modal for payable plans
    } else {
      // Redirect to the registration page for Free Plan
      navigate("/register");  // This will redirect to the register page
    }
  };

  // Convert USD to INR
  const convertUSDToINR = (usdAmount) => {
    return usdAmount * USD_TO_INR_CONVERSION_RATE;
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = () => {
    if (isRazorpayLoaded && selectedPlan) {
      const amountInINR = convertUSDToINR(selectedPlan.amount); // Convert USD to INR

      const options = {
        key: "rzp_test_CqFSyRVBMTaUY0", // Test Razorpay API key
        amount: amountInINR * 100, // Convert amount to paise
        currency: "INR",
        name: "DevMerge",
        description: selectedPlan.title,
        image: logo,
        handler: function (response) {
          toast.success(`Transaction completed with payment ID ${response.razorpay_payment_id}`, toastOptions);
          // alert(`Transaction completed with payment ID ${response.razorpay_payment_id}`);
          setShowModal(false); // Close modal after success
        },
        prefill: {
          name: "DevMerge User",
          email: "user@example.com",
        },
        theme: {
          color: "#F4C430",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      alert("Razorpay script is not loaded yet.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        {/* <h1>DevMerge</h1> */}
        <img id="img"src={logo} alt="Rocket"/>
      </header>
      <div className="pricing-container">
        {plans.map((plan, index) => (
          <div className="pricing-card" key={index}>
            <h3>{plan.title}</h3>
            <div className="price">{plan.price}</div>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="buy-button" onClick={() => handlePlanSelect(plan)}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Modal with PayPal Payment */}
      {showModal && selectedPlan && selectedPlan.isPayable && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{selectedPlan.title}</h2>
            <p className="modal-price">
              Price: <strong>{selectedPlan.price}</strong>
            </p>
            <p className="modal-proceed-text">Proceed with your payment below:</p>
            {/* PayPal button container inside the modal */}
            <div id="paypal-button-container"></div>

            {/* Razorpay Payment Button */}
            <button className="pay-razorpay" onClick={handleRazorpayPayment}>
              Pay with Razorpay (₹{convertUSDToINR(selectedPlan.amount)})
            </button>

            <button className="close-modal" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;