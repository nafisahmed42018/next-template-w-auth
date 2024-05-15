import { useSession } from 'next-auth/react'
export const useProfileSetup = () => {
  const session = useSession()
  return session.data?.user?.isProfileCreated
}
