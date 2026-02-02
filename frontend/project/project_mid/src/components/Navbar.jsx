import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  UserCircleIcon,
  DocumentCheckIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    closeMobileMenu()
    navigate('/')
  }

  const isAccountRoute = location.pathname.startsWith('/account')

  const toggleMenu = () => setIsOpen(prev => !prev)

  const closeMobileMenu = () => {
    setIsOpen(false)
    setShowAccountMenu(false)
  }

  return (
    <nav className="w-screen h-20 fixed top-0 left-0 z-50 bg-rose-50 border-b border-rose-100 drop-shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" onClick={closeMobileMenu}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-700 transition-all duration-300">
            {isAccountRoute ? 'My Account' : 'GymBae'}
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <li>
              <Link to="/" className="hover:text-rose-600">
                Home
              </Link>
            </li>

            <li
              className="relative flex items-center gap-1 cursor-pointer"
              onMouseEnter={() => setShowAccountMenu(true)}
              onMouseLeave={() => setShowAccountMenu(false)}
            >
              <span className="flex items-center gap-1 hover:text-rose-600">
                <UserCircleIcon className="w-4 h-4 text-rose-700" />
                My Account
                <ChevronDownIcon className="w-4 h-4 text-rose-700" />
              </span>

              {showAccountMenu && (
                <ul className="absolute top-full left-0 mt-2 bg-white border border-rose-100 rounded-lg shadow-lg w-52 py-2 text-sm z-50">
                  <li>
                    <Link
                      to="/account/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-rose-50 text-gray-700"
                    >
                      <UserCircleIcon className="w-4 h-4 text-rose-700" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/plan"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-rose-50 text-gray-700"
                    >
                      <DocumentCheckIcon className="w-4 h-4 text-rose-700" />
                      My Plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/subscription"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-rose-50 text-gray-700"
                    >
                      <CreditCardIcon className="w-4 h-4 text-rose-700" />
                      My Subscription
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="hover:text-rose-600">About Us</li>
            <li className="hover:text-rose-600">Support</li>
            <li className="hover:text-rose-600">Terms &amp; Policies</li>
            <li className="hover:text-rose-600">Language            </li>
          </ul>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-rose-300 rounded-lg text-rose-700 hover:bg-rose-100"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm border border-rose-300 rounded-lg text-rose-700 hover:bg-rose-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md border border-rose-200"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-rose-50 border-t border-rose-100 px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3 text-sm text-gray-800">
            <li className="border-b border-rose-200 pb-2">
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className="border-b border-rose-200 pb-2">
              <button
                className="w-full flex items-center justify-between"
                onClick={() => setShowAccountMenu(prev => !prev)}
              >
                <span className="flex items-center gap-2">
                  <UserCircleIcon className="w-4 h-4 text-rose-700" />
                  My Account
                </span>
                <ChevronDownIcon className="w-4 h-4 text-rose-700" />
              </button>
              {showAccountMenu && (
                <ul className="mt-2 ml-4 flex flex-col gap-1 text-sm">
                  <li>
                    <Link to="/account/profile" onClick={closeMobileMenu}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/plan" onClick={closeMobileMenu}>
                      My Plan
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/subscription" onClick={closeMobileMenu}>
                      My Subscription
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="border-b border-rose-200 pb-2">About Us</li>
            <li className="border-b border-rose-200 pb-2">Support</li>
            <li className="border-b border-rose-200 pb-2">Terms &amp; Policies</li>
            <li className="border-b border-rose-200 pb-2">Language</li>
          </ul>

          <div className="mt-4 flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-100"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="w-full text-center px-4 py-2 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="w-full text-center px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
