'use client'
import * as z from 'zod'
import { settings } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { SettingsSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useCurrentUser } from '@/hooks/use-current-user'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa'
import PasswordTooltip from '@/components/auth/password-tooltip'
import { UserRole } from '@prisma/client'
import { Switch } from '@/components/ui/switch'

const SettingsPage = () => {
  const { data: session, update } = useSession()
  const user = useCurrentUser()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      // @ts-ignore
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  })
  const onUpdate = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          }
          if (data?.success) {
            update()
            setSuccess(data.success)
            form.reset()
          }
        })
        .catch(() => setError('Something went wrong!'))
    })
  }
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const newPassword = form.watch('newPassword')
  const confirmNewPassword = form.watch('confirmNewPassword')

  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).*$/

  const onChange = form.formState.dirtyFields

  const toggleShowPassword = () => {
    setShowPassword((value) => !value)
  }
  const toggleShowNewPassword = () => {
    setShowNewPassword((value) => !value)
  }
  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword((value) => !value)
  }
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className=" text-2xl font-semibold text-center">⚙ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className=" space-y-6">
            <div className=" space-y-4">
              {/* Name */}
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
                        placeholder="John Doe "
                        type="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!user?.isOAuth && (
                <>
                  {/* Old Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Old Password{' '}
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
                              autoComplete="false"
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
                  {/*  New Password  */}
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          New Password{' '}
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
                              type={showNewPassword ? 'text' : 'password'}
                              autoComplete="false"
                            />
                            <div
                              className="absolute right-[3%] bottom-[25%]"
                              onClick={toggleShowNewPassword}
                            >
                              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/*  Confirm New Password  */}
                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Confirm New Password{' '}
                          {field.value &&
                            field.value.length >= 8 &&
                            (newPassword != confirmNewPassword ? (
                              <PasswordTooltip
                                message={`Password doesn't match`}
                              />
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
                              autoComplete="false"
                              type={
                                showConfirmNewPassword ? 'text' : 'password'
                              }
                            />
                            <div
                              className="absolute right-[3%] bottom-[25%]"
                              onClick={toggleShowConfirmNewPassword}
                            >
                              {showConfirmNewPassword ? (
                                <FaEye />
                              ) : (
                                <FaEyeSlash />
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {/*  Change Role  */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select a role`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                        <SelectItem value={UserRole.ARTIST}>Artist</SelectItem>
                        <SelectItem value={UserRole.MODERATOR}>
                          Moderator
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!user?.isOAuth && (
                <>
                  {/* 2FA */}
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className=" space-y-0.5">
                          <FormLabel>Two Factor Authentication</FormLabel>
                          <FormDescription>
                            Enable two factor authentication for your account
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={
                (Object.keys(onChange).length === 0 &&
                  !form.formState.isDirty) ||
                isPending
              }
            >
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingsPage
