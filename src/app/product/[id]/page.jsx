'use client'
import React, { useContext } from 'react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { JwtContext } from '@/components/Provider/Provider';
import Image from 'next/image';
import Link from 'next/link';
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import CustomAlert from '@/components/CustomAlert/CustomAlert';
function Product() {
 const [laptop, setLaptop] = useState({});
 const [authorized, setAuthorized] = useState(false);
 const params = useParams();
 const jwt = useContext(JwtContext);
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

 const handleAddToCart = async () => {
  try {
   const response = await axios.post('http://localhost:5000/api/v1/cart/add', {
    laptopId: params.id
   }, {
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${jwt}` // Your access token
    }
   });
   console.log(response.data);
   // notify();
  } catch (error) {
   console.error('Error:', error);
   // Handle errors (e.g., display error message to user)
  }
 }

 // const notify = () => {
 //  toast.success(`Item  added to cart successfully `, {
 //   position: "top-center",
 //   autoClose: 2000,
 //   hideProgressBar: true,
 //   closeOnClick: true,
 //   pauseOnHover: true,
 //   draggable: true,
 //   progress: 0,
 //   theme: "light",
 //   transition: Slide,
 //  })
 // }



 return (
  <>
  {/* <CustomAlert /> */}
   {
    authorized ? (
     <div className='bg-white flex justify-center items-center'>
      <div className='flex flex-row gap-[20rem] justify-center items-center  text-black bg-slate-50 h-fit w-fit p-5 rounded-lg'>

       <div className='flex flex-col justify-center items-center h-screen text-black   '>
        <Image src={laptop.image} alt={laptop.title} width={500} height={500} />
       </div>
       <div className='flex flex-col justify-center gap-2 items-start h-screen text-black text-[25px]'>
        <div>Brand:{laptop.brand}</div>
        <div>Model:{laptop.model}</div>
        <div>Processor:{laptop.processor}</div>
        <div>Ram:{laptop.ram}</div>
        <div>Storage:{laptop.storage}</div>
        <div>Average Rating:{laptop.averageRating}</div>
        <div>Total Ratings:{laptop.numOfRatings}</div>
        <div>Price:{laptop.price}$</div>
        <button className='btn' onClick={handleAddToCart}>Add To Cart</button>
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
