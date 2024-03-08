'use client'
import React from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import Menus from '../Menus/Menus';


const Navbar = () => {
 return (
  <>
   <div className={`${styles.navWrapper}`}>
    <div className={`${styles.navContainer} container flex flex-row justify-between px-8 items-center h-[80px]`}>
     <div className={`${styles.logo}`}>
      <Image src="/assets/logo.jpg" alt="logo" width={70} height={70} />
     </div>
     <div className={`${styles.searchbox} w-1/2 `}>
      <form action="" className={`${styles.form} flex flex-row justify-between items-center h-full`}>
       <input type="text" placeholder='Search for products' className={`${styles.input} w-[60%]`} />
       <div className={` flex flex-row gap-4 mr-4 items-center `}>
        <div className="dropdown dropdown-hover">
         <div tabIndex={0} role="button" className="flex">
          <span className={`${styles.label} text-black`}>Categories</span> <IoIosArrowDown size={20} className={` `} />
         </div>
         <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#19202f]  w-52">
          <li><a>All Categories</a></li>
          <li><a>Dell</a></li>
          <li><a>HP</a></li>
          <li><a>Lenovo</a></li>
          <li><a>Asus</a></li>
          <li><a>Apple</a></li>
         </ul>
        </div>
        <button className={`${styles.btn} bg-[#19202f] p-1 w-[80px]`}>Search</button>
       </div>
      </form>
     </div>
     <div className={`flex flex-row gap-4 `}>
      <div className={`${styles.profile}`}>
       <CgProfile size={30} className={`${styles.icon}`} />
      </div>
      <div className={`${styles.cart}`}>
       Your Cart
      </div>
      <FaCartShopping size={30} className={`${styles.icon}`} />
     </div>
    </div>
   </div>
   <div className={`${styles.menusWrapper}`}>
    <div className={`${styles.menusContainer} container flex flex-row justify-center px-8 items-center h-[50px]`}>
     <Menus />
    </div>
   </div>
  </>
 )
}

export default Navbar
