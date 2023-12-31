import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";


import ProductDetails from '../components/Products/ProductDetails';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
    const { products } = useSelector((state) => state.products);
    const { events } = useSelector((state) => state.events);
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [searchParams] = useSearchParams();
    const eventData = searchParams.get('isEvent');

    useEffect(() => {
        if (eventData !== null) {
            const data = events && events.find((i) => i._id === id);
            setData(data);
        } else {
            const data = products && products?.find((i) => i._id === id);
            setData(data);
        }
    }, [products, events]);

    return (
        <div className='w-full mt-8 mx-auto border-b-[1px] border-b-gray-300'>
            <div className='max-w-container mx-auto px-4'>
                <ProductDetails data={data} showDesc={true} />
                {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
            </div>
        </div>
    );
};

export default ProductDetailsPage;
