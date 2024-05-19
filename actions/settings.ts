'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { db } from '@/lib/db'
import { SettingsSchema } from '@/schemas'
import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const { confirmNewPassword, ...value } = values
  const user = await currentUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }
  const dbUser = await getUserById(user.id as string)
  if (!dbUser) {
    return { error: 'Unauthorized' }
  }
  if (user.isOAuth) {
    // @ts-ignore
    value.password = undefined
    // @ts-ignore
    value.newPassword = undefined
    value.isTwoFactorEnabled = undefined
  }
  if (value.password && value.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(value.password, dbUser.password)
    if (!passwordMatch) {
      return { error: 'Incorrect Password!' }
    }
    const hashedPassword = await bcrypt.hash(value.newPassword, 10)
    value.password = hashedPassword
    // @ts-ignore
    value.newPassword = undefined
  }
  await db.user.update({
    where: { id: dbUser.id },
    data: { ...value },
  })
  return { success: 'User Info updated' }
}
