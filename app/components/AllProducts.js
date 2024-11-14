"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { useAppDispatch } from "../lib/hooks";
import { addToCart } from "../lib/features/counter/counterSlice";
import 'dotenv/config'
import useCart from '../store/allProductDefault'

import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const AllProducts = () => {
    const { products } = useCart()
    // loading
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const router = useRouter()
    // const [products, setProducts] = useState([])
    const fetchPosts = useCart((state) => state.fetchPosts)
    
    // const fetchAllProductDataSupabase = () => {
        
        // const response = await fetch(`/api/supabase`)
        // if (response) {
            //     const data = await response?.json()
            //     let arrData = data.Products
            //     setProducts(arrData)
            //     addToCart(arrData)
            // }
            
        // }
        // if (loading) {
            //     // Skeleton loading state
    //     return (
        
    //     );
    //   }
    useEffect(() => {
        
        if(products.length<1){
            // setLoading(false)
            const loadData = async () => {
                await fetchPosts();  // Wait for the data to be fetched
                setLoading(false);   // Set loading to false once the data is fetched
            };
            loadData();
        }else{
            setLoading(false)
        }
        
        // fetchAllProductDataSupabase()
        
        // fetchPosts()
        // setLoading(false)
        // console.log(products);
        
    }, [fetchPosts])
    

    const handleAddToCart = (item, e) => {
        e.stopPropagation()
        if (typeof item == 'object') {
            dispatch(addToCart(item))
            toast.success('Added to Cart !', {
                position: "top-right",
                theme: "light",
                autoClose: 200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
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
            <div className="flex  justify-center gap-4 max-md:gap-1">
                <span className="w-16 border border-black h-0 top-4 relative max-md:w-7"></span>
                <h1 className="text-3xl font-bold text-center mb-8 max-md:min-w-fit">Premium Products</h1>
                <span className="w-16 border border-black h-0 top-4 relative max-md:w-7"></span>
            </div>
            {/* {!loading && <img src="" alt="Your Image" />} */}
            {/* all products */}
            {loading && <div className="flex justify-around flex-wrap">
                <div className="flex flex-col items-center justify-between max-md:w-[45vw] w-[30vw] p-4 border mb-3 border-gray-200 rounded-lg animate-pulse">
                    <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
                    <div className="mt-4 w-3/4 h-5 bg-gray-300 rounded-md"></div>
                    <div className="mt-2 w-1/2 h-4 bg-gray-300 rounded-md"></div>
                    <div className="mt-4 w-full h-10 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="flex flex-col items-center justify-between max-md:w-[45vw] w-[30vw] p-4 border mb-3  border-gray-200 rounded-lg animate-pulse">
                    <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
                    <div className="mt-4 w-3/4 h-5 bg-gray-300 rounded-md"></div>
                    <div className="mt-2 w-1/2 h-4 bg-gray-300 rounded-md"></div>
                    <div className="mt-4 w-full h-10 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="flex flex-col items-center justify-between max-md:w-[45vw] w-[30vw] p-4 border mb-3 border-gray-200 rounded-lg animate-pulse">
                    <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
                    <div className="mt-4 w-3/4 h-5 bg-gray-300 rounded-md"></div>
                    <div className="mt-2 w-1/2 h-4 bg-gray-300 rounded-md"></div>
                    <div className="mt-4 w-full h-10 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="flex flex-col items-center max-md:visible md:hidden justify-between max-md:w-[45vw] w-[30vw] p-4 border mb-3 border-gray-200 rounded-lg animate-pulse">
                    <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
                    <div className="mt-4 w-3/4 h-5 bg-gray-300 rounded-md"></div>
                    <div className="mt-2 w-1/2 h-4 bg-gray-300 rounded-md"></div>
                    <div className="mt-4 w-full h-10 bg-gray-300 rounded-lg"></div>
                </div>
            </div>}
            {/* {loading && <div className="flex flex-col items-center justify-between w-[40vw] p-4 border border-gray-200 rounded-lg animate-pulse">
                    <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
                    <div className="mt-4 w-3/4 h-5 bg-gray-300 rounded-md"></div>
                    <div className="mt-2 w-1/2 h-4 bg-gray-300 rounded-md"></div>
                    <div className="mt-4 w-full h-10 bg-gray-300 rounded-lg"></div>
                  </div>} */}
            <div className="mx-auto flex flex-row gap-10 flex-wrap  max-md:gap-3 justify-center  max-md:items-center px-10 max-md:px-1 ">

                {products?.sort((a, b) => b.priority - a.priority).map((item) => (

                    <div key={item.id} onClick={(e => {
                        router.push(`/product/${item.id}`)
                    })} className=" cursor-pointer  max-md:max-h-fit  border relative max-md:min-w-[45vw] rounded-md overflow-hidden min-w-[30%] max-w-[30%] ">
                        <div>
                            <Image
                                loading="lazy"
                                src={item.image1}
                                alt={item.title}
                                width={30}
                                height={96}
                                className="w-full h-96 max-md:min-h-32 max-md:max-h-48 object-contain max-md:object-contain "
                            />

                        </div>
                        <div className=" bg-white bg-opacity-75 p-4 max-md:max-h-[30%] w-full">
                            <span className="font-bold max-md:font-medium text-sm">{item.title}</span>
                            <div className="flex items-center max-md:gap-2 justify-between max-md:flex-col max-md:justify-between max-md:items-start max-md:w-[100%] ">
                                <div>

                                    <span className="text-gray-700">₹{item.discountedPrice}/m</span>
                                    <span className="text-gray-700 line-through ml-2">₹{item.price}</span>
                                </div>
                                <button type="button" className={` max-xl:w-auto px-2 py-2 text-white bg-gradient-to-br from-red-500 to-red-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xs max-md:text-[12px] max-md:w-full text-center me-2 max-md:py-1 mt-0 max-md:min-w-fit max-md:rounded-[4px] `} onClick={(e) =>
                                    handleAddToCart(item, e)}>Add to Cart</button>
                            </div>
                            {item.sale && <span className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-sm">Sale</span>}
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}

export default AllProducts