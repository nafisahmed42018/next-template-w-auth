import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'

const SettingsPage = async () => {
  const session = await auth()
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="text-center">{JSON.stringify(session)}</div>
      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/auth/login' })
        }}
      >
        <Button variant={'secondary'}>Sign Out</Button>
      </form>
    </div>
  )
}

export default SettingsPage
