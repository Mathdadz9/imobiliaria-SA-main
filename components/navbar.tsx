"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getCurrentUser, logout } from "@/lib/auth"
import type { User } from "@/lib/types"
import { Building2, Menu, X } from "lucide-react"

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    console.log("[v0] Navbar checking auth state")
    const currentUser = getCurrentUser()
    console.log("[v0] Navbar current user:", currentUser)
    setUser(currentUser)
  }, [pathname])

  const handleLogout = () => {
    console.log("[v0] Logging out")
    logout()
    setUser(null)
    window.location.href = "/"
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/buscar", label: "Buscar Imóveis" },
  ]

  if (user?.role === "client") {
    navLinks.push({ href: "/meus-interesses", label: "Meus Interesses" })
  }

  if (user?.role === "broker") {
    navLinks.push({ href: "/dashboard", label: "Dashboard" })
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Building2 className="h-6 w-6" />
            <span>Imobiliária Prime</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">Olá, {user.name}</span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/registro">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground">Olá, {user.name}</span>
                    <Button onClick={handleLogout} variant="outline" size="sm" className="w-full bg-transparent">
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" size="sm" className="w-full">
                      <Link href="/login">Entrar</Link>
                    </Button>
                    <Button asChild size="sm" className="w-full">
                      <Link href="/registro">Cadastrar</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
