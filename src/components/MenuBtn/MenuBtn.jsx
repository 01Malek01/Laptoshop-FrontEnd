import React from 'react'
import styles from './menuBtn.module.css'
import { IoIosArrowDown } from 'react-icons/io'
const MenuBtn = ({ label, listItems }) => {
 return (
  <div className="dropdown dropdown-hover">
   <div tabIndex={0} role="button" className="flex">
    <span className={`${styles.label} text-black`}>{label}</span> <IoIosArrowDown size={20} className={` `} />
   </div>
   <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#19202f]  w-52">
   </ul>
  </div>
 )
}

export default MenuBtn
