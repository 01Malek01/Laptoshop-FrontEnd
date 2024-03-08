import React from 'react';
import styles from './products.module.css';
import Image from 'next/image'

const Products = async () => {
  const res = await fetch('http://localhost:5000/api/v1/laptops?limit=5', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'cache-tag': 'laptops' }
  }, { next: { revalidate: 60 } }).then(res => res.json()).catch(err => console.log(err));
  let laptops = res.data.laptops;

  
  return (
    <div className={styles.productsWrapper}>
      <div className={`${styles.products} bg-[#ffffff] flex  justify-center p-4`}>
        {
          laptops && laptops.map((laptop) => (
            <div key={laptop._id} className=" bg-slate-100 w-96 p-2  max-h-[700x] border ">
              <figure className=""><Image className="w-full max-h-[250px]" src={laptop.image} alt={laptop.brand} width={350} height={200} /></figure>
              <div className="card-body text-slate-500">
                <h2 className="card-title">
                  {laptop.brand} {laptop.model}
                </h2>
                <p>{laptop.price}$</p>
                <div className="card-actions justify-end">
                  <button className="btn bg-[#19202F] hover:bg-slate-300 hover:text-black">Buy Now</button>

                </div>
              </div>

            </div>
          ))
        }

      </div>
    </div>
  );
};

export default Products;
