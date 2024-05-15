'use client'

import { useCurrentRole } from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client'
import { FormError } from '../form-error'

interface RoleGateProps {
  children: React.ReactNode
  allowedRoles: UserRole
}
export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const role = useCurrentRole()

  if (role !== allowedRoles) {
    return <FormError message="You dont have permission to access this page" />
  }

  return <>{children}</>
}
