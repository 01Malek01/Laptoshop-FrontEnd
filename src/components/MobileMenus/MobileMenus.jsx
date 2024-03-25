import React from 'react'
import MenuBtn from '../MenuBtn/MenuBtn'
const MobileMenus = () => {
 return (
  <div className={`flex flex-col justify-start container items-center gap-6  `}>
   <MenuBtn label="Home" href="/" />
   <MenuBtn label="About Us" href="/about" />
   <MenuBtn label="Pages" href="/pages" />
   <MenuBtn label="Feature" href="/feature" />
   <MenuBtn label="Blog" href="/blog" />
   <MenuBtn label="Contact Us" href="/contact" />
  </div>
 )
}

export default MobileMenus
