'use client'

import Link from 'next/link'
import { DropdownMenuItem, DropdownMenuShortcut } from '../ui/dropdown-menu'
import React, { FC } from 'react'

interface DropDownMenuItemProps {
  children: React.ReactNode
  label: string
  redirect?: string
  shortcut?: string
  onItemClick?: () => void
}

const UserMenuItem: FC<DropDownMenuItemProps> = ({
  children,
  label,
  redirect,
  shortcut,
  onItemClick,
}) => {
  return (
    <DropdownMenuItem onClick={() => onItemClick}>
      <Link
        href={`${redirect}`}
        className=" w-full flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          {children}
          <span>{label}</span>
        </div>
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </Link>
    </DropdownMenuItem>
  )
}
export default UserMenuItem
