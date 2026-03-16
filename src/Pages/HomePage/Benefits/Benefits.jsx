import React from 'react';

import image1 from '../../../assets/live-tracking.png';
import image2 from '../../../assets/customer-top.png';
import image3 from '../../../assets/safe-delivery.png';

const data = [
    {
        title: "Live Parcel Tracking",
        description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: image1
    },
    {
        title: "100% Safe Delivery",
        description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: image3
    },
    {
        title: "24/7 Call Center Support",
        description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: image3
    }
]

const Benefits = () => {
    return (
        <div className='border-b border-dotted my-6'>
            {
                data.map((benefit, index) => (
                    <div key={index} className='md:flex items-center my-8 bg-white p-6 rounded-3xl'>
                        <div className='md:w-1/3 border-r border-dotted'>
                            <img  src={benefit.image} alt={benefit.title} />
                        </div>
                        <div className='md:w-2/3 md:ps-8 mt-4 md:mt-0'>
                            <h2 className="text-xl font-semibold mb-2">{benefit.title}</h2>
                            <p>{benefit.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Benefits;