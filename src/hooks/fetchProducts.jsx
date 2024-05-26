import React, { useCallback, useContext } from 'react'
import { useEffect, useState } from 'react'
import { JwtContext } from '@/components/Provider/Provider'
import axios from 'axios';
import { useDropdownContext } from '@/components/Provider/DropdownContext';
function useFetchProducts() {
 const { selectedValue, setSelectedValue } = useDropdownContext();
 const [jwt] = useContext(JwtContext);
 const [products, setProducts] = useState([]);
 const fetchProducts = useCallback(async () => {

  const res = await axios.get(`http://localhost:5000/api/v1/laptops?limit=100&${selectedValue && selectedValue === "All Categories" ? "" : `brand=${selectedValue}`}`);
  setProducts(res.data.data.laptops);

 });
 useEffect(() => {
  fetchProducts();
 }, [selectedValue]);


 return products;
}


export default useFetchProducts
