'use client'
import Products from '@/components/Products/Products'
import useFetchProducts from '@/hooks/fetchProducts';
import React, { Suspense } from 'react'
import Loading from '../loading';

function ProductsPage() {
  const laptops = useFetchProducts();
  return (
    
    <Suspense fallback={<Loading />}>
      <div className='container bg-white'>
        {
          laptops?.length === 0 ? <p className='text-center text-2xl m-10 p-10'>No products found</p> : <Products laptops={laptops} showMoreButton={false} />

        }
      </div>
    </Suspense>

  )
}

export default ProductsPage
