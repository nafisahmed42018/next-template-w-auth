'use client'
import * as z from 'zod'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardWrapper } from './card-wrapper'
import { RegisterSchema } from '@/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { register } from '@/actions/register'
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import PasswordTooltip from './password-tooltip'

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  })

  const password = form.watch('password', '')
  const confirmPassword = form.watch('confirmPassword', '')
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).*$/
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          }
          if (data?.success) {
            setSuccess(data.success)
          }
        })
        .finally(() => form.reset())
    })
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((value) => !value)
  }
  const toggleShowPassword = () => {
    setShowPassword((value) => !value)
  }

  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonLabel={`Already have an account?`}
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="example@mail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                      type="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Password{' '}
                    {field.value.length >= 8 &&
                      (regex.test(field.value) ? (
                        <FaCheck className=" text-green-600" />
                      ) : (
                        <PasswordTooltip
                          message="Password must be at least 8 characters and
                        include an uppercase letter, a lowercase letter,
                        a number, and a special character."
                        />
                      ))}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type={showPassword ? 'text' : 'password'}
                      />
                      <div
                        className="absolute right-[3%] bottom-[25%]"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Confirm Password{' '}
                    {field.value &&
                      field.value.length >= 8 &&
                      (password != confirmPassword ? (
                        <PasswordTooltip message={`Password doesn't match`} />
                      ) : (
                        <FaCheck className=" text-green-600" />
                      ))}
                  </FormLabel>
                  <FormControl>
                    <div className="relative ">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type={showConfirmPassword ? 'text' : 'password'}
                      />
                      <div
                        className="absolute right-[3%] bottom-[25%]"
                        onClick={toggleShowConfirmPassword}
                      >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending || password !== confirmPassword}
            className="w-full "
          >
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
