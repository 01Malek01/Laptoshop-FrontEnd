import React from 'react'
import MenuBtn from '../MenuBtn/MenuBtn'
const MobileMenus = ({setOpen}) => {
 return (
  <div className={`flex flex-col justify-start container items-center gap-6  `}>
   <MenuBtn onClick={() => setOpen(false)} label="Home" href="/" />
   <MenuBtn onClick={() => setOpen(false)} label="About Us" href="/about" />
   <MenuBtn onClick={() => setOpen(false)} label="Pages" href="/pages" />
   <MenuBtn onClick={() => setOpen(false)} label="Feature" href="/feature" />
   <MenuBtn onClick={() => setOpen(false)} label="Blog" href="/blog" />
   <MenuBtn onClick={() => setOpen(false)} label="Contact Us" href="/contact" />
  </div>
 )
}

export default MobileMenus
