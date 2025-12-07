import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImg.png';
import Footer from '../pages/shared/Footer';
import NavBar from '../pages/shared/NavBar';

const AuthLayout = () => {
    return (
        <div>
            <NavBar />
            <div className='lg:flex min-h-screen justify-center items-center m-4 lg:m-0'>
                <div className='flex-1'>
                <Outlet />
            </div>
            <div className='flex-1'>
                <h2 className='text-2xl font-bold text-eye mb-4'>Scholarship Top Students</h2>
                <img src={authImg} alt="image" className='border-4 p-8 shadow-xl border-teal-600 rounded-lg bg-teal-50'/>
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;