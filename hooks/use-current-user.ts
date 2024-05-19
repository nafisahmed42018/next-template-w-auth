import { useSession } from 'next-auth/react'
export const useCurrentUser = () => {
  const { data: session, status } = useSession()
  if (status === 'authenticated') {
    return session?.user
  }
}
