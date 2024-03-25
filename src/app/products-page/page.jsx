
'use client'
import Products from '@/components/Products/Products'
import { useDropdownContext } from '@/components/Provider/DropdownContext';
import React, { Suspense } from 'react'
import { useEffect, useState } from 'react';

function ProductsPage() {
  const { selectedValue } = useDropdownContext();
  const category = localStorage.getItem('selectedValue');
  const [laptops, setLaptops] = useState([]);
  useEffect(() => {
    console.log(category);
    fetch(`http://localhost:5000/api/v1/laptops?limit=100&${category && category === "All Categories" ? "" : `brand=${category}`}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }, { next: { revalidate: 120 } }).then(res => res.json()).then(res => setLaptops(res.data.laptops)).catch(err => console.log(err));
  }, [category])
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container bg-white'>
        <Products laptops={laptops} showMoreButton={false} />
      </div>
    </Suspense>

  )
}

export default ProductsPage
