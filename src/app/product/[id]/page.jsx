'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import QuantityInput from '@/components/quantityInput/QuantityInput';
import { useQuantityContext } from '@/components/Provider/QuantityContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Product() {
  const [laptop, setLaptop] = useState({});
  const [authorized, setAuthorized] = useState(false);
  const { quantity } = useQuantityContext();
  const params = useParams();
  const [jwt, setJwt] = useState('');

  useEffect(() => {
    // This code will run only on the client side
    const token = localStorage.getItem('jwt');
    setJwt(token);

    const fetchLaptop = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/laptops/${params.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        setLaptop(response.data.data.laptop);
        setAuthorized(true);
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 401) {
          setAuthorized(false);
        }
      }
    };

    fetchLaptop();
  }, [params.id]);

  const notify = useCallback(() => {
    toast.success("Product Added To Cart Successfully!", {
      position: "top-center"
    });
  }, []);

  const handleAddToCart = useCallback(async () => {
    try {
      await axios.post(`${process.env.API_URL}/cart`, {
        productId: params.id,
        quantity
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        }
      });
      notify();
    } catch (error) {
      console.error('Error:', error);
    }
  }, [params.id, quantity, jwt, notify]);

  return (
    <>
      <ToastContainer />
      {authorized ? (
        <div className='bg-white flex justify-center items-center'>
          <div className='flex flex-col md:flex-row md:gap-[20rem] justify-center items-center text-black bg-slate-50 h-fit w-fit p-5 rounded-lg'>
            <div className='flex flex-col justify-center items-center md:h-screen text-black'>
              <Image src={laptop.image} alt={laptop.title} width={500} height={500} />
            </div>
            <div className="flex flex-col justify-center items-center h-screen">
              <div className="max-w-md md:space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">Product Details</h1>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Brand', value: laptop.brand },
                    { label: 'Model', value: laptop.model },
                    { label: 'Processor', value: laptop.processor },
                    { label: 'Ram', value: laptop.ram },
                    { label: 'Storage', value: laptop.storage },
                    { label: 'Average Rating', value: laptop.averageRating },
                    { label: 'Total Ratings', value: laptop.numOfRatings },
                    { label: 'Price', value: `${laptop.price}$` }
                  ].map(detail => (
                    <div key={detail.label} className="text-gray-700">
                      {detail.label}: <span className="font-medium text-black">{detail.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center flex-col gap-5">
                  <QuantityInput />
                  <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleAddToCart}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-white flex flex-col justify-center items-center text-black h-full text-[25px] bold'>
          Please Login to view this page.
          <Link href='/login' className='btn hover:bg-[#599FAE] m-5'>Login</Link>
        </div>
      )}
    </>
  );
}

export default Product;
