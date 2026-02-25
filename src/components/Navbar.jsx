import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, User, LogIn, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'All Doctors' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)

  return (
    <nav className="sticky top-0 z-30 w-full bg-gradient-to-tr from-indigo-100 via-blue-50 to-white shadow-lg rounded-b-2xl px-2 md:px-8 lg:px-16">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-[120px] h-[38px] object-contain p-0 m-0"
            style={{ display: "block", padding: 0, margin: 0 }}
          />
          <span className="text-xl font-bold text-blue-600 p-0 m-0">
            BookMyDoc
          </span>
        </div>
        <ul className="hidden md:flex items-center gap-8 font-semibold text-indigo-900 text-base">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-2xl transition-colors duration-200 ${isActive ? 'bg-indigo-100' : 'hover:bg-indigo-50'} text-indigo-900`
                }
                aria-label={link.label}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          {token ? (
            <div className="relative group">
              <button
                className="flex items-center gap-2 focus:outline-none"
                aria-label="User menu"
              >
                <img
                  className="w-9 h-9 rounded-full border-2 border-white shadow"
                  src={assets.profile_pic}
                  alt="User profile"
                />
                <User className="w-5 h-5 text-white" />
              </button>
              <div className="absolute right-0 pt-3 hidden group-hover:block z-30">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="min-w-48 bg-white rounded-2xl shadow-xl flex flex-col gap-3 p-4 text-gray-700 font-medium"
                >
                  <button
                    onClick={() => navigate('/my-profile')}
                    className="hover:text-indigo-600 text-left"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate('/my-appointments')}
                    className="hover:text-indigo-600 text-left"
                  >
                    My Appointments
                  </button>
                  <button
                    onClick={() => { setToken(false); navigate('/') }}
                    className="flex items-center gap-2 hover:text-red-600 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </motion.div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-2xl font-semibold shadow hover:scale-105 transition-transform flex items-center gap-2"
              aria-label="Create account"
            >
              <LogIn className="w-5 h-5" /> Create account
            </button>
          )}
          <button
            onClick={() => setShowMenu(true)}
            className="md:hidden p-2 rounded-full hover:bg-white/10 focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b">
              <img src={assets.logo} className="w-32" alt="Prescripto Logo" />
              <button
                onClick={() => setShowMenu(false)}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <ul className="flex flex-col items-center gap-4 mt-8 text-lg font-semibold text-indigo-700">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `block px-6 py-3 rounded-2xl w-full text-center transition-colors duration-200 ${isActive ? 'bg-indigo-100' : 'hover:bg-indigo-50'}`
                    }
                    aria-label={link.label}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="w-full flex justify-center mt-4">
                {token ? (
                  <button
                    onClick={() => { setToken(false); setShowMenu(false); navigate('/') }}
                    className="flex items-center gap-2 text-red-600 font-semibold px-6 py-2 rounded-2xl hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                ) : (
                  <button
                    onClick={() => { setShowMenu(false); navigate('/login') }}
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-2xl font-semibold shadow flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <LogIn className="w-5 h-5" /> Create account
                  </button>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar