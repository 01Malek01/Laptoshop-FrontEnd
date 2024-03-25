'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react';
const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    console.log(email, password)

    try {
      const res = await fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }), // Send user data in the request body
      });

      if (!res.ok) {
        const errorData = await res.json(); // Parse error message from response body
        setErrorMessage(errorData.message || 'Login failed. Please try again.'); // Set error message (fallback to generic message)
        return; // Exit after setting error message
      }

      router.push('/'); // Redirect to home page on successful login
      router.refresh();
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.'); // Set generic error message for unexpected errors
    }
  };
  return (

    <>
      <form action="" onSubmit={handleSubmit} className='container w-[500px] mx-auto my-20 flex flex-col p-10 bg-slate-50 gap-3 rounded-lg  '>
        Email
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
          <input type="text" className="grow" placeholder="Email" />
        </label>
        Password
        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow" placeholder="password" />
        </label>
        {errorMessage && <div className='text-red-500 text-center mt-2'>{errorMessage}</div>} {/* Display error message when set */}
        <button className="btn btn-primary mt-2">Login</button>
        <div className='text-center text-black'><p>Don&apos;t have an account? <Link className='text-blue-500 underline' href="/signup">Register</Link></p></div>
        <div>Forgot Password? <Link className='text-blue-500 underline' href="/reset-password">Reset Password</Link></div>
      </form >
    </>
  )
}

export default Login
