import React from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import LoadingPage from '../LoadingPage';


const StudentProfile = () => {

    const { user, loading } = useAuth();

    const { role, isRoleLoading } = useRole(); 

    if (loading || isRoleLoading) {
        return <LoadingPage message="Loading profile data..." />;
    }

    if (!user) {
        return (
            <div className="p-8 text-center text-red-600 font-bold">
                Profile data not found. Please log in again.
            </div>
        );
    }
    
    const displayName = user?.displayName || 'N/A';
    const email = user?.email || 'N/A';
    const photoURL = user?.photoURL || 'https://i.ibb.co/L5kL2X5/default-avatar.png'; // ডিফল্ট ছবি

    return (
        <div className="p-4 md:p-8 bg-white shadow-xl rounded-lg min-h-[80vh]">
            <h2 className="text-4xl font-extrabold text-[#0c5f5a] mb-8 border-b-4 border-orange-500 pb-3">
                👤 My Profile
            </h2>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                
                {/* Profile Picture and Role Badge */}
                <div className="relative w-full lg:w-1/3 flex flex-col items-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-teal-500 shadow-2xl transition duration-500 hover:scale-[1.02]">
                        <img 
                            src={photoURL} 
                            alt={`${displayName}'s Profile`} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    
                    {/* Role Badge */}
                    <span className="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-full shadow-lg transform translate-y-0.5">
                        {role.toUpperCase()}
                    </span>
                </div>

                {/* 2. Profile Details */}
                <div className="w-full lg:w-2/3 space-y-6 text-gray-700">
                    <div className="border-b pb-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Full Name</h3>
                        <p className="text-2xl font-bold text-gray-900">{displayName}</p>
                    </div>

                    <div className="border-b pb-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Email Address</h3>
                        <p className="text-xl font-medium text-teal-600">{email}</p>
                    </div>

                    <div className="border-b pb-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Account Status</h3>
                        <p className="text-xl font-medium text-green-600">Active</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase">User ID</h3>
                        <p className="text-md text-gray-500">{user?.uid || 'N/A'}</p>
                    </div>

                    <button className="mt-8 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300">
                        Update Profile Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;