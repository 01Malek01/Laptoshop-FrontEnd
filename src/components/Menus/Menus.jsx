import React from 'react'
import MenuBtn from '../MenuBtn/MenuBtn'
const Menus = () => {
 return (
  <div className={` flex justify-center container `}>
   <div className={`  md:flex-row flex flex-col justify-between gap-0 md:gap-12 md:px-8 items-center h-[80px]`}>
    <MenuBtn label="Home" href="/"  />
    <MenuBtn label="About Us" href="/about" />
    <MenuBtn label="Pages" href="/pages" />
    <MenuBtn label="Feature" href="/feature" />
    <MenuBtn label="Blog" href="/blog" />
    <MenuBtn label="Contact Us" href="/contact" />
   </div>
  </div>
 )
}

export default Menus
