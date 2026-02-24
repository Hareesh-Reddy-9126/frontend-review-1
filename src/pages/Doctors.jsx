import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { CalendarCheck2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <section className="px-2 md:px-8">
      <p className="text-gray-600 text-lg font-medium mt-6 mb-2">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded-2xl text-sm font-semibold transition-all sm:hidden ${showFilter ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-700'}`}
        >
          Filters
        </button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
            <p
              key={spec}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-2xl transition-all cursor-pointer font-semibold ${speciality === spec ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-indigo-50'}`}
            >
              {spec}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterDoc.map((item, index) => (
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
      </div>
    </section>
  )
}

export default Doctors