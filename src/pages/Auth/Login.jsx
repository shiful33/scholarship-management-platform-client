import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import axios from "axios";

const Login = () => {
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [show, setShow] = useState(false);
  const [ error, setError ] = useState(null);

  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const handleLoginSubmit = async (data) => {
    const { email, password } = data;
    setError(null);

    try {
      const result = await signInUser(email, password);
      const user = result.user;

      const userInfo = {
        email: user.email,
        name: user.displayName || "Existing User",
      };

      try {
        await axios.post("https://scholarship-management-platform-ser.vercel.app/users", userInfo);
      } catch (userErr) {
        console.log("User already exists or error saving user");
      }

      const res = await axios.post("https://scholarship-management-platform-ser.vercel.app/jwt", {
        email: user.email,
      });

      if (res.data.token) {
        localStorage.setItem("access-token", res.data.token);
        toast.success("Welcome Back! ✨");

        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        throw new Error("Token not received from server");
      }
    } catch (err) {
      console.error("Login Error Details:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  /* Forgot Password */
  const handleForgotPassword = () => {
    const email = getValues("email");
    if (!email) {
      toast.error("Please enter your email address in the field above.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email to reset password");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md my-12 border border-white shadow-2xl card bg-base-100 shrink-0">
        <h2 className="mt-6 text-2xl font-extrabold text-center md:text-3xl text-eye">
          Welcome To Login
        </h2>
        <p className="text-[18px] font-semibold text-center text-gray-500">
          Please login to your account.
        </p>
        <div className="card-body">

          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className="form-control">
              <label className="font-semibold label">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full input input-bordered"
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-2 form-control">
              <label className="font-semibold label">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className="w-full input input-bordered"
                  placeholder="Password"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute text-[17px] text-[#606162] top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
                >
                  {show ? <FaEye /> : <IoMdEyeOff />}
                </span>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between my-4">
              <a
                onClick={handleForgotPassword}
                className="hover:underline text-sm text-[#0c5f5a] font-medium cursor-pointer"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full text-white btn border-2-orange text-eye bg-gradient-to-r from-teal-400 to-orange-200 hover:from-orange-300 hover:to-teal-400"
            >
              Login
            </button>

            <p className="text-center text-[15px] mt-4">
              Don't have an account?{" "}
              <Link
                state={location.state}
                to="/register"
                className="underline font-semibold text-[#0c5f5a]"
              >
                Please Register
              </Link>
            </p>
          </form>

          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
