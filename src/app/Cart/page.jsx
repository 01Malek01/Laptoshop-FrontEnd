'use client'
import { useContext, useEffect } from "react";
import useCart from "@/hooks/fetchCart";
import Image from 'next/image';
import { JwtContext } from "@/components/Provider/Provider";
function Page() {
  const jwt = useContext(JwtContext);

  const cart = useCart();
  const products = cart.products;
  const items = cart.other?.data?.items;

  let result = [];
  let itemsResult = [];
  for (let i = 0; i < products?.length; i++) {
    result.push(products[i])
  };
  for (let i = 0; i < items?.length; i++) {
    itemsResult.push(items[i])
  }

  const removeItem = async (id) => {
    try {
      if (!id) {
        throw new Error('Item ID is required');
      }

      const res = await fetch('http://localhost:5000/api/v1/cart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}` // Your access token
        },
        body: JSON.stringify({ id: id }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className='w-full bg-slate-100 text-black h-full'>


      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Brand</th>
              <th>Price</th>
              <th>Model</th>
              <th>Image</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {
              result.map(el => (
                <tr key={el._id}>
                  <th>{el.brand}</th>
                  <td>{el.model}</td>
                  <td>{el.price}$</td>
                  <td><Image src={el.image} width={100} height={100} /></td>
                  <td>N/A</td>
                  <td><button className='btn btn-error rounded' onClick={() => removeItem(el._id)}>Remove</button></td>
                </tr>
              ))
            }


          </tbody>
        </table>
        <div className="divider"></div>
        
        <div className="text-center font-bold m-10">Total price: {cart.other?.data?.totalPrice.toFixed(2)} $</div>
      </div>






    </div>
  )
}

export default Page;
