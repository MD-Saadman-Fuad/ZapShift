import React, { use } from 'react';
// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
// import { EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);
    // console.log(reviews);
    return (
        <div className='my-24 border-b border-t border-dotted pb-20 pt-10'>
            <div className='text-center mb-24'>
                <h3 className="text-3xl text-center font-bold my-8">What Our Customers Say</h3>
                <p className='max-w-2/3 mx-auto'>Trusted by businesses and individuals alike, our customers consistently highlight fast, reliable deliveries, clear tracking, and helpful support. Below you'll find real feedback from clients who improved delivery times, simplified returns, and scaled their operations using Zap Shift.</p>
            </div>

            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review.id}>
                        <ReviewCard review={review}></ReviewCard>
                    </SwiperSlide>)
                }
            </Swiper>

        </div>
    );
};

export default Reviews;