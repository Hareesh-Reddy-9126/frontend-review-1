import React from 'react'
import { CheckCircle2, XCircle, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const iconMap = {
  success: <CheckCircle2 className="w-6 h-6 text-green-500" />,
  error: <XCircle className="w-6 h-6 text-red-500" />,
  info: <Info className="w-6 h-6 text-blue-500" />,
}

const bgMap = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-blue-50 border-blue-200',
}

const Alert = ({ show, type = 'info', message = '', onClose }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-lg border flex items-center gap-3 min-w-[280px] max-w-[90vw] ${bgMap[type]}`}
        role="alert"
        aria-live="assertive"
      >
        {iconMap[type]}
        <span className="text-base font-semibold text-gray-700 flex-1">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-gray-700 focus:outline-none"
          aria-label="Close alert"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
)

export default Alert


