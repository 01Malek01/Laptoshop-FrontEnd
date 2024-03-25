import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

function CustomAlert({ title }) {
 return (
  <div>
   <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition:Slide
   />
   </div>
 );
}

export default CustomAlert
