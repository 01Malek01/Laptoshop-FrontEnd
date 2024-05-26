import styles from './card2.module.css'
import Image from 'next/image'
const Card2 = ({ title, desc, icon, image, externalStyles, btnTitle }) => {
 return (
  <div className={` border-none min-h-[125px]  max-h-[300px] p-4 flex flex-col lg:flex-row md:gap-5 justify-around items-center  ${externalStyles} glass`} >
   <div className={`${styles.image} h-full w-full p-4 flex justify-center lg:justify-start items-center `}><Image className={`md:p-2  md:block shadow `} src={image} alt="image" width={100} height={100} loading='lazy' /></div>
   <div className='flex flex-col justify-center'>
    <div className={`${styles.desc} text-[14px] md:text-[18px] text-center md:text-left `}>{desc}</div>
    <button className="w-[200px] md:pt-4 py-2 underline hover:scale-105 transition-all duration-75 m-auto ">{btnTitle}</button>
   </div>
  </div>
 )
}

export default Card2
