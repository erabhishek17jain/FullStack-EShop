import React, { useEffect, useState } from 'react';
import Heading from '../Products/Heading';
import Product from '../Products/ProductGridView';
import { useSelector } from 'react-redux';

const BestSellers = () => {
    const [data, setData] = useState([]);
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        const productsData = products ? [...products] : [];
        const sortedData = productsData?.sort((a, b) => b.sold_out - a.sold_out);
        const firstFive = sortedData && sortedData.slice(0, 4);
        setData(firstFive);
    }, [products]);

    return (
        <div className='w-full pb-20'>
            <Heading heading='Our Bestsellers' />
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10'>
                {data && data.map((i, index) => <Product data={i} key={index} />)}
            </div>
        </div>
    );
};

export default BestSellers;
