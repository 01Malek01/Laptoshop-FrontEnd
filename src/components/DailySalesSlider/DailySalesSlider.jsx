import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'


function DailySalesSlider({ laptops }) {
 var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 6500,
  cssEase: "linear",
  arrows: false,

 };
 return (
  <div className="slider-container">
   <Slider {...settings}>
    {
     laptops?.map((laptop) => {
      return (
       <div key={laptop._id} className=" bg-[#19202F] sm:flex sm:justify-center md:w-96 md:p-2 h-[400px] ">
        <figure className="max-h-[200px]"><Image className="md:p-12  md:block shadow " src={laptop.image} alt={laptop.brand} width={350} height={200} /></figure>
        <div className="card-body">
         <h2 className="card-title">
          {laptop.brand} {laptop.model}
          <div className="badge badge-secondary">NEW</div>
         </h2>
         <p>{laptop.price}$</p>
         <div className="card-actions justify-center md:justify-end">
          <div className="badge badge-outline">Laptops</div>
          <div className="badge badge-outline">Electronics</div>
         </div>
        </div>
       </div>
      )
     })
    }
   </Slider>
  </div>
 );
}

export default DailySalesSlider;
