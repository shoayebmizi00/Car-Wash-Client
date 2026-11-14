import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Navbar from '@/components/layouts/Navbar';
import React from 'react';

const RootLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default RootLayout;