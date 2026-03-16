import React from 'react';
import error from '../../assets/Error.png';
import { Link } from 'react-router';
const Error = () => {
    return (
        <div className='text-center bg-white p-10 rounded-3xl space-y-6'>
            <div className=' rounded-2xl p-6 flex justify-center items-center'>
                <img src={error} alt="Error" />
            </div>
            <div>
                <p className='text-xl'>This page is Curently not available.</p>
                <p className='text-xl'>Please Go back to Home Page</p>
            </div>
            <Link to="/"><button className="btn bg-primary text-white ">Go Home</button></Link>
        </div>
    );
};

export default Error;