'use client'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const HeroSection = () => {
  return (
    <>
      <div className="w-[100%] h-[530px] max-md:h-[370px] max-md:hidden  mb-12">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
          <SwiperSlide><Image src="/LImage1.jpeg" width={1920} height={775} priority={true} className='object-fill  object-top w-full h-[530px] max-md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/LImage2.jpeg" width={1920} height={775} priority={true} className='object-cover object-top w-full h-[530px] max-md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/LImage3.jpeg" width={1920} height={775} priority={true} className='object-cover object-top w-full h-[530px] max-md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/LImage4.jpg" width={1920} height={775} priority={true} className='object-cover object-top w-full h-[530px] max-md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/LImage5.jpeg" width={1920} height={775} priority={true} className='object-cover object-top w-full h-[530px] max-md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/LImage6.jpeg" width={1920} height={775} priority={true} className='object-cover object-top w-full h-[530px] max-md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/LImage7.jpeg" width={1920} height={775} priority={true} className='object-cover object-top w-full h-[530px] max-md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
        </Swiper>

      </div>
      <div className="w-[100%] max-h-[60vh] max-md:visible md:hidden max-md:  mb-12">

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
          <SwiperSlide><Image src="/AImage1.webp" width={900} height={500} priority={true} className='w-full max-h-[60vh] h-auto md:hidden object-contain' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/AImage2.webp" width={900} height={500} priority={true} className='w-full h-auto max-h-[60vh] md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/AImage3.webp" width={900} height={500} priority={true} className='w-full max-h-[60vh] h-auto md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/AImage4.jpeg" width={900} height={500} priority={true} className='w-full max-h-[60vh] h-auto md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/AImage5.webp" width={900} height={500} priority={true} className='w-full max-h-[60vh] h-auto md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/AImage6.jpeg" width={900} height={500} priority={true} className='w-full max-h-[60vh] h-auto md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
          <SwiperSlide><Image src="/AImage7.webp" width={900} height={500} priority={true} className='w-full max-h-[60vh] h-auto md:hidden ' alt="Jarvo Cotton" /></SwiperSlide>
        </Swiper>

      </div>
    </>
  );
};

export default HeroSection;