'use client'

import { useRouter } from 'next/navigation'
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog'
import { LoginForm } from './login-form'
interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  mode = 'redirect',
  asChild,
}) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
