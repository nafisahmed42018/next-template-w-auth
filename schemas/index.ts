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
