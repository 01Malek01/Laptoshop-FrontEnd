'use client';
import React, { useState, useEffect } from 'react';
import styles from './products.module.css';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = ({ laptops, showMoreButton }) => {
  const [limit, setLimit] = useState(5); // Initial data limit
  const [fetchedLaptops, setFetchedLaptops] = useState(laptops); // Store fetched data
  const [filter, setFilter] = useState({ price: '999999', ramSize: '' }); // Filter state
  const [filteredLaptops, setFilteredLaptops] = useState([]); // Filtered laptops state

  useEffect(() => {
    setFetchedLaptops(laptops); // Set initial data
  }, [laptops]); // Re-run on initial render and new `laptops` prop

  const applyFilter = () => {
    const laptops = fetchedLaptops.filter(laptop =>
      laptop.price <= filter.price &&
      laptop.ram >= filter.ramSize
    );

    if (laptops.length === 0) {
      toast.error('No laptops with the applied filters');
    } else {
      setFilteredLaptops(laptops);
    }

    console.log(filter);
  };

  const handleShowMoreClick = async () => {
    if (fetchedLaptops.length >= 22) {
      return alert('No more laptops');
    }
    else {
      const newLimit = limit + 5; // Increment limit
      const res = await axios.get(`${process.env.API_URL}/laptops?limit=${newLimit}`);
      const newLaptops = res.data.data.laptops;
      setFetchedLaptops(prevLaptops => [...prevLaptops, ...newLaptops]); // Append new data
      setLimit(newLimit); // Update internal limit state for tracking
    }
  };

  const laptopsToDisplay = filteredLaptops.length > 0 ? filteredLaptops : fetchedLaptops;

  return (
    <div className={`container`}>
      <ToastContainer />
      <div className={`container flex flex-wrap justify-center items-center gap-4 mb-5 pt-5`}>
        <input type="number" placeholder="Max Price" onChange={e => setFilter({ ...filter, price: e.target.value })} className='border p-2 rounded' />
        <input type="number" placeholder="Min RAM Size" onChange={e => setFilter({ ...filter, ramSize: e.target.value })} className='border p-2 rounded' />
        <button onClick={applyFilter} className='btn bg-[#19202F] hover:bg-slate-300 hover:text-black'>Apply Filter</button>
      </div>

      <div className={`${styles.products} bg-[#ffffff] flex p-4 justify-center items-center gap-4 `}>
        {laptopsToDisplay?.map((laptop) => (
          <div key={laptop._id} className=" bg-slate-100 w-full md:w-96 p-2 max-h-[700x] border m-auto  ">
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