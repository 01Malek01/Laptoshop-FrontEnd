'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
const Signup = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('') // State for error message
  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const confirmPassword = e.target[3].value
    console.log(name, email, password, confirmPassword)

    const res = await fetch('http://localhost:5000/api/v1/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password, confirmPassword }) // Send user data in the request body

    })
    if (res.ok) {
      router.push('/');
      router.refresh();

    } else if (res.status === 400) {
      setErrorMessage('Email already exists')
    } else {
      setErrorMessage('Signup failed. Please try again.')
    }
    console.log(res);
  }
  return (

    <form action="POST" onSubmit={handleSubmit} className='container w-[500px] mx-auto my-20 flex flex-col p-10 bg-slate-50 gap-3 rounded-lg  '>
      Name
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        <input type="text" className="grow" placeholder="Username" />
      </label>
      Email
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
        <input type="text" className="grow" placeholder="Email" />
      </label>
      Password
      <label className="input input-bordered flex items-center gap-2">
        <input type="password" className="grow" placeholder="password" />
      </label>
      Confirm Password
      <label className="input input-bordered flex items-center gap-2">
        <input type="password" className="grow" placeholder="confirm password" />
      </label>

      <button className="btn btn-primary mt-2">Register</button>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
    </form>
  )
}

export default Signup
