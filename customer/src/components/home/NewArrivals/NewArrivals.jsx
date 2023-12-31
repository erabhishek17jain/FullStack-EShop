import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import Heading from '../Products/Heading';
import Product from '../Products/ProductGridView';
import SampleNextArrow from './SampleNextArrow';
import SamplePrevArrow from './SamplePrevArrow';

const NewArrivals = () => {
    const [data, setData] = useState([]);
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        const productsData = products ? [...products] : [];
        const sortedData = productsData?.sort((a, b) => b.createdAt - a.createdAt);
        const firstFive = sortedData && sortedData.slice(0, 6);
        setData(firstFive);
    }, [products]);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };
    return (
        <div className='w-full pb-16'>
            <Heading heading='New Arrivals' />
            <Slider {...settings}>
                {data &&
                    data.map((i, index) => (
                        <div className='px-2' key={index}>
                            <Product data={i} key={index} />
                        </div>
                    ))}
            </Slider>
        </div>
    );
};

export default NewArrivals;
