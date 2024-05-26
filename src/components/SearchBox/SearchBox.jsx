import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from '../DropdownMenu/Dropdown';
import styles from './searchBox.module.css'
import { useDropdownContext } from '../Provider/DropdownContext';


function SearchBox() {
 const { selectedValue, setSelectedValue } = useDropdownContext();
const [query, setQuery] = useState('')
 const handleSubmit = async (e) => {
  e.preventDefault()
  console.log(query)
 }
 return (

  <form action="" className={`flex flex-row justify-between items-center h-full bg-none`}>
   <input type="text" placeholder='Search for products' className={`${styles.input} w-[60%]`} onChange={(e) => setQuery(e.target.value)} />
   <div className={` flex flex-col md:flex-row md:gap-4 mr-4 items-center m-2 md:p-0 `}>
    <div className="dropdown dropdown-hover">
     <div tabIndex={0} role="button" className="flex">
      <span className={`${styles.label} text-black text-sm md:text-md `}>{selectedValue}</span> <IoIosArrowDown size={20} className={` `} />
     </div>
     <Dropdown />
    </div>
    <button className={`${styles.btn} bg-[#19202f] p-1 md:w-[80px] `} onClick={handleSubmit}>Search</button>
   </div>
  </form>
 )
}

export default SearchBox
