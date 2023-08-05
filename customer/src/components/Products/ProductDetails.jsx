import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../../server';
import styles from '../../styles/styles';
import { toast } from 'react-toastify';
import Ratings from './Ratings';
import axios from 'axios';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetails = ({ data, showDesc }) => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.products);
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (wishlist && wishlist.find((i) => i._id === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [data, wishlist]);

    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
            toast.error('Item already in cart!');
        } else {
            if (data.stock < 1) {
                toast.error('Product stock limited!');
            } else {
                const cartData = { ...data, qty: count };
                dispatch(addToCart(cartData));
                toast.success('Item added to cart successfully!');
            }
        }
    };

    const totalReviewsLength = products && products.reduce((acc, product) => acc + product.reviews.length, 0);
    const totalRatings = products && products.reduce((acc, product) => acc + product.reviews.reduce((sum, review) => sum + review.rating, 0), 0);
    const avg = totalRatings / totalReviewsLength || 0;
    const averageRating = avg.toFixed(2);

    const handleMessageSubmit = async () => {
        if (isAuthenticated) {
            const groupTitle = data._id + user._id;
            const userId = user._id;
            const sellerId = data.shop._id;
            await axios
                .post(`${server}/conversation/create-new-conversation`, {
                    groupTitle,
                    userId,
                    sellerId,
                })
                .then((res) => {
                    navigate(`/inbox?${res.data.conversation._id}`);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        } else {
            toast.error('Please login to create a conversation');
        }
    };

    return (
        <div className='bg-white'>
            {data ? (
                <div className={`w-full 800px:w-[80%] px-6`}>
                    <div className='w-full py-5'>
                        <div className='flex flex-col lg:flex-row md:flex-col sm:flex-col w-full'>
                            <div className='w-full 800px:w-[50%]'>
                                <img src={`${data && data.images[select]?.url}`} alt='' className='w-[80%]' />
                                <div className='w-full flex'>
                                    {data &&
                                        data.images.map((i, index) => (
                                            <div className={`${select === 0 ? 'border' : 'null'} cursor-pointer`}>
                                                <img
                                                    src={`${i?.url}`}
                                                    alt=''
                                                    className='h-[200px] overflow-hidden mr-3 mt-3'
                                                    onClick={() => setSelect(index)}
                                                />
                                            </div>
                                        ))}
                                    <div className={`${select === 1 ? 'border' : 'null'} cursor-pointer`}></div>
                                </div>
                            </div>
                            <div className='w-full 800px:w-[50%]'>
                                <h1 className={`${styles.productTitle} mb-3`}>{data.name}</h1>
                                <p className='h-36'>{data.description}</p>
                                <div className='flex pt-3 pr-4 mt-4 justify-end'>
                                    <h4 className={`${styles.productDiscountPrice} text-3xl`}>&#8377; {data.discountPrice}</h4>
                                    <h3 className={`${styles.price} text-2xl`}>{data.originalPrice ? <>&#8377; {data.originalPrice}</> : null}</h3>
                                </div>

                                <div className='flex items-center mt-4 justify-between pr-3'>
                                    <div className='w-1/4 flex items-center gap-6 text-lg ml-3'>
                                        {click ? (
                                            <AiFillHeart
                                                size={30}
                                                className='cursor-pointer'
                                                onClick={() => removeFromWishlistHandler(data)}
                                                color={click ? 'red' : '#333'}
                                                title='Remove from wishlist'
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                size={30}
                                                className='cursor-pointer'
                                                onClick={() => addToWishlistHandler(data)}
                                                color={click ? 'red' : '#333'}
                                                title='Add to wishlist'
                                            />
                                        )}
                                    </div>
                                    <div className='w-3/4 flex justify-end items-center gap-6 text-lg'>
                                        <span
                                            onClick={decrementCount}
                                            className='w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300'>
                                            -
                                        </span>
                                        <p>{count}</p>
                                        <span
                                            onClick={incrementCount}
                                            className='w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300'>
                                            +
                                        </span>
                                        <div
                                            className={
                                                'my-2 flex justify-center items-center bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold'
                                            }
                                            onClick={() => addToCartHandler(data._id)}>
                                            <span className='text-white flex items-center'>
                                                Add to cart <AiOutlineShoppingCart className='ml-1' />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center mt-4 justify-between pr-3'>
                                    <img src={`${data?.shop?.avatar?.url}`} alt='' className='w-[50px] h-[50px] rounded-full mr-2' />
                                    <div className='pr-8'>
                                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>{data.shop.name}</h3>
                                        <h5 className='pb-3 text-[15px]'>({averageRating}/5) Ratings</h5>
                                    </div>
                                    <div
                                        className={
                                            'my-2 flex justify-center items-center bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold'
                                        }
                                        onClick={handleMessageSubmit}>
                                        <span className='text-white flex items-center'>
                                            Send Message <AiOutlineMessage className='ml-1' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showDesc && <ProductDetailsInfo data={data} products={products} totalReviewsLength={totalReviewsLength} averageRating={averageRating} />}
                </div>
            ) : null}
        </div>
    );
};

const ProductDetailsInfo = ({ data, products, totalReviewsLength, averageRating }) => {
    const [active, setActive] = useState(1);

    return (
        <div className='bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded'>
            <div className='w-full flex justify-between border-b pt-10 pb-2'>
                <div className='relative'>
                    <h5 className={'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'} onClick={() => setActive(1)}>
                        Product Details
                    </h5>
                    {active === 1 ? <div className={`${styles.active_indicator}`} /> : null}
                </div>
                <div className='relative'>
                    <h5 className={'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'} onClick={() => setActive(2)}>
                        Product Reviews
                    </h5>
                    {active === 2 ? <div className={`${styles.active_indicator}`} /> : null}
                </div>
                <div className='relative'>
                    <h5 className={'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'} onClick={() => setActive(3)}>
                        Seller Information
                    </h5>
                    {active === 3 ? <div className={`${styles.active_indicator}`} /> : null}
                </div>
            </div>
            {active === 1 ? (
                <>
                    <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>{data.description}</p>
                </>
            ) : null}

            {active === 2 ? (
                <div className='w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll'>
                    {data &&
                        data.reviews.map((item, index) => (
                            <div className='w-full flex my-2'>
                                <img src={`${data.user.avatar?.url}`} alt='' className='w-[50px] h-[50px] rounded-full' />
                                <div className='pl-2 '>
                                    <div className='w-full flex items-center'>
                                        <h1 className='font-[500] mr-3'>{data.user.name}</h1>
                                        <Ratings rating={data?.ratings} />
                                    </div>
                                    <p>{data.comment}</p>
                                </div>
                            </div>
                        ))}

                    <div className='w-full flex justify-center'>{data && data.reviews.length === 0 && <h5>No Reviews have for this product!</h5>}</div>
                </div>
            ) : null}

            {active === 3 && (
                <div className='w-full block 800px:flex p-5'>
                    <div className='w-full 800px:w-[50%]'>
                        <div className='flex items-center'>
                            <img src={`${data?.shop?.avatar?.url}`} className='w-[50px] h-[50px] rounded-full' alt='' />
                            <div className='pl-3'>
                                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                                <h5 className='pb-2 text-[15px]'>({averageRating}/5) Ratings</h5>
                            </div>
                        </div>
                        <p className='pt-2'>{data.shop.description}</p>
                    </div>
                    <div className='w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end'>
                        <div className='text-left'>
                            <h5 className='font-[600]'>
                                Joined on: <span className='font-[500]'>{data.shop?.createdAt?.slice(0, 10)}</span>
                            </h5>
                            <h5 className='font-[600] pt-3'>
                                Total Products: <span className='font-[500]'>{products && products.length}</span>
                            </h5>
                            <h5 className='font-[600] pt-3'>
                                Total Reviews: <span className='font-[500]'>{totalReviewsLength}</span>
                            </h5>
                            <Link to='/'>
                                <div
                                    className={
                                        'my-2 flex justify-center items-center bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold'
                                    }>
                                    <h4 className='text-white'>Visit Shop</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;