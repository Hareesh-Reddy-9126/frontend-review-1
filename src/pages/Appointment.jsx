import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { motion } from 'framer-motion'
import { CalendarCheck2, Info, BadgeCheck } from 'lucide-react'

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

// Reusable pill button (in-file, not new file)
const PillButton = React.forwardRef(({ children, selected, onClick, onKeyDown, ariaLabel, ...props }, ref) => (
  <motion.button
    ref={ref}
    type="button"
    className={[
      'px-4 py-2 rounded-2xl border bg-white text-indigo-600 shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200',
      'hover:scale-105 hover:bg-indigo-50 hover:shadow-md active:scale-95',
      selected ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg border-transparent' : 'border-indigo-200',
    ].join(' ')}
    aria-pressed={selected}
    aria-label={ariaLabel}
    tabIndex={0}
    onClick={onClick}
    onKeyDown={onKeyDown}
    whileTap={{ scale: 0.97 }}
    whileHover={{ scale: 1.05 }}
    layout
    {...props}
  >
    {children}
  </motion.button>
));

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  // For keyboard navigation
  const dateBtnRefs = useRef([])
  const timeBtnRefs = useRef([])

  const handleDateKeyDown = (e, idx) => {
    if (!docSlots.length) return;
    let nextIdx = idx;
    if (["ArrowRight", "ArrowDown"].includes(e.key)) {
      nextIdx = (idx + 1) % docSlots.length;
      dateBtnRefs.current[nextIdx]?.focus();
    } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
      nextIdx = (idx - 1 + docSlots.length) % docSlots.length;
      dateBtnRefs.current[nextIdx]?.focus();
    } else if (["Enter", " "].includes(e.key)) {
      setSlotIndex(idx);
    }
  };
  const handleTimeKeyDown = (e, idx) => {
    if (!docSlots.length) return;
    let slots = docSlots[slotIndex] || [];
    let nextIdx = idx;
    if (["ArrowRight", "ArrowDown"].includes(e.key)) {
      nextIdx = (idx + 1) % slots.length;
      timeBtnRefs.current[nextIdx]?.focus();
    } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
      nextIdx = (idx - 1 + slots.length) % slots.length;
      timeBtnRefs.current[nextIdx]?.focus();
    } else if (["Enter", " "].includes(e.key)) {
      setSlotTime(slots[idx]?.time);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      setDocInfo(doctors.find((doc) => doc._id === docId))
    }
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      // Generate slots for 7 days
      let today = new Date()
      let slots = []
      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today)
        currentDate.setDate(today.getDate() + i)
        let endTime = new Date(currentDate)
        endTime.setHours(21, 0, 0, 0)
        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
        } else {
          currentDate.setHours(10)
          currentDate.setMinutes(0)
        }
        let timeSlots = []
        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime })
          currentDate.setMinutes(currentDate.getMinutes() + 30)
        }
        slots.push(timeSlots)
      }
      setDocSlots(slots)
    }
  }, [docInfo])

  const bookAppointment = async () => {
    // Booking logic here
    // Show toast/alert on success
  }

  if (!docInfo) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="flex flex-col gap-10 items-center justify-center py-10 px-2 md:px-0"
    >
      {/* Doctor Details Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-indigo-100 flex flex-col sm:flex-row gap-6 p-6 md:p-10 relative"
        aria-label="Doctor details"
      >
        <div className="flex flex-col items-center sm:items-start gap-4">
          <img
            className="bg-gradient-to-tr from-indigo-100 to-blue-100 w-40 h-40 rounded-2xl object-cover border-4 border-white shadow-lg"
            src={docInfo.image}
            alt={`Dr. ${docInfo.name} profile`}
          />
          <span className="flex items-center gap-2 text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full mt-2">
            <BadgeCheck className="w-4 h-4" /> Available
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 flex items-center gap-2">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </h2>
          <div className="flex items-center gap-2 text-base text-gray-600 mt-1">
            <span>{docInfo.degree} - {docInfo.speciality}</span>
            <span className="py-0.5 px-2 border text-xs rounded-full bg-indigo-50 text-indigo-700 font-semibold">{docInfo.experience}</span>
          </div>
          <div className="mt-2">
            <span className="flex items-center gap-1 text-base font-semibold text-gray-900">
              About <Info className="w-4 h-4 text-indigo-400" />
            </span>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-indigo-700 font-bold">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </motion.div>

      {/* Booking Card/Modal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-4xl bg-gradient-to-tr from-indigo-50 to-blue-50 rounded-2xl shadow-xl border border-indigo-100 p-6 md:p-10 flex flex-col gap-6"
        aria-label="Book appointment"
      >
        <h3 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
          <CalendarCheck2 className="w-6 h-6" /> Book an Appointment
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Date selection */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
            <div className="flex gap-3 flex-wrap items-center w-full pb-2">
              {docSlots.length && docSlots.map((item, index) => (
                <PillButton
                  key={index}
                  ref={el => dateBtnRefs.current[index] = el}
                  selected={slotIndex === index}
                  onClick={() => setSlotIndex(index)}
                  onKeyDown={e => handleDateKeyDown(e, index)}
                  ariaLabel={`Select ${daysOfWeek[item[0]?.datetime.getDay()]}, ${item[0]?.datetime.getDate()}`}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-bold">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</span>
                    <span className="text-xs">{item[0] && item[0].datetime.getDate()}</span>
                  </div>
                </PillButton>
              ))}
            </div>
          </div>
          {/* Time selection */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">Select Time</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {docSlots.length && docSlots[slotIndex].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-medium px-4 py-2 rounded-xl border shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200
                    ${item.time === slotTime
                      ? 'bg-blue-500 text-white border-2 border-blue-600 shadow-md'
                      : 'bg-white text-blue-700 border-gray-300 hover:bg-blue-100 hover:shadow-md'}
                  `}
                  aria-pressed={item.time === slotTime}
                  aria-label={`Select time ${item.time}`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Floating label input for reason (optional) */}
        <div className="relative mt-2">
          <input
            type="text"
            id="reason"
            name="reason"
            className="peer h-12 w-full border-b-2 border-indigo-300 bg-transparent text-gray-700 placeholder-transparent focus:outline-none focus:border-indigo-500 text-base rounded-t-md"
            placeholder="Reason for appointment (optional)"
            aria-label="Reason for appointment"
          />
          <label
            htmlFor="reason"
            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-indigo-600 peer-focus:text-sm"
          >
            Reason for appointment (optional)
          </label>
        </div>
        <button
          onClick={bookAppointment}
          className="mt-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-lg font-bold px-10 py-3 rounded-2xl shadow hover:scale-105 transition-transform flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Book appointment"
        >
          <CalendarCheck2 className="w-6 h-6" /> Book Appointment
        </button>
      </motion.div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </motion.section>
  )
}

export default Appointment
