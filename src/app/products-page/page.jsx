'use client'
import Products from '@/components/Products/Products'
import useFetchProducts from '@/hooks/fetchProducts';
import React, { Suspense } from 'react'

function ProductsPage() {
  const laptops = useFetchProducts();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container bg-white'>
        <Products laptops={laptops} showMoreButton={false} />
      </div>
    </Suspense>

  )
}

export default ProductsPage
