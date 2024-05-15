'use client'

import { signOut } from 'next-auth/react'

interface LogoutButtonProps {
  children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onLogout = () => {
    signOut({ redirect: true })
  }
  return (
    <span onClick={onLogout} className="cursor-pointer">
      {children}
    </span>
  )
}
