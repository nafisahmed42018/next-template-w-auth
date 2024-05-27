'use client'
import { useEffect, useRef, useState } from 'react'
import NavLogo from './navlogo'
import NavLinks from './navlinks'
import NavSearch from './navsearch'
import NavMenu from './navmenu'
import Container from '../container'

const Navbar = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const header = headerRef.current
    const body = document.body

    let lastScroll = 0
    if (!header) return

    const handleNav = () => {
      const currentScroll = window.scrollY
      if (currentScroll <= 0) {
        body.classList.remove('scroll-up')
      }

      if (
        currentScroll > lastScroll &&
        !body.classList.contains('scroll-down')
      ) {
        body.classList.remove('scroll-up')
        body.classList.add('scroll-down')
      }

      if (
        currentScroll < lastScroll &&
        body.classList.contains('scroll-down')
      ) {
        body.classList.add('scroll-up')
        body.classList.remove('scroll-down')
      }

      lastScroll = currentScroll
    }
    window.addEventListener('scroll', handleNav)
    return () => {
      window.removeEventListener('scroll', handleNav)
    }
  }, [])
  return (
    <header
      ref={headerRef}
      className={`fixed z-[1000] bg-background w-full top-0 left-0 py-6 transition-all duration-500`}
    >
      <Container>
        <nav className="flex items-center justify-between gap-8 md:gap-0">
          <div className="flex items-center justify-start gap-8 xl:gap-12 flex-grow ">
            <NavLogo />
            <NavSearch />
            <NavLinks />
          </div>

          <NavMenu />
        </nav>
      </Container>
    </header>
  )
}

export default Navbar
