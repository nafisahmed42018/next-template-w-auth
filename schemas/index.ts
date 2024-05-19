import { UserRole } from '@prisma/client'
import * as z from 'zod'

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).*$/
const passwordRegexMessage =
  'Password must include at least one uppercase and one lowercase letter, one number, and one special character.'
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  code: z.optional(z.string().min(6).max(6)),
})
export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(6, { message: 'Name is required' }),
  password: z.string().min(8).regex(passwordRegex, {
    message: passwordRegexMessage,
  }),
  confirmPassword: z.string().min(8).regex(passwordRegex, {
    message: passwordRegexMessage,
  }),
})
export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Invalid Email address', // Custom required message
  }),
})

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8).regex(passwordRegex, {
      message: passwordRegexMessage,
    }),
    confirmPassword: z.string().min(8).regex(passwordRegex, {
      message: passwordRegexMessage,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirm'], // path of error
  })

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ARTIST, UserRole.MODERATOR]),
    password: z.string().min(8).regex(passwordRegex, {
      message: passwordRegexMessage,
    }),
    newPassword: z.string().min(8).regex(passwordRegex, {
      message: passwordRegexMessage,
    }),
    confirmNewPassword: z.string().min(8).regex(passwordRegex, {
      message: passwordRegexMessage,
    }),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }
      return true
    },
    {
      message: 'New Password is required',
      path: ['newPassword'],
    },
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false
      }
      return true
    },
    {
      message: 'Password is required',
      path: ['password'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword !== data.confirmNewPassword) {
        return false
      }
      return true
    },
    {
      message: `Passwords Don't Match`,
      path: ['confirmNewPassword'],
    },
  )
