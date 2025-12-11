import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const CheckoutForm = ({ applicationFees, scholarshipId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const fees = applicationFees || 0;

  useEffect(() => {
    if (fees > 0) {
      axiosSecure
        .post("/create-payment-intent", { fees: fees })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error fetching client secret:", err);
          setError(
            "Could not initialize payment. Please check your fees amount."
          );
        });
    }
  }, [fees, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user || !user.email) {
      toast.error("User information is missing. Please log in again.");
      return;
    }

    setProcessing(true);
    setError("");

    if (fees <= 0) {
      const applicationData = {
        scholarshipId: scholarshipId,
        applicantEmail: user.email,
        transactionId: "FREE_APPLICATION",
        paidFees: 0,
        paymentDate: new Date(),
      };

      try {
        const res = await axiosSecure.post("/applications", applicationData);
        if (res.data.insertedId) {
          toast.success("Free scholarship application submitted successfully!");
          navigate("/dashboard/my-applications");
        } else {
          toast.warn("Application submission failed. Contact support.");
        }
      } catch (appError) {
        console.error("Application save error:", appError);
        toast.error("An error occurred during application saving.");
      }
      return;
    }

    if (!stripe || !elements || processing) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      setProcessing(false);
      return;
    }

    /* setProcessing(true);
    setError(""); */

    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "Anonymous User",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      toast.success(`Payment successful! Transaction ID: ${paymentIntent.id}`);

      const applicationData = {
        scholarshipId: scholarshipId,
        applicantEmail: user.email,
        transactionId: paymentIntent.id,
        paidFees: fees,
        paymentDate: new Date(),
      };

      try {
        const res = await axiosSecure.post("/applications", applicationData);
        if (res.data.insertedId) {
          toast.success("Scholarship application submitted successfully!");
          navigate("/dashboard/my-applications");
        } else {
          toast.warn(
            "Payment succeeded but application submission failed. Contact support."
          );
        }
      } catch (appError) {
        console.error("Application save error:", appError);
        toast.error("An error occurred during application saving.");
      }
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-lg mx-auto border border-teal-300"
    >
      <h3 className="text-xl font-bold text-center text-[#0c5f5a]">
        Application Fee: ${fees.toFixed(2)}
      </h3>

      {fees > 0 && (
        <div className="border p-4 rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      )}

      {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

      <button
        type="submit"
        className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 ${
          (fees > 0 && (!stripe || !clientSecret)) || processing
            ? "bg-gradient-to-r from-teal-400 to-orange-200 text-white font-semibold cursor-not-allowed"
            : "bg-teal-500 hover:bg-teal-600"
        }`}
        disabled={processing || (fees > 0 && (!stripe || !clientSecret))}
      >
        {processing
          ? "Processing..."
          : fees <= 0
          ? "Submit Application (Free)"
          : "Pay for Apply"}
      </button>

      {fees <= 0 && (
        <p className="text-center text-sm text-green-600 font-bold">
          No application fee required.
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
