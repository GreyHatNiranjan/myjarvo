'use client'
import { useEffect, useState } from "react";
import Header from "./Header";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { addToCart } from "../lib/features/counter/counterSlice";
import React from 'react';
import AddCart from "./AddCart";
import useCart from '../store/allProductDefault'
import { changeQuantity } from "../lib/features/counter/counterSlice";
// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'dotenv/config';

import { Navigation } from 'swiper/modules';


const SingleProduct = ({ id }) => {
    const cartItems = useAppSelector((state) => state.counter.cart);
    const [range, setRange] = useState(1)
    const { products } = useCart()
    const dispatch = useAppDispatch()
    const itemsNo = useAppSelector(state => state.counter.cart)

    const [sproduct, setSproduct] = useState({})
    const [loading, setLoading] = useState(false)
    const findProduct = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/singleProductFind/?id=${id}`);
            console.log(process.env.NEXT_PUBLIC_URL)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // console.log('Fetched Data:', data[0]); // Debugging: Log the fetched data

            if (data && data.length > 0 && data[0]) {
                setSproduct(data[0]);
                // console.log(sproduct);

            } else {
                console.log('No product found for the provided ID.');
            }

        } catch (error) {
            console.error('Error fetching product:', error.message);
        }
    };

    const findProduct2 = async () => {
        const response = products.filter(item => {
            return item.id == id
        });
        // console.log(response);

        setSproduct(response[0]);


    }
    useEffect(() => {
        setLoading(true);
        if (products.length > 1) {
            findProduct2();
            // console.log("2");

        } else {
            findProduct();
            // console.log("1");
        }
        setLoading(false);
        // console.log(products);
        // console.log(itemsNo);
        // console.log(sproduct);
        // setRange(sproduct?.min_quantity)

    }, []);
    useEffect(() => {
        if (sproduct && sproduct.min_quantity) {
            setRange(sproduct.min_quantity);
        }
        cartItems.map((item) => {
            if (item.id === sproduct?.id) {
                // console.log(true);
                setRange(item.min_quantity)
                //   return { ...item, min_quantity: action.payload.min_quantity };
            }
            return item;
        });
        // console.log(cartItems);

    }, [sproduct]);
    const changeQTY = (item) => {
        // console.log("Dispatching change quantity with item:", item); 
        dispatch(changeQuantity(item)); // item should have both id and min_quantity
    };

    return (
        <>
        {/* {console.log(sproduct)} */}
            <Header />

            <div className="px-4 w-[80%] max-lg:w-[90%]  mx-auto my-auto">
                {/* {!loading ? "" : <img src="/loading.gif" alt="loading..." />} */}
                <div className="container mx-auto flex gap-8 items-center max-md:flex-col">
                    {/* Left Item */}
                    <div className=" p-4 max-md:pt-0 flex flex-col items-center w-[40%] max-md:w-[100%] text-center">
                        <p className="uppercase text-sm tracking-widest  mb-2 ">Special Edition</p>
                        <h2 className="text-4xl max-md:text-lg font-bold mb-6">Refine Your Style</h2>
                        <div className=" border border-gray-300 p-4 rounded-md">
                            {!sproduct?.image1 ? <div className="flex justify-center items-center h-[300px] w-[300px] ">
                                
                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#af8a26]"></div>
                            </div> : <div className="w-[300px] h-[300px">
                                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                    <SwiperSlide><Image src={sproduct.image1} width={250} height={250} priority className="lg:h-[350px] rounded-md hover:cursor-pointer h-[300px] w-[300px]" alt="image" /></SwiperSlide>
                                    {sproduct.image2 ? <SwiperSlide><Image src={sproduct.image2} width={250} height={250} priority className="lg:h-[350px] rounded-md hover:cursor-pointer h-[300px] w-[300px]" alt="image" /></SwiperSlide> : ""}
                                    {sproduct.image3 ? <SwiperSlide><Image src={sproduct.image3} width={250} height={250} priority className="lg:h-[350px] rounded-md hover:cursor-pointer h-[300px] w-[300px]" alt="image" /></SwiperSlide> : ""}
                                    {sproduct.image4 ? <SwiperSlide><Image src={sproduct.image4} width={250} height={250} priority className="lg:h-[350px] rounded-md hover:cursor-pointer h-[300px] w-[300px]" alt="image" /></SwiperSlide> : ""}

                                </Swiper>
                                {/* {console.log(sproduct)} */}
                            </div>
                            }
                            {/* <image src="{sproduct.image}" alt="Makeup Collection" className="mb-4" /> */}
                            <p className="uppercase text-sm my-2">Clothing</p>
                            {/* <h3 className="text-2xl max-md:text-xl font-semibold">{sproduct.category}</h3> */}
                            <h3 className="text-2xl max-md:text-xl font-semibold">Pure Cotton</h3>
                            <p className="text-xl mt-2">₹{sproduct?.discountedPrice}/meter<span className="text-sm italic">&nbsp;only</span></p>
                        </div>
                    </div>

                    {/* Right Item */}
                    <div className="relative bg-cover bg-center max-md:pt-0 p-8 max-md:px-0 w-[50%] max-md:w-[100%]" >
                        {/* <div className="relative bg-cover bg-center p-8" style={{ backgroundImage: 'url(/path/to/image2.jpg)' }}> */}
                        <div className="absolute max-md:relative inset-0  bg-opacity-50 flex flex-col justify-center p-6 max-md:px-0">
                            <p className="uppercase text-sm  mb-2">Clothing</p>
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 max-md:text-2xl">{sproduct?.title}</h3>
                            <p className="text-xl mb-4"><span>₹{sproduct?.discountedPrice}/meter</span><span className="line-through ml-4">₹{sproduct?.price}/meter</span></p>
                            {/* {console.log(sproduct)} */}
                            {/* <p className="text-sm ">{sproduct.rating}/5</p> */}
                            {/* <p className="text-sm text-gray-400">Skin & Eye Primer<br />A Foundation & Concealer Palette</p> */}
                            <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">Quantity</div>
                                <div className="text-gray-700">Selected: {parseFloat(range).toFixed(2)} meter</div>
                                {/* <div className="text-gray-700">Selected: {parseFloat(sproduct?.min_quantity).toFixed(2)} meter</div> */}
                                {/* {console.log(range)} */}
                                {/* {console.log(sproduct)} */}
                                {/* <div className="flex items-center gap-2">

                              <span>1</span> */}
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="0.25"
                                    value={range}
                                    onChange={(e) => {
                                        const newRange = e.target.value;
                                        setRange(newRange);

                                        // Update the local state of sproduct with the new min_quantity
                                        setSproduct(prevState => ({ ...prevState, min_quantity: newRange }));

                                        // Dispatch the updated quantity for the product to the store
                                        changeQTY({ id: sproduct.id, min_quantity: newRange });
                                    }}
                                    className="w-full max-w-[80vw] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {/* <span>5</span>
                                    </div> */}

                                {/* <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="0.25"
                                    value={range || 1}
                                    onChange={(e) => {
                                        setRange(e.target.value);
                                        setSproduct(prevState => ({ ...prevState, min_quantity: e.target.value }));
                                        changeQTY(sproduct)

                                    }}
                                    className="w-full max-w-[80vw] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                /> */}

                                <div className="text-lg font-semibold">
                                    Total Price: ₹{(sproduct?.discountedPrice * range).toFixed(2)}
                                </div>
                            </div>



                            <span className="w-full flex max-md:justify-center">
                                <button type="button" className="w-[40%] text-white bg-gradient-to-br from-red-500 to-red-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm  text-center me-2 mt-6 max-md:mr-6 px-6 py-2.5 ">Buy Now</button>
                                <AddCart sproduct={sproduct} />
                            </span>
                            <p className="text-sm mt-16"><span className="text-base">Product Details </span><br />{sproduct?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct