import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer';
import NavBar from '../pages/shared/NavBar';
import ScrollToTop from '../components/scrollToTop';
import ChatBot from '../components/ChatBot';

const RootLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
            <ScrollToTop />
            <ChatBot />
        </div>
    );
};

export default RootLayout;