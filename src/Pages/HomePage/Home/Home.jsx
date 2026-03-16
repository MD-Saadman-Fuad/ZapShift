import React from 'react';
import Banner from '../Banner/Banner';
import WorkCards from '../WorkCards/WorkCards';
import Services from '../Services/Services';
import Helped from '../Helped/Helped';
import Benefits from '../Benefits/Benefits';
import Satisfaction from '../Satisfaction/Satisfaction';
import Reviews from '../Reviews/Reviews';
import Faq from '../FAQ/Faq';
const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner />
            <WorkCards />
            <Services />
            <Helped />
            <Benefits />
            <Satisfaction />
            <Reviews reviewsPromise={reviewsPromise} />
            <Faq />
        </div>
    );
};

export default Home;