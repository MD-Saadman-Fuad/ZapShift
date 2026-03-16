import React from 'react';
import image from '../../../assets/bookingIcon.png';
const works = [
    { id: 1, title: 'Booking Pick & Drop', description: 'From personal packages to business shipments — we deliver on time, every time.' },
    { id: 2, title: 'Cash On Delivery', description: 'From personal packages to business shipments — we deliver on time, every time.' },
    { id: 3, title: 'Delivery Hub', description: 'From personal packages to business shipments — we deliver on time, every time.' },
    { id: 4, title: 'Booking SME & Corporate', description: 'From personal packages to business shipments — we deliver on time, every time.' },
]

const WorkCards = () => {
    return (
        <div className='text-secondary'>
            <h1 className='text-2xl font-bold'>How It Works</h1>
            <div className='mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    works.map((work) => (

                        <div key={work.id} className='bg-white p-6 gap-2 rounded-3xl '>
                            <img src={image} alt="" />
                            <h3 className='font-bold'>{work.title}</h3>
                            <h4 className='text-sm'>{work.description}</h4>
                        </div>

                    ))
                }
            </div>
        </div>

    );
};

export default WorkCards;