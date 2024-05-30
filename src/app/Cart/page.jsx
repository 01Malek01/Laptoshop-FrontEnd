'use client';
import { useContext } from 'react';
import useCart from '@/hooks/fetchCart';
import Image from 'next/image';
import { JwtContext } from '@/components/Provider/Provider';
import Link from 'next/link';

function Page() {
  const jwt = useContext(JwtContext);
  const { cart, refetch } = useCart();
  const items = cart.other?.data?.items;

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
    <div className='w-full bg-slate-100 text-black h-full'>
      <div className="overflow-x-auto">
        {
          !items?.length ? (
            <div className="text-center font-bold m-10 text-xl">
              Your cart is empty
              <div className="divider"></div>
              <Link href={"/products-page"} className="btn btn-primary">Shop Now</Link>
            </div>
          ) : (
            <>
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-center">
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Model</th>
                    <th>Image</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map(el => (
                    <tr key={el._id} className="text-center">
                      <th>{el.productId.brand}</th>
                      <td>{el.productId.model}</td>
                      <td>{el.productId.price}$</td>
                      <td className="flex items-center justify-center">
                        <Image alt ={el.productId.brand} src={el.productId.image} width={100} height={100} />
                      </td>
                      <td>{el.quantity}</td>
                      <td>
                        <button className='btn btn-error rounded' onClick={() => removeItem(el.productId._id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="divider"></div>
              <div className="text-center font-bold m-10 flex-col gap-5">
                <div>Total price: {cart.other?.data?.totalPrice?.toFixed(2)} $</div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn btn-primary m-auto text-center mt-5" onClick={() => document.getElementById('my_modal_5').showModal()}>Checkout</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <p className="py-4 text-slate-100">Total price: {cart.other?.data?.totalPrice?.toFixed(2)}$</p>
                    <p className="py-4 text-slate-100">Press next to checkout</p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                        <button className="btn">Next</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </>

          )
        }

      </div>
    </div>
  );
}

export default Page;
