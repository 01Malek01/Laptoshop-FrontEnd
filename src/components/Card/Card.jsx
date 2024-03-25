import React from 'react'
import styles from './card.module.css'
const Card = ({ title, desc, icon, externalStyles }) => {
 return (
  <>
   <div className={`${styles.card} bg-slate-200 border-none md:w-[300px] h-[125px] flex flex-row gap-5 justify-around items-center ${externalStyles}`} >
    {
     icon && (
      <div className={`${styles.icon}`}>
       {icon}
      </div>
     )
    }
    <div className='flex flex-col gap-2 text-slate-900 ' >
     {
      title && (
       <div className={`${styles.title}`}>• {title}</div>
      )
     }
     {
      desc && (
       <div className={`${styles.desc}`}>• {desc}</div>
      )
     }
    </div>
   </div>
  </>
 )
}

export default Card
