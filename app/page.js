import dynamic from 'next/dynamic';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
// import FeaturedProducts from './components/FeaturedProducts';
// import Footer from './components/Footer';
// import AllProducts from './components/AllProducts';
const Footer = dynamic(()=>import('./components/Footer'))
const AllProducts = dynamic(()=>import('./components/AllProducts'))


export default function Home() {
  
  
  return (
    <div className="min-h-[150vh]">
      <Header />
      <HeroSection />
      {/* <FeaturedProducts /> */}
      <AllProducts />
      <Footer />
    </div>
  );
}
