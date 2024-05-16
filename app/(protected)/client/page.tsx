'use client'
import { UserInfo } from '@/components/user-info'
import { useCurrentUser } from '@/hooks/use-current-user'
import React from 'react'

type Props = {}

const ClientPage = (props: Props) => {
  const user = useCurrentUser()
  return (
    // <div className=" w-1/2 flex justify-center text-center">
    //   {JSON.stringify(user)}
    // </div>
    <UserInfo label="Client Component" user={user} />
  )
}

export default ClientPage
