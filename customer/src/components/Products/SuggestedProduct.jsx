import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/styles';
import Product from '../home/Products/ProductGridView';

const SuggestedProduct = ({ data }) => {
    const { products } = useSelector((state) => state.products);
    const [productData, setProductData] = useState();

    useEffect(() => {
        const d = products && products?.filter((i) => i.category === data.category);
        setProductData(d);
    }, []);

    return (
        <div>
            {data ? (
                <div className={`p-4`}>
                    <h2 className='text-4xl text-primeColor font-titleFont font-bold'>Related Product</h2>
                    <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mt-8 mb-12'>
                        {productData && productData.map((i, index) => index < 8 && <Product data={i} key={index} />)}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SuggestedProduct;
