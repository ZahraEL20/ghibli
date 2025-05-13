"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Film, Home, Info, Menu } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/organisms/sheet"

export function NavBar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-sm shadow-md" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-black">Studio Ghibli</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" active={isActive("/")} label="Home" icon={<Home className="h-4 w-4 mr-1" />} />
            <NavLink href="/films" active={isActive("/films")} label="Films" icon={<Film className="h-4 w-4 mr-1" />} />
            <NavLink href="/about" active={isActive("/about")} label="About" icon={<Info className="h-4 w-4 mr-1" />} />
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-black hover:bg-black/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-bold text-black">Studio Ghibli</span>
                </div>

                <nav className="flex flex-col space-y-4">
                  <MobileNavLink
                    href="/"
                    active={isActive("/")}
                    label="Home"
                    icon={<Home className="h-5 w-5 mr-2" />}
                  />
                  <MobileNavLink
                    href="/films"
                    active={isActive("/films")}
                    label="Films"
                    icon={<Film className="h-5 w-5 mr-2" />}
                  />
                  <MobileNavLink
                    href="/about"
                    active={isActive("/about")}
                    label="About"
                    icon={<Info className="h-5 w-5 mr-2" />}
                  />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

function NavLink({
  href,
  active,
  label,
  icon,
}: { href: string; active: boolean; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`relative flex items-center text-sm font-medium transition-colors hover:text-black ${
        active ? "text-black font-bold" : "text-black/70"
      }`}
    >
      {icon}
      {label}
      {active && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full"
        />
      )}
    </Link>
  )
}

function MobileNavLink({
  href,
  active,
  label,
  icon,
}: { href: string; active: boolean; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`flex items-center text-lg font-medium p-2 rounded-md transition-colors text-black ${
        active ? "bg-primary/10 font-bold" : "hover:bg-muted"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}
