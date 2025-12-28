import React, { useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, Links } from 'react-router-dom';




const Navabr = () => {

  const { user } = useUser()
  const role = user?.publicMetadata?.role;
  const [isOpen, setIsOpen] = useState(false)

  const { openSignIn } = useClerk()

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-10 lg:px-36 py-5'  >
      <Link to="/" className='text-3xl font-bold text-white cursor-pointer  max-sm:text-2xl max-md:flex-1 w-auto h-auto' >DocMorph</Link>
      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center text-white gap-8 min-md:px-9 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-white overflow-hidden transition-[width] duration-350  ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`} >
        <XIcon className='md:hidden absolute top-6 right-6  w-6 h-6 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />

        <Link to="/convert" className="hover:text-blue-600 transition">
          Convert
        </Link>
        <Link to="/pricing" className="hover:text-blue-600 transition">
          Pricing
        </Link>
        <Link to="/docs" className="hover:text-blue-600 transition">
          Docs
        </Link>
        <Link to="/contact-us" className="hover:text-blue-600 transition">Contact US</Link>
        <Link to="/billing">Billing</Link>
        {role === "admin" && (
          <Link
            to="/admin"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Admin
          </Link>
        )}


      </div>

      <div className='flex items-center gap-3' >
        {
          !user ? (
            <button onClick={openSignIn} className='px-4 py-2 sm:px-7 sm:py-2 bg-linear-to-r from-[#1b002f] via-[#2b003f] to-[#5a004f] text-white text-sm font-medium
shadow-lg shadow-black/40
        hover:brightness-110 transition rounded-full font-medium cursor-pointer text-xl text-white ' >Login 👤 </button>
          ) : (

            <div className='flex items-center gap-3 ' >
              <p className='max-sm:hidden text-white' >Hi, {user.firstName + " " + user.lastName}</p>
              <UserButton />
            </div>
          )
        }
      </div>



      <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />

    </div>
  );
}

export default Navabr