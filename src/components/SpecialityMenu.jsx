import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { Stethoscope } from 'lucide-react'
import { motion } from 'framer-motion'

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="text-3xl font-bold text-indigo-700">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-base text-gray-600 font-medium">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto pb-2">
        {specialityData.map((item, index) => (
          <motion.div
            key={item.speciality}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(60, 80, 180, 0.10)' }}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 group"
          >
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              className="flex flex-col items-center gap-2 bg-gradient-to-tr from-indigo-50 to-blue-50 rounded-2xl shadow-md px-6 py-4 hover:from-indigo-100 hover:to-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label={`See ${item.speciality} doctors`}
            >
              <img className="w-16 sm:w-24 mb-2 rounded-full border-2 border-indigo-100 shadow group-hover:scale-105 transition-transform" src={item.image} alt={item.speciality} />
              <span className="flex items-center gap-1 text-indigo-700 font-semibold text-base">
                <Stethoscope className="w-4 h-4" /> {item.speciality}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu