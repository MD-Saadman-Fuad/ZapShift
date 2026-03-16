import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    console.log(parcelId)
    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            console.log(res.data);
            return res.data
        }
    })
    const handlePayment = async () => {
        const paymentInfo = {
            name: parcel.parcelName,
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            trackingId: parcel.trackingId,
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data)
        window.location.href = res.data.url;
    }
    if (isLoading) {
        return <div className='w-1/2 mx-auto'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }
    return (
        <div>

            <p>Please Pay ${parcel.cost} for {parcel.parcelName}</p>
            <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
        </div>
    );
};

export default Payment;