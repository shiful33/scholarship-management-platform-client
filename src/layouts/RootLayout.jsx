import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer';
import NavBar from '../pages/shared/NavBar';

const RootLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;