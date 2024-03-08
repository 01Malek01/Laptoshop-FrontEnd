import React from 'react'
import styles from './Menus.module.css'
import MenuBtn from '../MenuBtn/MenuBtn'
const Menus = () => {
 return (
  <div className={`${styles.menusWrapper} flex justify-center`}>
   <div className={`${styles.menusContainer} container flex flex-row justify-between gap-8 px-8 items-center h-[80px]`}>
    <MenuBtn label="Home" />
    <MenuBtn label="About Us" />
    <MenuBtn label="Pages" />
    <MenuBtn label="Feature" />
    <MenuBtn label="Blog" />
    <MenuBtn label="Contact Us" />
   </div>
  </div>
 )
}

export default Menus
