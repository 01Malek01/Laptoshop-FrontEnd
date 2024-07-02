'use client'
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
  const { quantity } = useQuantityContext();
  const params = useParams();
  const [jwt, setJwt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt');
      setJwt(token);
    }
  }, []);

  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/laptops/${params.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          }
        });

        setLaptop(response.data.data.laptop);
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 401) {
          // handle unauthorized error
        }
      }
    };

    if (jwt) {
      fetchLaptop();
    }
  }, [params.id, jwt]);

  const notify = useCallback(() => {
    toast.success("Product Added To Cart Successfully!", {
      position: "top-center"
    });
  }, []);

  const handleAddToCart = useCallback(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [params.id, quantity, jwt, notify]);

  return (
    <>
      <ToastContainer />
      {jwt ? (
        <div className='bg-gray-100 min-h-screen flex justify-center items-center p-5'>
          <div className='flex flex-col md:flex-row md:gap-16 justify-center items-center text-gray-800 bg-white shadow-lg rounded-lg p-10'>
            <div className='flex flex-col justify-center items-center md:h-screen text-gray-800'>
              <Image loading="lazy" src={laptop.image} alt={laptop.title} width={500} height={500} className='rounded-lg' />
            </div>
            <div className="flex flex-col justify-center items-center h-full md:h-screen">
              <div className="max-w-md space-y-4 text-center md:text-left">
                <h1 className="text-3xl font-bold text-blue-600">Product Details</h1>
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
                <div className="flex flex-col items-center gap-5">
                  <QuantityInput />
                  <button
                    type="button"
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleAddToCart}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading-spinner loading" role="status">
                      </span>
                    ) : (
                      'Add To Cart'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-white min-h-screen flex flex-col justify-center items-center text-gray-800 text-xl font-bold'>
          Please Login to view this page.
          <Link href='/login' className='btn mt-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'>
            Login
          </Link>
        </div>
      )}
    </>
  );
}

export default Product;
