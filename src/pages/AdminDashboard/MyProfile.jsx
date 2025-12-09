import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ThreeDot } from "react-loading-indicators"; 
import { FaEnvelope, FaRegIdCard, FaUserCircle } from 'react-icons/fa';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
    const { user, loading } = useAuth(); 
    const axiosSecure = useAxiosSecure();

    const { data: profileData, isLoading: isProfileLoading } = useQuery({
        queryKey: ["userProfile", user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            
            const res = await axiosSecure.get(`/user/profile?email=${user.email}`); 
            return res.data;
        },
    });

    if (loading || isProfileLoading) {
        return (
            <div className="p-12 text-center flex justify-center items-center h-[70vh]">
                <ThreeDot color="#0c5f5a" size="medium" text="Loading Profile..." textColor="#0c5f5a" />
            </div>
        );
    }
    
    if (!user) {
        return (
            <div className="p-12 text-center text-red-600 font-semibold">
                You must be logged in to view this page.
            </div>
        );
    }

    const displayName = user?.displayName || "N/A";
    const userEmail = user?.email || "N/A";
    const userPhoto = user?.photoURL;
    const userRole = profileData?.role || ""; 
    const additionalInfo = profileData?.phone || "N/A"; 

    return (
        <div className="p-4 md:p-10 max-w-2xl mx-auto">
            <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10 border border-gray-200">
                
                <h2 className="text-3xl font-bold mb-8 text-center text-[#0c5f5a]">
                    My Profile
                </h2>

                <div className="flex flex-col items-center space-y-6">
                    {/* Profile Image */}
                    <div className="relative">
                        {userPhoto ? (
                            <img
                            src={userPhoto}
                            alt="User Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-[#0c5f5a] shadow-lg"
                            />
                        ) : (
                            <FaUserCircle className="w-32 h-32 text-gray-400" />
                        )}
                        {/* Role Badge */}
                        <span className={`absolute bottom-3.5 right-2 px-2 py-2 text-xs font-semibold border-1 border-white shadow-md rounded-full text-white ${userRole === 'Admin' ? 'bg-red-500' : 'bg-green-400'}`}>
                            {userRole}
                        </span>
                    </div>

                    {/* User Details */}
                    <div className="w-full space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                            <FaRegIdCard className="text-[#0c5f5a] text-xl" />
                            <div className="text-sm">
                                <p className="font-semibold text-gray-700">Name</p>
                                <p className="text-gray-600">{displayName}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                            <FaEnvelope className="text-[#0c5f5a] text-xl" />
                            <div className="text-sm">
                                <p className="font-semibold text-gray-700">Email</p>
                                <p className="text-gray-600">{userEmail}</p>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                            <FaRegIdCard className="text-[#0c5f5a] text-xl" />
                            <div className="text-sm">
                                <p className="font-semibold text-gray-700">Phone / Extra Info</p>
                                <p className="text-gray-600">{additionalInfo}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Edit Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => alert("Navigate to Edit Profile Page")}
                        className="btn bg-[#0c5f5a] hover:bg-[#08413e] text-white transition duration-200"
                    >
                        Edit Profile
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MyProfile;