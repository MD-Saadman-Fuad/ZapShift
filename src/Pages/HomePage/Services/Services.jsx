import React from 'react';
import image from '../../../assets/service.png';
const data = [
    {
        "title": "Express & Standard Delivery",
        "description": "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
    },
    {
        "title": "Nationwide Delivery",
        "description": "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
    },
    {
        "title": "Fulfillment Solution",
        "description": "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
    },
    {
        "title": "Cash on Home Delivery",
        "description": "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
    },
    {
        "title": "Corporate Service / Contract In Logistics",
        "description": "Customized corporate services which includes warehouse and inventory management support."
    },
    {
        "title": "Parcel Return",
        "description": "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
    }
]

const Services = () => {
    return (
        <div className='bg-accent text-center my-4 text-secondary rounded-2xl '>
            <div className='p-6'>
                <h1 className='text-3xl text-white font-bold'>Our Services</h1>
                <p className='text-sm text-white max-w-xl mx-auto mt-2'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 m-4 pb-8'>
                {
                    data.map(service => (
                        <div className='text-secondary p-8 bg-white items-center rounded-3xl m-4'>

                            <img className='mx-auto' src={image} alt={service.title} />

                            <div>
                                <h3 className='text-xl font-bold my-3'>{service.title}</h3>
                                <p className='max-w-2xl text-sm mx-auto'>{service.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;