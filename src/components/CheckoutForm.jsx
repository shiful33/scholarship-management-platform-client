import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CheckoutForm = ({
  applicationFees,
  scholarshipId,
  scholarshipTitle,
  scholarshipDetails,
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  console.log(scholarshipDetails)

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log("Final Check - Passed Details:", scholarshipDetails);

  const fees = applicationFees || 0;

  useEffect(() => {
    if (fees > 0 && user?.email) {
      const amountInCents = Math.round(fees * 100);

      axiosSecure
        .post("/create-payment-intent", { price:   amountInCents })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error fetching client secret:", err);
          setError(
            "Could not initialize payment. Check server or fees amount."
          );
          setClientSecret("");
        });
    } else if (fees <= 0) {
      setClientSecret(null);
    }
  }, [fees, axiosSecure, user?.email]);

  const saveApplication = async (transactionId, paidAmount) => {
    const scholarshipName = scholarshipDetails?.scholarshipName || "Unknown Scholarship";
    console.log(scholarshipDetails)
        const universityName = scholarshipDetails?.universityName || "Unknown University";

    const applicationData = {
      scholarshipId: scholarshipId,
      scholarshipTitle: scholarshipName,
      universityName: universityName,
      applicantEmail: user.email,
      applicantName: user.displayName || "User",
      transactionId: transactionId,
      paidFees: paidAmount,
      status: "Pending",
      appliedDate: new Date(),
    };

    try {
      const res = await axiosSecure.post("/applications", applicationData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Payment Successful!",
          text: `Application submitted. Transaction ID: ${transactionId}`,
          icon: "success",
          confirmButtonText: "View Applications",
          confirmButtonColor: "#0c5f5a",
        }).then(() => {
          navigate("/dashboard/my-applications");
        });
      } else {
        toast.warn(
          "Payment succeeded but application submission failed. Contact support."
        );
      }
    } catch (appError) {
      console.error("Application save error:", appError);
      toast.error("An error occurred during application saving.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user || !user.email) {
      toast.error("User information is missing. Please log in again.");
      return;
    }

    if (
      fees > 0 &&
      (!scholarshipDetails || !scholarshipDetails.scholarshipName)
    ) {
      toast.error(
        "Scholarship details are missing. Cannot proceed with payment."
      );
      return;
    }

    if (fees <= 0) {
      setProcessing(true);
      await saveApplication("FREE_APPLICATION", 0);
      setProcessing(false);
      return;
    }

    if (!stripe || !elements || !clientSecret) {
      toast.error("Payment gateway is not ready. Please wait a moment.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      toast.error("Card details are incomplete.");
      return;
    }

    const confirmationResult = await Swal.fire({
      title: "Confirm Payment",
      text: `Are you sure you want to pay $${fees.toFixed(
        2
      )} for this scholarship application?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay Now",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0c5f5a",
      cancelButtonColor: "#d33",
    });

    if (!confirmationResult.isConfirmed) {
      return;
    }

    setProcessing(true);
    setError("");

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
      toast.error(`Payment failed: ${confirmError.message}`);
    } else if (paymentIntent.status === "succeeded") {
      await saveApplication(paymentIntent.id, fees);
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
            ? "bg-teal-to-r from-teal-300 to-orange-200 text-white font-semibold cursor-not-allowed"
            : "bg-teal-500 hover:bg-teal-600 cursor-pointer"
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
