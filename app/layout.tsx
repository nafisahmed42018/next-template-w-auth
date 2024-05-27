import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import ClientOnly from '@/components/client-only'
import { Toaster } from '@/components/ui/sonner'
import getSession from '@/lib/get-session'
import { ThemeProvider } from '@/providers/theme-provider'
import Navbar from '@/components/navbar/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ClientOnly>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />{' '}
              <div className="h-full flex items-center justify-center bg-primaryGradient from-sky-500 to-blue-800">
                <Toaster />
                {children}
              </div>
            </ThemeProvider>
          </ClientOnly>
        </SessionProvider>
      </body>
    </html>
  )
}
