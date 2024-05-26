'use client'

import { useQuantityContext } from "../Provider/QuantityContext";

export default function QuantityInput() {
const {quantity, setQuantity} = useQuantityContext();
  return (
    <div className='flex flex-row justify-center items-center gap-2'>
      <div onClick={() => setQuantity(quantity - 1)} className="decrease cursor-pointer size-8 rounded bg-slate-400 text-center flex items-center justify-center font-bold">-</div>
      <div className="bg-slate-400 size-12 rounded text-center flex items-center justify-center font-bold">{quantity}</div>
      <div onClick={() => setQuantity(quantity + 1)} className="increase cursor-pointer size-8 rounded bg-slate-400 text-center  flex items-center justify-center font-bold" >+</div>
    </div>
  )
}
