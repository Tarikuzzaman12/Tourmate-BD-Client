import React from 'react';
import Slider from '../Components/Slider'
import OverView from '../Components/OverView';
import TourismGuide from '../Components/TourismGuide';
import RandomStories from '../Components/RandomStories';
import TopDes from '../Components/TopDes';
import TourTip from '../Components/TourTip';
import UserTable from '../Components/UserTable';
const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <OverView></OverView>
           <TourismGuide></TourismGuide>
           <RandomStories></RandomStories>
           <UserTable></UserTable>
           <TopDes></TopDes>
           <TourTip></TourTip>
        </div>
    );
};

export default Home;