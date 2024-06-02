'use client'
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
);

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      const res = await fetch(`${process.env.API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email.value, password: password.value }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMessage(errorData.message || 'Login failed. Please try again.');
        return;
      }

      const data = await res.json(); // Parse the response body as JSON
      const token = data.token; // Access the token from the parsed data
      localStorage.setItem('jwt', token); // Store the token in local storage
      console.log(localStorage.getItem('jwt'));
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };


  const formStyles = useMemo(() => "container max-w-[500px] mx-auto my-20 flex flex-col p-10 bg-slate-50 gap-3 rounded-lg", []);
  const inputStyles = useMemo(() => "input input-bordered flex items-center gap-2", []);
  const errorMessageStyles = useMemo(() => "text-red-500 text-center mt-2", []);

  return (
    <>
      <form onSubmit={handleSubmit} className={formStyles}>
        Email
        <label className={inputStyles}>
          <EmailIcon />
          <input type="text" name="email" className="grow" placeholder="Email" />
        </label>
        Password
        <label className={inputStyles}>
          <input type="password" name="password" className="grow" placeholder="Password" />
        </label>
        {errorMessage && <div className={errorMessageStyles}>{errorMessage}</div>}
        <button className="btn btn-primary mt-2">Login</button>
        <div className="text-center text-black">
          <p>Don&apos;t have an account? <Link className='text-blue-500 underline' href="/signup">Register</Link></p>
        </div>
        <div className="text-sm md:text-lg">
          Forgot Password? <Link className='text-blue-500 underline' href="/reset-password">Reset Password</Link>
        </div>
      </form>
    </>
  );
};

export default Login;
