import Card from '@/components/Card/Card';
import styles from './home.module.css'
import Sliders from '@/components/Sliders/Sliders';
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { MdAssignmentReturn } from "react-icons/md";
import Card2 from '@/components/Card 2/Card2';
import Products from '@/components/Products/Products';
import { cookies } from 'next/headers';


export default async function Home() {
  const cookieStore = cookies();
  const jwt = cookieStore.get('jwt');
  // const res = await axios.get('http://localhost:5000/api/v1/laptops?limit=5').then(res => res.data.data).catch(err => console.log(err));
  // const laptops = res.laptops;
  const res = await fetch(`http://localhost:5000/api/v1/laptops?limit=5`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'cache-tag': 'laptops'
    }
  }, { next: { revalidate: 120 } }).then(res => res.json()).catch(err => console.log(err));
  const laptops = res.data.laptops;

  return (
    <>

      <div className={`container ${styles.home} w-full flex flex-col justify-center p-6`}>
        <div className="w-full" ><Sliders laptops={laptops} /></div>
        <div className={`${styles.cards} w-full flex flex-col md:flex-row gap-8 justify-center`}>
          <Card title='Free Shipping' desc=' For all orders over $100' icon={<FaShippingFast size={70} />} />
          <Card title='7 Days Easy Return' desc=' If goods have problems' icon={<MdAssignmentReturn size={70} />} />
          <Card title='Secure Payment' desc=' 100% secure payment' icon={<RiSecurePaymentFill size={70} />} />
        </div>
        <div className={`${styles.cards} w-full flex flex-col lg:flex-row  gap-8 justify-center p-6 mt-10`}>
          <Card2 externalStyles={'bg-[#599FAE] text-black w-full '} btnTitle={'Shop Now'} desc={'Small speakers worn over the ears, allowing private listening to audio content. 🎧⌚ '} image={'/assets/headphones-balancing-with-blue-background.jpg'} />
          <Card2 externalStyles={'bg-[#392A28] text-[#fff] w-full '} btnTitle={'Shop Now'} desc={' A portable wearable device resembling a watch, offering features like notifications and health tracking.'} image={'/assets/new-smartwatch-balancing-with-hand.jpg'} />
        </div>
        <div className={`${styles.products} bg-[#ffffff] flex justify-center items-center m-auto`}>
          <Products laptops={laptops} showMoreButton={true} />
        </div>

      </div>
    </>

  );
}
