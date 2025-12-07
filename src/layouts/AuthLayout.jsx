import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImg.png';
import Footer from '../pages/shared/Footer';
import NavBar from '../pages/shared/NavBar';

const AuthLayout = () => {
    return (
        <div>
            <NavBar />
            <div className='flex min-h-screen'>
                <div className='flex-1'>
                <Outlet />
            </div>
            <div className='flex-1'>
                <img src={authImg} alt="image" />
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;