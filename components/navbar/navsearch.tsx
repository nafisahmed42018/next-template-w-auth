'use client'
import React from 'react'
import { BsSearch } from 'react-icons/bs'
const NavSearch: React.FC = () => {
  return (
    <div className="relative max-w-[500px] w-[80%] md:w-1/2 h-10">
      <input
        type="text"
        className="pl-6 pr-10  w-full h-full bg-accent text-textColor font-medium outline-none rounded-lg truncate  placeholder:text-foreground/70 "
        placeholder="Search for Artworks, Artists, Collections"
      />

      <BsSearch
        className="text-foreground/70 placeholder:text-foreground/70 absolute top-[12px] right-[12px]"
        size={18}
      />
    </div>
  )
}

export default NavSearch
