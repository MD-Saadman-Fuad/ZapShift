import React from 'react';
import image from '../../../assets/location-merchant.png'
const Satisfaction = () => {
    return (
        <div className='bg-accent flex flex-col md:flex-row justify-around items-center p-10 mt-20 rounded-lg'>

            <div className='text-white w-2/3 text-left'>
                <h2 className='text-4xl font-bold pt-10'>Merchant and Customer Satisfaction is Our First Priority</h2>
                <p className=' text-lg mt-4 mb-10'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                <div className='m-1 gap-4 flex flex-col sm:flex-row'>
                    <button className="btn btn-primary rounded-3xl text-black">Become a Merchant</button>
                    <button className="btn bg-accent border-primary text-primary rounded-3xl">Earn with ZapShift Courier</button>
                </div>
            </div>
            <img src={image} alt="Merchant and Customer Satisfaction" />

        </div>
    );
};

export default Satisfaction;