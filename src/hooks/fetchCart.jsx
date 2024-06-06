import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const useCart = () => {
 const [cart, setCart] = useState({});
 const [jwt, setJwt] = useState('');

 useEffect(() => {
  if (typeof window !== 'undefined') {
   const token = localStorage.getItem('jwt');
   setJwt(token);
  }
 }, []);

 const fetchCart = useCallback(async () => {
  try {
   const res = await axios.get(`${process.env.API_URL}/cart`, {
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${jwt}`,
    },
   });
   return {
    products: res.data.products,
    other: res.data,
   };
  } catch (error) {
   console.error('Error:', error);
   return {};
  }
 }, [jwt]);

 const refetch = async () => {
  const fetchedCart = await fetchCart();
  setCart(fetchedCart);
 };

 useEffect(() => {
  if (jwt) {
   refetch();
  }
 }, [jwt, refetch]);

 return { cart, refetch };
};

export default useCart;
