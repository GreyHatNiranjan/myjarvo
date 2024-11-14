'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
const Image = dynamic(() => import('next/image'))
import { useAppSelector } from '../lib/hooks';

const Header = () => {
  const { data: session } = useSession()
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [itemsNo, setitemsNo] = useState(0)
  let itemsNo1 = useAppSelector(state => state.counter.cart)
  useEffect(() => {
    setitemsNo(itemsNo1)
  }, [itemsNo1])

  return (
    <>
      <div onMouseLeave={() => { setIsNavOpen(false) }} onScrollCapture={() => { setIsNavOpen(false) }}>

        <header className="poppins-semibold text-black py-4 px-12 max-md:px-5 ">
          <div className=" my-auto flex  justify-between content-center ">
            <span className='flex items-center'>

              <button onClick={() => setIsNavOpen((prev) => !prev)}><Image width={10} height={10} src={!isNavOpen ? "/menu.svg" : "close.svg"} alt="" className='w-6 absolute left-4 top-5 max-md:top-5' /></button>
              <Link className='max-md:ml-9 ml-4' shallow href="/"><Image src={"/logo.png"} width={150} height={10} className='w-32' alt='cart' /></Link>
            </span>
            <nav id='nav' className=" items-center flex gap-10 max-md:gap-0 max-md:w-[20%] max-md:justify-between max-md:items-center max-md:max-w-[20vw]">
              <Link href="/" shallow className="hover:text-gray-400 max-md:hidden">Home</Link>
              <Link href="/contact" shallow className="hover:text-gray-400 max-md:hidden">Contact</Link>
              <Link href="/cart" shallow className="flex relative">
                <Image src={"/cart.webp"} width={20} height={20} className='w-5 h-5' alt='cart' />
                {/* <span className=' bg-red-600 h-2.5 w-2.5 text-center text-[12px] rounded-lg'></span> */}
                <span className=' bg-red-600 h-4 w-3 text-center text-[12px] text-white rounded-lg'>{itemsNo?.length}</span>
              </Link>

              {/* profile */}
              <Link href="/profile" shallow className="flex relative"><Image src={"/profile.webp"} width={20} height={20} className='w-5 h-auto' alt='profile' /><span className='relative -left-2  -top-1 bg-red-600 text-white h-2 w-2 text-center rounded-lg'></span></Link>
            </nav>


          </div>
        </header>
        {/* haburger div for catogories */}
        {isNavOpen && <div className='bg-gray-50 absolute z-10 max-md:w-[70%] w-[40%]' >
          <ul className="flex flex-col items-center justify-between w-full">

            <li className="border-b border-gray-400 my-8 uppercase">
              <Link href="/" shallow>Home</Link>
            </li>
            <li className="border-b border-gray-400 my-8 uppercase">
              <Link href="/contact" shallow>Contact</Link>
            </li>
            <li className='border-b border-gray-400 my-8 uppercase'>
              <Link href="/cart" shallow className="flex relative">
                <span>Cart</span>
                <Image src={"/cart.webp"} width={10} height={10} className='w-5 ml-2 h-auto' alt='cart' />
                {/* <span className=' bg-red-600 h-2.5 w-2.5 text-center text-[12px] rounded-lg'></span> */}
                <span className=' bg-red-600 h-4 w-3 text-center text-[12px] text-white rounded-lg'>{itemsNo?.length}</span>
              </Link>
            </li>
            <li className='border-b border-gray-400 my-8 uppercase'>
              <Link href="/profile" shallow className="flex relative">
                <span>Profile</span>
                <Image src={"/profile.webp"} width={10} height={10} className='w-5 ml-2 h-5' alt='cart' /><span className='relative -left-2 -top-1 bg-red-600 text-white h-2 w-2 text-center text-[12px] rounded-lg'></span>
              </Link>
            </li>
            <li className='border-b border-gray-400 my-8 uppercase cursor-pointer' onClick={() => session ? signOut() : signIn()}>
              <span>{session ? "Logout" : "Login"}</span>
              <span className='relative -left-2 -top-1 bg-red-600 text-white h-2 w-2 text-center text-[12px] rounded-lg'></span>
            </li>
          </ul>
        </div>}
      </div>
    </>
  );
};

export default Header;
