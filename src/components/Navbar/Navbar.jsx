import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa";
import Menus from '../Menus/Menus';
import MobileMenus from '../MobileMenus/MobileMenus';
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Link from 'next/link';
import { DropdownProvider } from '../Provider/DropdownContext';
import Dropdown from '../DropdownMenu/Dropdown';

const Navbar = ({ jwt }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (jwt) {
      const res = fetch(`http://localhost:5000/api/v1/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt.value}` // Your access token
        }
      }).then(res => res.json()).then(res => setUser(res.data?.user));
    }

    // Cleanup function to clear suggestions when component unmounts or searchTerm changes
    return () => {
      setSuggestions([]);
    };
  }, [jwt, searchTerm]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Fetch suggestions based on the search term
    fetchSuggestions(value);
  };

  const fetchSuggestions = (query) => {
    // Implement your logic to fetch suggestions here
    // For example, you can fetch from an API
    // const res = fetch(`https://your-api.com/suggestions?query=${query}`)
    //   .then(res => res.json())
    //   .then(data => setSuggestions(data));
    // For now, let's use some mock data
    const mockSuggestions = ['Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse'];
    setSuggestions(mockSuggestions.filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase())));
  };

  const selectedCategory = localStorage.getItem('selectedValue');
  
  return (
    <>
      <div className={`${styles.navWrapper}`}>
        <div className={`${styles.navContainer} container flex flex-col md:flex-row justify-between px-8 items-center min-h-[80px] py-2 md:py-0`}>
          <div className={`${styles.logo}`}>
            <Image src="/assets/logo.jpg" alt="logo" width={70} height={70} />
          </div>
          <div className={`${styles.searchbox} md:w-1/2 `}>
            <form action="" className={`${styles.form} flex flex-row justify-between items-center h-full`}>
              <input
                type="text"
                placeholder='Search for products'
                className={`${styles.input} w-[60%]`}
                value={searchTerm}
                onChange={handleInputChange}
              />
              <div className={` flex flex-col md:flex-row md:gap-4 mr-4 items-center m-2 md:p-0 `}>
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="flex">
                    <span className={`${styles.label} text-black `}>{selectedCategory}</span> <IoIosArrowDown size={20} className={` `} />
                  </div>
                  <DropdownProvider>
                    <Dropdown />
                  </DropdownProvider>
                </div>
                <button className={`${styles.btn} bg-[#19202f] p-1 md:w-[80px] `}>Search</button>
              </div>
            </form>
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={`flex flex-row gap-4 my-3 md:my-0 `}>
            <div className={`${styles.profile}`}>
              <Link href={jwt && jwt.value !== 'loggedout' ? '/profile' : '/login'}>
                {
                  user?.image ? <Image src={user.image} alt="profile" width={30} height={30} className={`${styles.icon} rounded-full`} /> : <CgProfile size={30} className={`${styles.icon}`} />
                }
              </Link>
            </div>
            <Link href={'/cart'} className={`${styles.cart}`}>
              <FaCartShopping size={30} className={`${styles.icon}`} />
            </Link>
          </div>
        </div>
      </div>
      <div className={`${styles.menusContainer}  hidden md:flex justify-center md:px-8 items-center h-[50px] border rounded`}>
        <Menus />
      </div>

      <div className={`${styles.mobileMenuBtn} md:hidden float-right p-2 m-2 bg-[#19202f]`} onClick={() => setOpen(!open)}>
        {
          open ? <IoMdClose size={30} className={`${styles.icon}`} /> : <FiMenu size={30} className={`${styles.icon}`} />
        }
      </div>
      <div className={`${styles.mobileMenusContainer} container w-[100%]  h-[100vh] z-10  bg-slate-500 flex items-center ${open ? 'flex' : 'hidden'}  `}>
        <MobileMenus />
      </div>
    </>
  );
};

export default Navbar;
