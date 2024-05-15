'use client'

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'

const SettingsPage = () => {
  const user = useCurrentUser()

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="text-center">{JSON.stringify(user)}</div>

      <Button variant={'secondary'} onClick={() => logout()}>
        Sign Out
      </Button>
    </div>
  )
}

export default SettingsPage
