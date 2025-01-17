import React from 'react';
import Navber from '../Components/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navber></Navber>
           <div> <Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;