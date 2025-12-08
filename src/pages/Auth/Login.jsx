import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Login handle
  const handleLoginSubmit = (data) => {
    setError(null);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log("Logged in user:", result.user);
        toast.success("Login successful!");
        navigate(location?.state || '/')
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        toast.error(error.message);
      });
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
    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl my-12 lg:my-0">
      <h2 className="text-2xl md:text-3xl font-extrabold text-eye text-center my-6">
        Welcome To Login
      </h2>
      <p className="text-[18px] font-semibold text-center text-primary">
        Please login your account.
      </p>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <fieldset className="fieldset">
            {/* Email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            {/* Password field */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                id="password-input"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                className="input w-full"
                placeholder="Password"
              />

              {/* Show Password  */}
              <span
                onClick={() => setShow(!show)}
                className="absolute text-[17px] text-[#606162] top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
              >
                {show ? <FaEye /> : <IoMdEyeOff />}
              </span>
            </div>

            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required.</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must have at least one uppercase, lowercase, number,
                and special character.
              </p>
            )}

            {/* Forgot password */}
            <div className="flex justify-start my-2">
              <a
                onClick={handleForgotPassword}
                className="hover:underline text-sm text-primary font-medium cursor-pointer"
              >
                Forgot password?
              </a>
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            {/* Login Button*/}
            <button className="btn bg-primary text-white mt-4 w-full">
              Login
            </button>
            <p className="text-center text-[15px] mt-2">
              You don't have account?{" "}
              <Link
              state={location.state}
              to="/register">
                <span className="underline font-semibold text-primary text-[16px] cursor-pointer">
                  Please Register
                </span>
              </Link>
            </p>
          </fieldset>
          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default Login;
