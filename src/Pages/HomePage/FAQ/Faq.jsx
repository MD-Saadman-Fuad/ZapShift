import React from 'react';

const Faq = () => {
    const faqs = [
        {
            q: "How do I book a ride?",
            a: "Simply open the app, choose your pickup and drop-off locations, and confirm your ride request.",
        },
        {
            q: "Can I send parcels through the app?",
            a: "Yes! Select the Parcel Delivery option, enter parcel details, choose a rider, and you're done.",
        },
        {
            q: "Is my parcel safe?",
            a: "All deliveries are tracked in real-time, and riders are verified to ensure secure delivery.",
        },
        {
            q: "What payment methods are available?",
            a: "We support cash, mobile banking, and digital wallet payments.",
        },
        {
            q: "How do I contact support?",
            a: "You can reach support from the Help Center inside the app for quick assistance.",
        },
    ];
    return (
        <section className='border-b border-dotted my-20'>
            <h2 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h2>
            <p className='text-secondary text-center max-w-1/2 mx-auto mb-10'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>


            <div className="space-y-4 p-4 pb-20">
                {faqs.map((item, idx) => (
                    <details
                        key={idx}
                        className="group border-2 border-primary rounded-2xl p-5 hover:shadow-primary/40 transition-all"
                    >
                        <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center">
                            {item.q}
                            <span className=" transition-transform group-open:rotate-180 text-xl">⌄</span>
                        </summary>
                        <p className="mt-3 text-base opacity-80 leading-relaxed">{item.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
};

export default Faq;