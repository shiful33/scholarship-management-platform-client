import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);

  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const handleRegistration = async (data) => {
    const profileImg = data.photo[0];
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

    try {
      const result = await registerUser(data.email, data.password);
      const firebaseUser = result.user;

      const formData = new FormData();
      formData.append("image", profileImg);
      const imgRes = await axios.post(image_API_URL, formData);
      const imgURL = imgRes.data.data.url;

      const userProfile = {
        displayName: data.name,
        photoURL: imgURL,
      };
      await updateUserProfile(userProfile);

      const userInfo = {
        name: data.name,
        email: data.email,
        image: imgURL,
        role: "student",
      };
      
      const dbRes = await axios.post("https://scholarship-management-platform-ser.vercel.app/users", userInfo);

      if (dbRes.data.insertedId || dbRes.data.message === 'User already exists') {
        const jwtRes = await axios.post("https://scholarship-management-platform-ser.vercel.app/jwt", { email: data.email });
        if (jwtRes.data.token) {
          localStorage.setItem("access-token", jwtRes.data.token);
          toast.success("Registration Successful!");
          navigate(location.state || "/");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl my-12 lg:my-0">
      <h2 className="text-2xl md:text-3xl font-extrabold text-eye text-center my-6">
        Welcome To Registration
      </h2>
      <p className="text-[18px] font-semibold text-center text-primary">
        Please register your account.
      </p>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset">
            {/* Name field*/}
            <label className="label">Enter Your Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input  w-full"
              placeholder="Enter Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required.</p>
            )}

            {/* Email field*/}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input  w-full"
              placeholder="Enter Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required.</p>
            )}

            {/* Photo field*/}
            <label className="label">Photo URL</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input  w-full"
              placeholder="Photo URL"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Photo is required.</p>
            )}

            {/* Password field*/}
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={show ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                className="input w-full"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer.
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must have at least one uppercase, at least one
                  lowercase, at least one number, and at least one special
                  characters.
                </p>
              )}

              {/* Show Password */}
              <span
                onClick={() => setShow(!show)}
                className="absolute text-[17px] right-10 top-96 text-[#606162] cursor-pointer"
              >
                {show ? <FaEye /> : <IoMdEyeOff />}
              </span>

              {errors.password?.type === 'required' && <p className="text-red-500">Password is required.</p>}
            </div>

            {/* Submit Button*/}
            <button className="btn bg-primary mt-4">Register Now</button>
            <p className="text-center text-[15px] mt-2">
              You've already registered?{" "}
              <Link state={location.state} to="/login">
                <span className="underline font-semibold text-primary text-[16px] cursor-pointer">
                  Please Login
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

export default Register;
