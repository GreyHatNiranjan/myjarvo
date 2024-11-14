"use client";
import React from "react";
// import { useRouter } from 'next/navigation'
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
    decerment,
    deleteFromCart,
    incerment,
} from "../lib/features/counter/counterSlice";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import Link from "next/link";



const CartBody = () => {
    // const router = useRouter()
    const cartItems = useAppSelector((state) => state.counter.cart);
    let newCartItems = cartItems?.filter((item) => {
        item != null;
        return item;
    });
    const subtotal = cartItems?.reduce(
        (total, item) => total + item.price * item.min_quantity,
        0
    );
    const total = cartItems?.reduce(
        (total, item) => total + item.discountedPrice * item.min_quantity,
        0
    );
    const dispatch = useAppDispatch();

    const handleRemove = (id) => {
        //Toast
        dispatch(deleteFromCart(id));
        toast.warn('Removed!', {
            position: "top-right",
            theme: "light",
            autoClose: 1800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleIncrement = (item) => {
        //Toast
        if (item.min_quantity < 5) {
            dispatch(incerment(item));

        }
    };

    const handleDecrement = (item) => {
        if (item.min_quantity > 1) {
            dispatch(decerment(item));
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                theme="light"
                autoClose={300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
            <div className="p-4 mt-8 max-w-[90vw] mx-auto">
                <table className="w-full table-auto border-collapse ">
                    <thead className="max-md:hidden">
                        <tr className="text-left">
                            <th className="p-2 border-b-2 border-gray-700">Product</th>
                            <th className="p-2 border-b-2 border-gray-700">Price</th>
                            <th className="p-2 border-b-2 border-gray-700">Quantity</th>
                            <th className="p-2 border-b-2 border-gray-700">Subtotal</th>
                            <th className="p-2 border-b-2 border-gray-700"></th>
                        </tr>
                    </thead>
                    <tbody className="max-md:flex max-md:flex-col">
                        {newCartItems?.length < 1 ? (
                            <tr>
                                <td className="text-red-500 py-3">Add something</td>
                            </tr>
                        ) : (
                            ""
                        )}
                        {newCartItems &&
                            newCartItems.map((item) => (
                                <tr key={item?.id} className="text-start max-md:my-4">
                                    <td className=" p-2 border-b max-md:border-none border-gray-700 max-md:mx-auto flex items-center max-md:w-[85vw] max-md:flex max-md:flex-col ">
                                        {/* <Image
                                            width={250}
                                            height={50}
                                            src={item?.image1}
                                            alt={item?.title}
                                            className="rounded-sm w-16 h-16 max-md:w-[60%]
                                    max-md:h-auto "
                                        /> */}
                                        <React.Suspense fallback={<div>Loading...</div>}>
                                            <Image
                                                width={250}
                                                height={50}
                                                src={item.image1 || '/fallback-image.png'}
                                                alt={item.title || 'Product Image'}
                                                className="rounded-sm w-16 h-16 max-md:w-[60%] max-md:h-auto"
                                            />
                                        </React.Suspense>
                                        <div className=" max-md:mt-5 ml-3  max-md:w-[70vw]  max-md:flex max-md:justify-between ">
                                            <span className="max-md:block hidden">Proudct</span>
                                            <span className="max-md:w-[70%]">{item?.title}</span>
                                        </div>
                                    </td>
                                    <td className="max-md:border-none p-2 border-b border-gray-700  max-md:w-[85vw] max-md:flex max-md:flex-col">
                                        <div className="max-md:my-1  max-md:w-[65vw] max-md:mx-auto  max-md:flex max-md:justify-between">
                                            <span className="mr-2 max-md:block hidden">Price</span>
                                            <span className="max-md:w-[70%] max-md:text-right ">
                                                ₹{item?.discountedPrice?.toFixed(2)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="max-md:border-none p-2 border-b border-gray-700  max-md:w-[85vw] max-md:flex max-md:flex-col">
                                        <div className="max-md:my-1  max-md:w-[65vw] max-md:mx-auto  max-md:flex max-md:justify-between">
                                            <span className="mr-2 max-md:block hidden">Quantity</span>
                                            <div className="max-md:max-w-[60%] max-md:text-right -mr-2 max-lg:">
                                                <button
                                                    className="rounded-md bg-gray-300 px-2 py-1 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30 max-lg:px-0 max-lg:py-0"
                                                    onClick={() => {
                                                        handleDecrement(item);
                                                    }}
                                                >
                                                    ➖
                                                </button>
                                                {/* {console.log(item?.min_quantity)} */}
                                                <span className="mx-2">{parseFloat(item?.min_quantity).toFixed(2)}</span>
                                                <button
                                                    className="rounded-md bg-gray-300 px-2 py-1 text-base font-medium text-black transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30 max-lg:px-0 max-lg:py-0"
                                                    onClick={() => {
                                                        handleIncrement(item);
                                                    }}
                                                >
                                                    ➕
                                                </button>
                                            </div>
                                        </div>
                                        {/* <input type="number" onChange={() => { }} value={item.quantity} min="1" className="w-12 p-1 text-center bg-gray-800 text-white" /> */}
                                    </td>
                                    <td className="max-md:border-none p-2 border-b border-gray-700  max-md:w-[85vw] max-md:flex max-md:flex-col">
                                        <div className="max-md:my-1  max-md:w-[65vw] max-md:mx-auto  max-md:flex max-md:justify-between">
                                            <span className="mr-2 max-md:block hidden">SubTotal</span>
                                            <span className="max-md:w-[70%] max-md:text-right ">
                                                ₹{(item?.discountedPrice * item?.min_quantity
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-2 max-md:p-0 border-b border-gray-700 max-md:w-[85vw] max-md:text-center">
                                        <button
                                            onClick={() => {
                                                handleRemove(item.id);
                                            }}
                                        >
                                            <Image
                                                width={20}
                                                height={20}
                                                src="/delete.svg"
                                                className="cursor-pointer w-8 "
                                                alt=""
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2 ">
                        <input
                            id="couponCode"
                            type="text"
                            placeholder="Coupon code"
                            className="p-2 bg-gray-300 w-40 md:w-64 rounded-md"
                        />
                        <button className="p-2 bg-black text-white rounded-md">Apply Coupon</button>
                    </div>
                    {/* <button className="p-2 bg-gray-700 text-white">Update Cart</button> */}
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-bold">Cart totals</h2>
                    <div className="flex justify-between mt-4">
                        <span>Subtotal</span>
                        <span>₹{subtotal && subtotal?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span>Discount</span>
                        <span>-{subtotal && total && (subtotal - total).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span>Total</span>
                        <span>₹{total && total.toFixed(2)}</span>
                    </div>

                </div>
            </div>
            <div className="w-full text-center my-10">
                <Link
                    className="block w-[80%] mx-auto rounded-md mt-4 p-3 md:px-0 text-center bg-green-500 hover:bg-green-600 text-white"
                    shallow
                    href="/checkout"
                >
                    Proceed To Checkout
                </Link>
            </div>

        </>
    );
};

export default CartBody;
