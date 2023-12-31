import React from 'react';
import Banner from '../../components/Banner/Banner';
import BannerBottom from '../../components/Banner/BannerBottom';
import BestSellers from '../../components/home/BestSellers/BestSellers';
import NewArrivals from '../../components/home/NewArrivals/NewArrivals';
import Sale from '../../components/home/Sale/Sale';
import SpecialOffers from '../../components/home/SpecialOffers/SpecialOffers';
import YearProduct from '../../components/home/YearProduct/YearProduct';

const Home = () => {
    return (
        <div className='lg:w-[96%] mx-[2%] px-4'>
            <Banner />
            <BannerBottom />
            <div className='max-w-container mx-auto'>
                <Sale />
                <NewArrivals />
                <BestSellers />
                <YearProduct />
                <SpecialOffers />
            </div>
        </div>
    );
};

export default Home;
