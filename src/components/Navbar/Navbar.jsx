'use client'
import React, { useEffect, useCallback, useState } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import Menus from '../Menus/Menus';
import MobileMenus from '../MobileMenus/MobileMenus';
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Link from 'next/link';
import SearchBox from '../SearchBox/SearchBox';
import { useAuth } from '../Provider/AuthContext';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const {loggedIn , setLoggedIn} = useAuth();
  const jwt = typeof window !== 'undefined' && localStorage.getItem('jwt');
  useEffect(() => {
    if (jwt) {
      fetch(`${process.env.API_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt.value}` // Your access token
        }
      })
        .then(res => res.json())
        .then(res => setUser(res.data?.user))
        .catch(err => console.error('Error fetching user data:', err));
    }
  }, [jwt]);


  const toggleMenu = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  // const loggedIn = true;
  return (
    <>
      <div className={styles.navWrapper}>
        <div className={`${styles.navContainer} container flex flex-col md:flex-row justify-between px-8 items-center min-h-[80px] py-2 md:py-0`}>
          <div className={styles.logo}>
            <Image src="/assets/logo.jpg" alt="logo" width={70} height={70} />
          </div>
          <div className={`${styles.searchbox} md:w-1/2`}>
            <SearchBox />
          </div>
          <div className="flex flex-row gap-4 my-3 md:my-0">
            <div className={styles.profile}>
              <Link href={loggedIn ? '/profile' : '/login'}>
                {loggedIn && user?.image ? (
                  <Image src={user.image} alt="profile" width={30} height={30} className={`${styles.icon} rounded-full`} />
                ) : loggedIn ? (
                  <CgProfile size={30} className={styles.icon} />
                ) : (
                  <span className="underline">Login</span>
                )}
              </Link>
            </div>
            <Link href="/cart" className={styles.cart}>
              <FaCartShopping size={30} className={styles.icon} />
            </Link>
          </div>
          <div className={`${styles.mobileMenuBtn} md:hidden float-right p-2 m-2 bg-[#19202f]`} onClick={toggleMenu}>
            {open ? <IoMdClose size={30} className={styles.icon} /> : <FiMenu size={30} className={styles.icon} />}
          </div>
        </div>
      </div>
      <div className={`${styles.menusContainer} hidden md:flex justify-center md:px-8 items-center h-[50px] border rounded`}>
        <Menus />
        
      </div>
     
      <div className={`${styles.mobileMenusContainer} container w-[100%] h-[80vh] z-10 bg-slate-500 flex items-center ${open ? 'flex' : 'hidden'}`}>
        <MobileMenus setOpen={setOpen} />
      </div>
    </>
  );
}

export default Navbar;
