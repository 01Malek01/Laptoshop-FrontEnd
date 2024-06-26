import React, { useCallback, useContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useDropdownContext } from '@/components/Provider/DropdownContext';
import { useQueryContext } from '@/components/Provider/QueryContext';
function useFetchProducts() {
 const { selectedValue, setSelectedValue } = useDropdownContext();
 const { query, setQuery } = useQueryContext();
 const [products, setProducts] = useState([]);
 const fetchProducts = useCallback(async () => {

  const res = await axios.get(`${process.env.API_URL}/laptops?search=${query && query}&${selectedValue === 'All Categories' ? '' : `brand=${selectedValue}`}&limit=100`);
  setProducts(res.data.data.laptops);

 }, [selectedValue, query]);
 useEffect(() => {
  fetchProducts();
 }, [selectedValue, query]);


 return products;
}


export default useFetchProducts
