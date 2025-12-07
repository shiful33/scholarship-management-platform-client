import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegistration = (data) => {
        console.log('after register', data);
        
    }

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />
          {errors.email?.type === 'required' && <p className="text-red-500">Email is required.</p>}

          {/* Password */}
          <label className="label">Password</label>
          <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} className="input" placeholder="Password" />
          {errors.password?.type === 'required' && <p className="text-red-500">Password is required.</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 characters or longer.</p>}
          {errors.password?.type === 'pattern' && <p>Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters.</p>}

          

          {/* Forgot Password */}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          {/* Submit */}
          <button className="btn btn-neutral mt-4">Sign Up</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
