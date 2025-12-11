import { Link } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../assets/animations/404-error.json";

const ErrorPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-teal-100 to-orange-50 flex flex-col items-center justify-center px-4">
      {/* Lottie Animation */}
      <div className="w-full max-w-md mx-auto">
        <Lottie
          animationData={errorAnimation}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Error Message */}
      <div className="text-center mt-8">
        <h1 className="text-6xl md:text-8xl font-extrabold text-teal-600 mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Oops! Page Not Found
        </h2>
        {/* <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p> */}

        {/* Back to Home Button */}
        <Link to="/">
          <button className="px-8 py-4 bg-gradient-to-r from-teal-400 to-orange-300 text-white text-lg font-semibold rounded-full hover:from-orange-300 hover:to-teal-300 transform hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer">
            Back to Home
          </button>
        </Link>
      </div>

      {/* Optional Footer */}
      <p className="absolute bottom-8 text-gray-500 text-sm">
        © 2025 Scholarship Platform. All rights reserved By | Shiful Islam
      </p>
    </div>
  );
};

export default ErrorPage;