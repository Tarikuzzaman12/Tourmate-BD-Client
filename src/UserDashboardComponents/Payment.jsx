import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = () => {
  const { id } = useParams(); // Booking ID
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe is not properly initialized!");
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card details are required.");
      return;
    }
  
    setLoading(true);
    try {
      // Fetch the client secret from your server
      const response = await fetch("https://tour-mate-bd-server-site.vercel.app/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId: id }),
      });
  
      const { clientSecret } = await response.json();
      if (!clientSecret) {
        throw new Error("Failed to create payment intent.");
      }
  
      // Confirm payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Your Name", // Replace with user name or billing info
          },
        },
      });
  
      if (error) {
        throw new Error(error.message);
      }
  
      // Update booking status after successful payment
      const paymentInfo = {
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      };
  
      const updateResponse = await fetch(`https://tour-mate-bd-server-site.vercel.app/bookings/${id}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentInfo }),
      });
  
      if (!updateResponse.ok) {
        throw new Error("Failed to update booking status after payment.");
      }
  
      toast.success("Payment successful! Booking status updated.");
      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Payment failed.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment for Booking</h1>
      <form onSubmit={handlePayment} className="space-y-4">
        <div className="border p-4 rounded shadow-sm bg-white">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="loader mr-2" /> Processing...
            </span>
          ) : (
            "Pay Now"
          )}
        </button>
      </form>
    </div>
  );
};

export default Payment;
