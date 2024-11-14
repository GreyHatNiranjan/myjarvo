import React from 'react';
// import Header from '../components/Header';
import Image from 'next/image';
// import CartBody from '../components/CartBody';
import dynamic from 'next/dynamic';

const Header = dynamic(()=> import('../components/Header'))
// const CartBody = dynamic(()=> import('../components/CartBody'))
const cart = () => {

// very Important vvip
const CartBody = dynamic(()=> import('../components/CartBody'),{ ssr: false })


  return (
    <>
      <Header />
      <CartBody/>
    </>
  )


}

export default cart;
