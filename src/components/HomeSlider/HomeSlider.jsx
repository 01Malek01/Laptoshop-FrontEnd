import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'
import { useEffect } from "react";
import styles from '../Sliders/sliders.module.css'

function HomeSlider({ pics }) {
 useEffect(() => {
  console.log('====================================');
  console.log(pics);
  console.log('====================================');
 })

 var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 6500,
  cssEase: "linear",
  arrows: false,

 };
 return (
  <div className="">
   <Slider {...settings}>
    {
     pics && pics.map((pic) => {
      return (
       <div key={pic.id} className='w-[300px] h-[400px] relative '>
        <Image className={styles.sliderImage} src={pic.src} alt={pic.alt} fill />
       </div>
      )
     })
    }
   </Slider>
  </div>
 );
}


export default HomeSlider;
