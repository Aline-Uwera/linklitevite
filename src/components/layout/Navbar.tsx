import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { Menu, X } from 'lucide-react'

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center space-x-2 font-semibold text-xl"
          >
            <span className="text-primary">LinkLite</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/shorten"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Shorten URL
                </Link>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-foreground/80 hover:text-primary"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background p-4 shadow-lg animate-slide-down">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/shorten"
                  className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                >
                  Shorten URL
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-left text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
