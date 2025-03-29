import React from 'react'
import TopHeader from '../../components/shared/common/TopHeader';
import Footer from '../../components/shared/common/Footer';
import Header from '../../components/shared/common/Header';
import HomeSlider from '../../components/shared/common/HomeSlider';
import FeaturedProducts from '../../components/shared/common/FeaturedProducts';

const Home = () => {
    return (
      <div className='w-full'>
        <TopHeader />
        <Header />
        
        <HomeSlider />
        <FeaturedProducts />
        
        <Footer />
      </div>
    );
  };

export default Home