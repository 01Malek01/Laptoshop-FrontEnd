
'use client'
import Products from '@/components/Products/Products'
import { useDropdownContext } from '@/components/Provider/DropdownContext';
import React, { Suspense, useContext } from 'react'
import { useEffect, useState } from 'react';

function ProductsPage() {
  // const category =
  //   typeof window !== 'undefined' && localStorage.getItem('selectedValue');
  const { selectedValue, setSelectedValue } = useDropdownContext();
  const [laptops, setLaptops] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/laptops?limit=100&${selectedValue && selectedValue === "All Categories" ? "" : `brand=${selectedValue}`}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }, { next: { revalidate: 120 } }).then(res => res.json()).then(res => setLaptops(res.data.laptops)).catch(err => console.log(err));
    console.log('from products page',selectedValue);
  }, [selectedValue])
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container bg-white'>
        <Products laptops={laptops} showMoreButton={false} />
      </div>
    </Suspense>

  )
}

export default ProductsPage
