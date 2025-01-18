import React from 'react';
import Slider from '../Components/Slider'
import OverView from '../Components/OverView';
import TourismGuide from '../Components/TourismGuide';
import RandomStories from '../Components/RandomStories';
const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <OverView></OverView>
           <TourismGuide></TourismGuide>
           <RandomStories></RandomStories>
        </div>
    );
};

export default Home;