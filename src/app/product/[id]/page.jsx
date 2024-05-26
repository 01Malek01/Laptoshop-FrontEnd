'use client'
import React, { useContext } from 'react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { JwtContext } from '@/components/Provider/Provider';
import Image from 'next/image';
import Link from 'next/link';
import QuantityInput from '@/components/quantityInput/QuantityInput';
import { useQuantityContext } from '@/components/Provider/QuantityContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function Product() {
 const [laptop, setLaptop] = useState({});
 const [authorized, setAuthorized] = useState(false);
 const params = useParams();
 const jwt = useContext(JwtContext);
 const { quantity } = useQuantityContext();
 useEffect(() => {
  const fetchLaptop = async () => {
   try {
    const response = await axios.get(`http://localhost:5000/api/v1/laptops/${params.id}`, {
     headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}` // Your access token
     }
    });

    if (!response.ok) {
     if (response.status === 401) {
      // Handle unauthorized response (e.g., display an error message)
      setAuthorized(false);
     }
    }
    setAuthorized(true);

    setLaptop(response.data.data.laptop); // Access data directly from response.data
    console.log(response.data.data.laptop);

   } catch (error) {
    console.error('Error:', error);
    // Handle errors (e.g., display error message to user)
   }
  };

  fetchLaptop();
 }, [params.id]);

 const notify = () => {

  toast.success("Product Added To Cart Successfully !", {
   position: "top-center"
  });


 };
 const handleAddToCart = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/v1/cart', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${jwt}` // Your access token
    },
    body: JSON.stringify({
     productId: params.id,
     quantity
    })
    }).then(() => notify());
  } catch (error) {
   console.error('Error:', error);
   // Handle errors (e.g., display error message to user)
  }

 }




 return (
  <>
   <ToastContainer />

   {/* <CustomAlert /> */}
   {
    authorized ? (
     <div className='bg-white flex justify-center items-center'>
      <div className='flex flex-row gap-[20rem] justify-center items-center  text-black bg-slate-50 h-fit w-fit p-5 rounded-lg'>

       <div className='flex flex-col justify-center items-center h-screen text-black   '>
        <Image src={laptop.image} alt={laptop.title} width={500} height={500} />
       </div>
       <div class="flex flex-col justify-center items-center h-screen">
        <div class="max-w-md space-y-4">
         <h1 class="text-3xl font-bold text-gray-800">Product Details</h1>
         <div class="flex flex-col gap-2">
          <div class="text-gray-700">Brand: <span class="font-medium text-black">{laptop.brand}</span></div>
          <div class="text-gray-700">Model: <span class="font-medium text-black">{laptop.model}</span></div>
          <div class="text-gray-700">Processor: <span class="font-medium text-black">{laptop.processor}</span></div>
          <div class="text-gray-700">Ram: <span class="font-medium text-black">{laptop.ram}</span></div>
          <div class="text-gray-700">Storage: <span class="font-medium text-black">{laptop.storage}</span></div>
          <div class="text-gray-700">Average Rating: <span class="font-medium text-black">{laptop.averageRating}</span></div>
          <div class="text-gray-700">Total Ratings: <span class="font-medium text-black">{laptop.numOfRatings}</span></div>
          <div class="text-gray-700">Price: <span class="font-medium text-black">{laptop.price}$</span></div>
         </div>
         <div class="flex justify-between items-center flex-col gap-5">
          <QuantityInput />
          <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleAddToCart} >Add To Cart</button>
         </div>
        </div>
       </div>

      </div>
     </div>
    ) : (
     <div className='bg-white flex flex-col justify-center items-center text-black h-full text-[25px] bold '>
      Please Login to view this page.
      <Link href='/login' className='btn hover:bg-[#599FAE] m-5 '>Login</Link>
     </div>
    )

   }

  </>
 )
}

export default Product
