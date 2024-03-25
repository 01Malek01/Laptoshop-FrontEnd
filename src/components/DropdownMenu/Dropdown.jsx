'use client'
import React from 'react';
import { useDropdownContext } from '../Provider/DropdownContext';
import Link from 'next/link';

function Dropdown() {
 const { selectedValue, setSelectedValue } = useDropdownContext();

 const handleItemClick = (e) => {
  const newValue = e.target.textContent.trim();
  setSelectedValue(newValue);
  localStorage.setItem('selectedValue', newValue);
  window.location.reload();
 };

 return (
  <>
   <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#19202f] w-52">
    <li>
     <Link href={`/products-page`} onClick={handleItemClick}>All Categories</Link>
    </li>
    <li>
     <Link href={`/products-page`} onClick={handleItemClick}>Dell</Link>
    </li>
    <li>
     <Link href={`/products-page`} onClick={handleItemClick}>HP</Link>
    </li>
    <li>
     <Link href={`/products-page`} onClick={handleItemClick}>Lenovo</Link>
    </li>
    <li>
     <Link href={`/products-page`} onClick={handleItemClick}>Asus</Link>
    </li>
    <li>
     <Link href={`/products-page`} onClick={handleItemClick}>Apple</Link>
    </li>
   </ul>
  </>
 );
}

export default Dropdown;
