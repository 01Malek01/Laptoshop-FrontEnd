import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
 return (
  <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
   <div className='max-w-md w-full space-y-8'>
    <div>
     <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
      Coming Soon...
     </h2>
     <Link href='/'>
      <p className='mt-2 text-center text-md text-blue-600 underline '>
       Go back home
      </p>
     </Link>
    </div>
   </div>
  </div>
 );
};

export default NotFoundPage;