import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
    const { products } = useSelector((state) => state.products);
    const { allEvents } = useSelector((state) => state.events);
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [searchParams] = useSearchParams();
    const eventData = searchParams.get('isEvent');

    useEffect(() => {
        if (eventData !== null) {
            const data = allEvents && allEvents.find((i) => i._id === id);
            setData(data);
        } else {
            const data = products && products?.find((i) => i._id === id);
            setData(data);
        }
    }, [products, allEvents]);

    return (
        <div className='w-full mt-8 mx-auto border-b-[1px] border-b-gray-300'>
            <div className='max-w-container mx-auto px-4'>
                <ProductDetails data={data} showDesc={true} isEvent={eventData !== null} />
            </div>
        </div>
    );
};

export default ProductDetailsPage;
