import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { registerUser, updateUserProfile } = useAuth();

    const handleRegistration = (data) => {
      console.log('after register', data.photo[0]);
      const profileImg = data.photo[0];

        registerUser(data.email, data.password)
        .then(result => {
          console.log(result.user);

          // store the image in form data
          const formData = new FormData();
          formData.append('image', profileImg);

          // Send the photo to store and get the url
          const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

          axios.post(image_API_URL, formData)
          .then( res => {
            console.log('after image upload', res.data.data.url)
          })

          // update user profile in firebase
          const userProfile = {
            displayName : data.name,
            photoURL : res.data.data.url
          }
          
          updateUserProfile(userProfile)
          .then(() => {
            console.log('user profile updated done')
          })
          .catch(error => console.log(error))


        })
        .catch(error => {
          console.log(error);
        })
        
    }

  return (
    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl my-12 lg:my-0">
      <h2 className="text-2xl md:text-3xl font-extrabold text-eye text-center my-6">Welcome To Registration</h2>
      <p className="text-[18px] font-semibold text-center text-primary">Please register your account.</p>
      <div className="card-body">
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name field*/}
          <label className="label">Enter Your Name</label>
          <input type="text" {...register('name', {required: true})} className="input  w-full"
          placeholder="Enter Your Name" />
          {errors.name?.type === 'required' && <p className="text-red-500">Name is required.</p>}

          {/* Email field*/}
          <label className="label">Email</label>
          <input type="email" {...register('email', {required: true})} className="input  w-full" placeholder="Enter Email" />
          {errors.email?.type === 'required' && <p className="text-red-500">Email is required.</p>}

          {/* Photo field*/}
          <label className="label">Photo URL</label>
          <input type="file" {...register('photo', {required: true})} className="file-input  w-full" placeholder="Photo URL" />
          {errors.email?.type === 'required' && <p className="text-red-500">Photo is required.</p>}

          {/* Password field*/}
          <label className="label">Password</label>
          <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} className="input  w-full" placeholder="Password" />
          {errors.password?.type === 'required' && <p className="text-red-500">Password is required.</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 characters or longer.</p>}
          {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters.</p>}


          {/* Submit Button*/}
          <button className="btn bg-primary mt-4">Register Now</button>
          <p className="text-center text-[15px] mt-2">You've already registered? <Link to="/login"><span className="underline font-semibold text-primary text-[16px] cursor-pointer">Please Login</span></Link></p>
        </fieldset>
        <SocialLogin />
      </form>
    </div>
    </div>
  );
};

export default Register;
