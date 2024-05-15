'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { NewPasswordSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { newPassword } from '@/actions/new-password'
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa'
import PasswordTooltip from './password-tooltip'

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).*$/
  const password = form.watch('password', '')
  const confirmPassword = form.watch('confirmPassword', '')



  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      newPassword(values, token).then((data) => {
        if (data?.success) {
          setSuccess(data?.success)
        }
        if (data?.error) {
          setError(data?.error)
        }
      })
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
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                    <div className="relative ">
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
            disabled={isPending || password !== confirmPassword}
            type="submit"
            className="w-full"
          >
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
