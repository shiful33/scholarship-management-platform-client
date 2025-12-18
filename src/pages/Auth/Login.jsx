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
        await axios.post("http://localhost:3000/users", userInfo);
      } catch (userErr) {
        console.log("User already exists or error saving user");
      }

      const res = await axios.post("http://localhost:3000/jwt", {
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
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl my-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mt-6 text-[#0c5f5a]">
          Welcome To Login
        </h2>
        <p className="text-[18px] font-semibold text-center text-gray-500">
          Please login to your account.
        </p>
        <div className="card-body">

          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className="form-control">
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control mt-2">
              <label className="label font-semibold">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className="input input-bordered w-full"
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center my-4">
              <a
                onClick={handleForgotPassword}
                className="hover:underline text-sm text-[#0c5f5a] font-medium cursor-pointer"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn bg-[#0c5f5a] hover:bg-[#084642] text-white w-full"
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
