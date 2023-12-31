import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Layout/Breadcrumbs';

const Payment = () => {
    return (
        <div className='max-w-containerlg: mx-auto w-[96%] mx-[2%] px-4'>
            <Breadcrumbs title='Payment gateway' />
            <div className='pb-10'>
                <p>Payment gateway only applicable for Production build.</p>
                <Link to='/'>
                    <button className='w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300'>Explore More</button>
                </Link>
            </div>
        </div>
    );
};

export default Payment;
