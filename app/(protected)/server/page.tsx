import { UserInfo } from '@/components/user-info'
import { currentUser } from '@/lib/auth'
import React from 'react'

type Props = {}

const ServerPage = async (props: Props) => {
  const user = await currentUser()
  return (
    // <div className=" w-1/2 flex justify-center text-center">
    //   {JSON.stringify(user)}
    // </div>
    <UserInfo label="Server Component" user={user} />
  )
}

export default ServerPage
