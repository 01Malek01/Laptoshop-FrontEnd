import React from 'react'
import styles from './card2.module.css'
import Image from 'next/image'
const Card2 = ({ title, desc, icon, image, externalStyles, btnTitle }) => {
 return (
  <div className={` border-none  h-[125px] flex flex-row gap-5 justify-around items-center  ${externalStyles} glass`} >
   <div className={`${styles.image}`}><Image className={`p-2 `} src={image} alt="image" width={150} height={150}  loading='lazy' /></div>
   <div className='flex flex-col'>
    <div className={`${styles.desc} `}>{desc}</div>
    <button className="w-[200px] pt-4 underline hover:scale-105 transition-all duration-75">{btnTitle}</button>
   </div>
  </div>
 )
}

export default Card2
