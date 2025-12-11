import React from "react";


const LoadingPage = ({ message = "Loading Scholars..." }) => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-teal-50 to-white flex items-center justify-center z-50 overflow-hidden">
            <div className="text-center space-y-6">
                {/* Spinner Icon */}
                <div className="w-16 h-16 border-4 border-t-4 border-t-teal-500 border-gray-200 rounded-full animate-spin mx-auto"></div>
                
                {/* Loading Message */}
                <p className="text-xl md:text-2xl font-semibold text-primary animate-pulse">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default LoadingPage;