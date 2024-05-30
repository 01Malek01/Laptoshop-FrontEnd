'use client'
import React, { useEffect } from 'react'

function ResetPass() {

 const handleSumbit = (e) => {
  e.preventDefault()
  const email = e.target[0].value
  try {
   fetch(`${process.env.API_URL}/users/resetPassword`, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email })
   })

  } catch (err) {
   console.log('====================================');
   console.log(err);
   console.log('====================================');
  }

 }
 return (
  <div className="container max-w-[500px] mx-auto my-20 flex flex-col p-10 gap-5 bg-slate-50  rounded-lg  ">
   <p className='text-black text-center m-auto text-lg'>Enter your email</p>
   <div className=" text-center m-auto">
    <input className="input input-bordered join-item" placeholder="Email" />
    <button className="btn join-item md:rounded-r-full ">Submit</button>
   </div>
  </div>
 )
}

export default ResetPass
