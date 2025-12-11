import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { ThreeDot } from 'react-loading-indicators';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';


// Stripe Publishable Key 
const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk); 

const Checkout = () => {
    const { id } = useParams(); 
    const axiosSecure = useAxiosSecure();

    const { 
        data: scholarship = {}, 
        isLoading 
    } = useQuery({
        queryKey: ["checkout-scholarship", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${id}`);
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

    return (
        <div className="p-4 md:p-10 min-h-[80vh] flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-2xl text-center">
                 <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Checkout: {scholarship.scholarshipName}
                </h1>
                <p className="text-xl text-[#0c5f5a] font-semibold mb-8">
                    University: {scholarship.universityName}
                </p>

                {/* Stripe Elements Provider */}
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        applicationFees={applicationFees} 
                        scholarshipId={id}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;