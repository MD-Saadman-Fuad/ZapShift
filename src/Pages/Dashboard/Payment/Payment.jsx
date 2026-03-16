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
        const amount = Number(parcel?.cost);
        if (!Number.isFinite(amount) || amount <= 0 || !parcel?._id || !parcel?.senderEmail || !parcel?.parcelName || !parcel?.trackingId) {
            alert('Invalid parcel payment data. Please refresh and try again.');
            return;
        }

        const paymentInfo = {
            name: parcel?.parcelName,
            cost: amount,
            parcelId: parcel?._id,
            senderEmail: parcel?.senderEmail,
            parcelName: parcel?.parcelName,
            trackingId: parcel?.trackingId,
        };

        try {
            const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
            if (!res?.data?.url) {
                throw new Error('Checkout URL was not returned from server');
            }
            window.location.href = res.data.url;
        } catch (error) {
            console.log('Failed to create checkout session', error?.response?.data || error?.message);
            alert('Payment initialization failed. Please try again in a moment.');
        }
    };
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