'use client'
import React from 'react'
import { ToggleTheme } from '../toggle-theme'
import Cart from './cart'
import UserMenu from './usermenu'

const NavMenu = () => {
  return (
    <ul className="flex items-center gap-5 xl:gap-8">
      <li>
        <ToggleTheme />
      </li>
      <li>
        <Cart />
      </li>
      <li>
        <UserMenu />
      </li>{' '}
    </ul>
  )
}

export default NavMenu
