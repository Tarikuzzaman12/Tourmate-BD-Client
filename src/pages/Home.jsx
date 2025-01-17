import React from 'react';
import Slider from '../Components/Slider'
import OverView from '../Components/OverView';
import TourismGuide from '../Components/TourismGuide';
const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <OverView></OverView>
           <TourismGuide></TourismGuide>
        </div>
    );
};

export default Home;