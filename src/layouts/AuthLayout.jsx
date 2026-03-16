import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authimage.png';
const AuthLayout = () => {
    return (
        <div className='max-w-7xl h-screen mx-auto p-10'>
            <Logo />
            <div className='flex justify-between items-center h-[90vh]'>
                
                <div className='flex-1'>
                    
                    <Outlet />
                </div>
                <div className='flex-1 hidden lg:block'>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;