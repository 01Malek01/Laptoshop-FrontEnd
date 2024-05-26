'use client'
import React, { useState, useEffect } from 'react';
import styles from './products.module.css';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
const Products = ({ laptops, showMoreButton }) => {
  const [limit, setLimit] = useState(5); // Initial data limit
  const [fetchedLaptops, setFetchedLaptops] = useState(laptops); // Store fetched data
  useEffect(() => {
    setFetchedLaptops(laptops); // Set initial data
  }, [laptops]); // Re-run on initial render and new `laptops` prop

  const handleShowMoreClick = async () => {
    if (fetchedLaptops.length >= 22) {
      return alert('No more laptops');
    }
    else {

      const newLimit = limit + 5; // Increment limit
      const res = await axios.get(`http://localhost:5000/api/v1/laptops?limit=${newLimit}`);
      const newLaptops = res.data.data.laptops
      console.log(newLaptops);
      setFetchedLaptops(prevLaptops => [...prevLaptops, ...newLaptops]); // Append new data
      setLimit(newLimit); // Update internal limit state for tracking

    }
  };

  return (
    <div className={`container ${styles.home} `}>
      <div className={`${styles.products} bg-[#ffffff] flex p-4 justify-center items-center gap-4 `}>
        {fetchedLaptops?.map((laptop) => (
          <div key={laptop._id} className=" bg-slate-100 sm:w-96 p-2 max-h-[700x] border m-auto  ">
            <figure className=""><Image className="w-full max-h-[250px]" src={laptop.image} alt={laptop.brand} width={350} height={200} /></figure>
            <div className="card-body text-slate-500">
              <h2 className="card-title">
                {laptop.brand} {laptop.model}
              </h2>
              <p>{laptop.price}$</p>
              <div className="card-actions justify-end">
                <Link href={`/product/${laptop._id}`}>
                  <button className="btn bg-[#19202F] hover:bg-slate-300 hover:text-black" >View</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`${showMoreButton ? 'flex' : 'hidden'} justify-center p-4 m-3`}>
        <button className={`btn bg-[#19202F] hover:bg-slate-300 hover:text-black disabled:opacity-80 disabled:text-slate-500`} onClick={handleShowMoreClick} disabled={fetchedLaptops?.length >= 22} >{fetchedLaptops?.length >= 22 ? 'No more laptops' : 'Show More'}</button>
      </div>
    </div>
  );
};

export default Products;
