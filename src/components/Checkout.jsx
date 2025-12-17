import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  

  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ["checkout-scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-scholarships/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
 return (
 <div className="p-12 text-center flex justify-center items-center h-[70vh]">
 <ThreeDot color="#0c5f5a" size="medium" text="Loading Checkout..." textColor="#0c5f5a" />
 </div>
 );
 }

 const applicationFees = scholarship.applicationFees || 0;
  
  if (!scholarship.scholarshipName) {
      return (
          <div className="p-12 text-center text-lg font-semibold text-red-600 h-[70vh]">
              Error: Scholarship details not found or failed to load.
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-[#0c5f5a] mb-6 text-center">
        Checkout & Apply
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Scholarship Summary */}
        <div className="space-y-4">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <h3 className="text-2xl font-bold">{scholarship.scholarshipName}</h3>
          <p className="text-lg font-semibold">{scholarship.universityName}</p>
          <p className="text-gray-600">{scholarship.scholarshipCategory}</p>
        </div>

        {/* Payment Details */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-xl font-bold mb-4">Payment Summary</h4>
            <div className="flex justify-between text-lg">
              <span>Application Fee:</span>
              <span className="font-bold text-green-600">${applicationFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t">
              <span>Amount:</span>
              <span className="text-teal-600">${applicationFees.toFixed(2)}</span>
            </div>
          </div>

          {/* CheckoutForm */}
          <CheckoutForm 
              applicationFees={applicationFees} 
              scholarshipId={scholarship._id} 
              scholarshipDetails={{
                  scholarshipName: scholarship.scholarshipName,
                  universityName: scholarship.universityName,
                  
              }}
          />

          {/* Pay Button */}
         {/*  <button
            onClick={handlePayAndApply}
            disabled={applyMutation.isPending}
            className="w-full py-4 bg-gradient-to-r from-teal-400 to-orange-300 text-white text-xl font-bold rounded-lg hover:from-orange-300 hover:to-teal-400 transform hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-70 cursor-pointer"
          >
            {applyMutation.isPending ? "Processing..." : "Pay for Apply"}
          </button> */}

          <p className="text-sm text-gray-500 text-center">
            By clicking, you agree to apply for this scholarship.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;