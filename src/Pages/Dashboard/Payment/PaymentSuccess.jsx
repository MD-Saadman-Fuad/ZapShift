import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    // console.log('Payment Success Session ID:', sessionId);
    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log('Payment success updated:', res.data);
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                    })
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId]);
    return (
        <div>
            <h2 className='text-4xl'>Payment Successful</h2>
            <h3>Your Transaction Id: {paymentInfo?.transactionId}</h3>
            <h3>Your Tracking Id: {paymentInfo?.trackingId}</h3>
        </div>
    );
};

export default PaymentSuccess;