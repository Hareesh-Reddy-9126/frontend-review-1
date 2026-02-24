import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'

const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className="flex bg-gradient-to-tr from-blue-50 via-indigo-100 to-white rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 shadow-xl">
      {/* ------- Left Side ------- */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-indigo-800">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0) }}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-base font-semibold px-8 py-3 rounded-2xl mt-6 shadow hover:scale-105 transition-transform flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Create account"
        >
          <LogIn className="w-5 h-5" /> Create account
        </button>
      </div>
      {/* ------- Right Side ------- */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img className="w-full absolute bottom-0 right-0 max-w-md" src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner