'use client'
import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardWrapper } from './card-wrapper'
import { ResetSchema } from '@/schemas'
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
import { reset } from '@/actions/reset'

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [showPassword, setShowPassword] = useState(false)

  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }
  const toggleShowPassword = () => {
    setShowPassword((value) => !value)
  }

  return (
    <CardWrapper
      headerLabel={`Forgot your password`}
      backButtonLabel={`Back to login`}
      backButtonHref="/auth/login"
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
