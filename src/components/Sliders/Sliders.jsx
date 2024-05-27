'use client'
import React from 'react'
import styles from './sliders.module.css'
import DailySalesSlider from '../DailySalesSlider/DailySalesSlider'
import HomeSlider from '../HomeSlider/HomeSlider'


const pics = [
 {
  src: '/assets/one.png',
  alt: 'laptop',
  id: 1
 },
 {
  src: '/assets/two.png',
  alt: 'laptop',
  id: 2
 },
 {
  src: '/assets/three.png',
  alt: 'laptop',
  id: 3
 }
]
const Sliders = ({ laptops }) => {
 return (
  <>
   <div className={` flex container flex-col md:flex-row justify-center gap-5 my-8 ${styles.container}`}>
    <div className=' md:w-[300px] h-[500px] flex-1'>
     <HomeSlider pics={pics} />
    </div>
    <div className='md:w-[300px]   h-[500px] flex-1 md:flex-grow-0 my-8 md:my-0 '>
     <DailySalesSlider laptops={laptops} />
    </div>
   </div>
  </>
 )
}

export default Sliders
