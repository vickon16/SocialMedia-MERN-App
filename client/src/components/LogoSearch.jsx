import React from 'react'
import Logo from '../img/logo.png'
import {MdSearch} from "react-icons/md"


const LogoSearch = () => {
  return (
   <section className="flex items-center gap-3 w-full">
       <img src={Logo} alt="Logo" className='h-[25px] aspect-auto' />

       <div className="flex border border-gray-300 rounded !p-2 w-full">
           <input type="text" placeholder='#Explore...' className='bg-transparent border-none outline-none w-full' />
           <div className="flex_center custom-gradient p-1 text-white rounded-sm cursor-pointer">
               <MdSearch/>
           </div>
       </div>
   </section>
  )
}

export default LogoSearch