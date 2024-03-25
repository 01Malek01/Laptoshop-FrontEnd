import React from 'react'
import styles from './menuBtn.module.css'
import { IoIosArrowDown } from 'react-icons/io'
import Link from 'next/link'
const MenuBtn = ({ label, listItems, href }) => {
  return (
    <Link href={href} >
      <div className={`dropdown ${listItems?.length > 0 ? 'dropdown-hover' : ''}`}>
        <div tabIndex={0} role="button" className="flex">
          <span className={`${styles.label} text-black text-xl md:text-md hover:underline `}>{label}</span> <IoIosArrowDown size={20} className={`${listItems?.length > 0 ? ' ' : 'hidden'} `} />
        </div>
        {
          listItems?.length > 0 && (
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#19202f]  w-full">
              {
                listItems?.map((item, index) => (
                  <li className="text-white m-1" key={index}>{item}</li>
                ))
              }
            </ul>
          )
        }

      </div>
    </Link>
  )
}

export default MenuBtn
