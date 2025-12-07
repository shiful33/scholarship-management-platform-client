import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signInUser } = useAuth();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
        .then(result => {
            console.log(result.user);  
        })
        .catch(error => {
            console.log(error);
        })
    }

  return (
    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl my-12 lg:my-0">
      <h2 className="text-2xl md:text-3xl font-extrabold text-eye text-center my-6">Welcome To Login</h2>
      <p className="text-[18px] font-semibold text-center text-primary">Please login your account.</p>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
          {/* Email field*/}
          <label className="label">Email</label>
          <input type="email" {...register('email', {required: true, minLength: 6})} className="input w-full" placeholder="Email" />
          {errors.email?.type === 'required' && (<p className="text-red-500">Email is required</p>)}

          {/* Password field*/}
          <label className="label">Password</label>
          <input type="password" {...register('password', {required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} className="input w-full" placeholder="Password" />
          {errors.password?.type === 'required' && (<p className="text-red-500">Password must be 6 characters or longer.</p>)}
          {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters.</p>}


          {/* Forgot password */}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          {/* Login Button*/}
          <button className="btn bg-primary mt-4">Login</button>
          <p className="text-center text-[15px] mt-2">You don't have account? <Link to="/register"><span className="underline font-semibold text-primary text-[16px] cursor-pointer">Please Register</span></Link></p>
        </fieldset>
        <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default Login;
