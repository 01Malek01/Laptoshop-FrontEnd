'use client';
import React, { useState, useEffect } from 'react';
import useCart from '@/hooks/fetchCart';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

function Cart() {
  const [jwt, setJwt] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt') || '';
      setJwt(token);
    }
  }, []);

  const { cart, refetch } = useCart();
  const items = useMemo (() => cart.other?.data?.items, [cart.other?.data?.items]);
  const removeItem = async (id) => {
    try {
      if (!id) {
        throw new Error('Item ID is required');
      }

      const res = await fetch(`${process.env.API_URL}/cart`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`, // Your access token
        },
        body: JSON.stringify({ id: id }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Refetch the cart data
      await refetch();
      // Alternatively, you can use router.refresh() to reload the page
      // router.refresh();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    // <div className='w-full bg-slate-100 text-black h-full'>
    //   <div className="overflow-x-auto">
    //     {
    //       items?.length === 0 ? (
    //         <div className="text-center font-bold m-10 text-xl">
    //           Your cart is empty
    //           <div className="divider"></div>
    //           <Link href={"/products-page"} className="btn btn-primary">Shop Now</Link>
    //         </div>
    //       ) : (
    //         <>
    //           <table className="table">
    //             {/* head */}
    //             <thead>
    //               <tr className="text-center">
    //                 <th>Brand</th>
    //                 <th>Price</th>
    //                 <th>Model</th>
    //                 <th>Image</th>
    //                 <th>Quantity</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {items?.map(el => (
    //                 <tr key={el._id} className="text-center">
    //                   <th>{el.productId.brand}</th>
    //                   <td>{el.productId.model}</td>
    //                   <td>{el.productId.price}$</td>
    //                   <td className="flex items-center justify-center">
    //                     <Image loading="lazy" alt={el.productId.brand} src={el.productId.image} width={100} height={100} />
    //                   </td>
    //                   <td>{el.quantity}</td>
    //                   <td>
    //                     <button className='btn btn-error rounded' onClick={() => removeItem(el.productId._id)}>
    //                       Remove
    //                     </button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //           <div className="divider"></div>
    //           <div className="text-center font-bold m-10 flex-col gap-5">
    //             <div>Total price: {cart.other?.data?.totalPrice?.toFixed(2)} $</div>
    //             <Link href={''} className="btn btn-primary">Checkout</Link>
    //           </div>
    //         </>
    //       )
    //     }
    //   </div>
    // </div>
    <div>cart page</div>
  );
}

export default Cart;
