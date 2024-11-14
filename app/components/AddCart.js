'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { addToCart } from "../lib/features/counter/counterSlice";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';



const AddCart = ({ sproduct }) => {
    const dispatch = useAppDispatch()
    const handleAddToCart = (item) => {
        toast.success('Added to Cart !', {
            position: "top-right",
            theme: "light",
            autoClose: 200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        if (typeof item == 'object') {
            dispatch(addToCart(item))
        }
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                theme="light"
                autoClose={200}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />

            <button type="button" className={`w-[40%] text-white bg-gradient-to-br from-red-500 to-red-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm  text-center me-2 mt-6 px-6 py-2.5 max-md:px-1 `} onClick={() => handleAddToCart(sproduct)}>Add to Cart</button>
            {/* {console.log(sproduct)} */}
        </>
    )
}

export default AddCart