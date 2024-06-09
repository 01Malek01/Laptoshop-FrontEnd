'use client'

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/Provider/AuthContext';

const UsernameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
);

const Signup = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { loggedIn, setLoggedIn } = useAuth();

  const password = watch('password');

  const onSubmit = async (data) => {
    const res = await fetch(`${process.env.API_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const result = await res.json(); // Parse the response body as JSON
    const token = result.token; // Access the token from the parsed data
    if (res.ok) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', token); // Store the token in local storage
        setLoggedIn(true);
      }
      router.push('/');
      router.refresh();
    } else if (res.status === 400) {
      setErrorMessage('Email already exists');
    } else {
      setErrorMessage('Signup failed. Please try again.');
    }
    console.log(res);
  };

  const inputStyles = useMemo(() => "input input-bordered flex items-center gap-2", []);
  const formContainerStyles = useMemo(() => "container max-w-[500px] mx-auto my-20 flex flex-col p-10 bg-slate-50 gap-3 rounded-lg", []);
  const errorMessageStyles = useMemo(() => "text-red-500", []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={formContainerStyles}
    >
      Name
      <label className={inputStyles}>
        <UsernameIcon />
        <input
          type="text"
          className="grow"
          placeholder="Username"
          {...register('name', { required: true, minLength: 3, maxLength: 10 })}
        />
      </label>
      {errors.name && <p className={errorMessageStyles}>Name must be between 3 and 10 characters.</p>}

      Email
      <label className={inputStyles}>
        <EmailIcon />
        <input
          type="email"
          className="grow"
          placeholder="Email"
          {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        />
      </label>
      {errors.email && <p className={errorMessageStyles}>Please enter a valid email address.</p>}

      Password
      <label className={inputStyles}>
        <input
          type="password"
          className="grow"
          placeholder="Password"
          {...register('password', { required: true, minLength: 6, pattern: /\d/ })}
        />
      </label>
      {errors.password && <p className={errorMessageStyles}>Password must be at least 6 characters long and contain a number.</p>}

      Confirm Password
      <label className={inputStyles}>
        <input
          type="password"
          className="grow"
          placeholder="Confirm Password"
          {...register('confirmPassword', { validate: value => value === password })}
        />
      </label>
      {errors.confirmPassword && <p className={errorMessageStyles}>Passwords do not match.</p>}

      <button className="btn btn-primary mt-2">Register</button>
      {errorMessage && <p className={errorMessageStyles}>{errorMessage}</p>}
    </form>
  );
};

export default Signup;
