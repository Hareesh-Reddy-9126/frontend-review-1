import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { CalendarCheck2 } from 'lucide-react'
import { motion } from 'framer-motion'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-700">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-base text-gray-600 font-medium">Simply browse through our extensive list of trusted doctors.</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-2 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(60, 80, 180, 0.15)' }}
            className="bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-indigo-300 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden group"
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              window.scrollTo(0, 0)
            }}
            tabIndex={0}
            aria-label={`Book appointment with Dr. ${item.name}`}
          >
            <div className="relative w-full h-48 bg-gradient-to-tr from-indigo-50 to-blue-50 flex items-center justify-center">
              <img
                className="object-cover w-28 h-28 rounded-full border-4 border-white shadow-lg mx-auto mt-6 group-hover:scale-105 transition-transform"
                src={item.image}
                alt={`Dr. ${item.name} profile`}
                loading="lazy"
              />
              <span className="absolute top-4 right-4 bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Available
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center p-5 gap-1">
              <p className="text-lg font-semibold text-gray-900 text-center">{item.name}</p>
              <p className="text-indigo-600 text-sm font-medium mb-2">{item.speciality}</p>
              <button
                onClick={e => { e.stopPropagation(); navigate(`/appointment/${item._id}`) }}
                className="mt-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold px-6 py-2 rounded-2xl shadow hover:scale-105 transition-transform flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label={`Book appointment with Dr. ${item.name}`}
              >
                <CalendarCheck2 className="w-5 h-5" /> Book Appointment
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold px-10 py-3 rounded-2xl mt-10 shadow hover:scale-105 transition-transform"
        aria-label="See more doctors"
      >
        More Doctors
      </button>
    </section>
  )
}

export default TopDoctors
