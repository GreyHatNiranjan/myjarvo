"use client"
import dynamic from 'next/dynamic';
const SingleProduct = dynamic(()=> import('@/app/components/SingleProduct'))
// import SingleProduct from "@/app/components/SingleProduct"
import { useParams } from "next/navigation"
const Idpage = () => {
  const { id } = useParams()

  return (
    <div >
        <SingleProduct  id={id} />

    </div>
  )
}

export default Idpage