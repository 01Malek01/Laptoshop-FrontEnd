'use client'
import { useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { JwtContext } from "@/components/Provider/Provider";

const useCart = () => {
 const [cart, setCart] = useState({});
 const jwt = useContext(JwtContext);

 const fetchCart = useCallback(async () => {
  try {
   const res = await axios.get('http://localhost:5000/api/v1/cart', {
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${jwt}` // Your access token
    }
   });
   // return res.data?.data;
   return {
    products: res.data.products,
    other: res.data
   }
  } catch (error) {
   console.error('Error:', error);
   return [];
  }
 }, [jwt]);

 useEffect(() => {
  const fetchData = async () => {
   const fetchedCart = await fetchCart();
   setCart(fetchedCart);
  };

  fetchData();
 }, [jwt]);

 return cart;
};


export default useCart;
