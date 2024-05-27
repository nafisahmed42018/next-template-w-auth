'use client'
import Link from 'next/link'
import React from 'react'

const NavLinks = () => {
  return (
    <ul className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-10 ">
      <li>
        <Link
          href={`/explore`}
          className="p-0 outline-none border-none text-foreground hover:bg-transparent hover:text-primary bg-background text-base font-medium"
        >
          Explore
        </Link>
      </li>
      <li>
        <Link
          href={`/sell`}
          className="p-0 outline-none border-none text-foreground hover:bg-transparent hover:text-primary bg-background text-base font-medium"
        >
          Sell
        </Link>
      </li>
      <li>
        <Link
          href={`/register`}
          className="p-0 outline-none border-none text-foreground hover:bg-transparent hover:text-primary bg-background text-base font-medium"
        >
          Join
        </Link>
      </li>
    </ul>
  )
}

export default NavLinks
