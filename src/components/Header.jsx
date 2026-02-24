import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight } from 'lucide-react'

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-tr from-indigo-100 via-blue-50 to-white rounded-2xl px-6 md:px-10 lg:px-20 shadow-xl mt-8">
      {/* --------- Header Left --------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-indigo-800 font-bold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-indigo-700 text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" /> schedule your appointment hassle-free.</p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 px-8 py-3 rounded-2xl text-white text-base font-semibold m-auto md:m-0 shadow hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Book appointment"
        >
          Book appointment <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      {/* --------- Header Right --------- */}
      <div className="md:w-1/2 relative flex items-end justify-end">
        <img  src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header