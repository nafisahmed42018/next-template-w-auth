// import { Navbar } from './_components/navbar'

import ClientOnly from '@/components/client-only'
import { Navbar } from './_components/Navbar'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-primaryGradient from-sky-400 to-blue-800">
        <Navbar />
        <main>{children}</main>
      </div>
    </SessionProvider>
  )
}

export default ProtectedLayout
