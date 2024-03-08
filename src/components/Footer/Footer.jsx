import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaPersonDotsFromLine, FaWhatsapp } from 'react-icons/fa6'
const Footer = () => {
 return (
  <footer className="footer p-10 bg-neutral text-neutral-content">
   <aside>
    <Image src="/assets/logo.jpg" alt="logo" width={100} height={100} />
    <p>Laptop Shop <br />Copyright © Malek Mostafa 2024 - All rights reserved.</p>
   </aside>
   <nav>
    <h6 className="footer-title">Profiles</h6>
    <div className="grid grid-flow-col gap-4">
     <Link href='https://github.com/01Malek01' > <FaGithub className="w-6 h-6 hover:text-[#FFFFFF] hover:scale-150 transition-all duration-75  " /> </Link>
     <Link href='https://linkedin.com/in/malek-mostafa-salah-026362222/' > <FaLinkedin className="w-6 h-6 hover:text-[#0A66C2] hover:scale-150 transition-all duration-75 " /></Link>
     <Link href='https://wa.me/01125485384?text=Welcome!%2C%20I will be happy to help you.'><FaWhatsapp className="w-6 h-6 hover:text-[#25D366] hover:scale-150 transition-all duration-75 " /></Link>
    </div>
   </nav>
  </footer>
 )
}

export default Footer
