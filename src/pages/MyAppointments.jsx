import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { CreditCard, XCircle, Search } from 'lucide-react'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)
  const [search, setSearch] = useState('')

  // Simulate appointments data (should come from backend in real app)
  const appointments = doctors.slice(0, 2).map((item, index) => ({
    ...item,
    date: '25, July, 2024',
    time: '8:30 PM',
    id: index + 1,
  }))

  const filtered = appointments.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.speciality.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="w-full max-w-5xl mx-auto py-10 px-2 md:px-0">
      <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">My Appointments</h1>
      {/* Search/Filter Bar */}
      <div className="flex items-center gap-3 mb-6 bg-white rounded-2xl shadow px-4 py-3 border border-indigo-100 max-w-md">
        <Search className="w-5 h-5 text-indigo-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by doctor or speciality..."
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base"
          aria-label="Search appointments"
        />
      </div>
      {/* Appointments Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-indigo-100 bg-gradient-to-tr from-indigo-50 to-blue-50">
        <table className="min-w-full divide-y divide-indigo-100">
          <thead>
            <tr className="bg-indigo-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Speciality</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400 font-semibold">No appointments found.</td>
              </tr>
            )}
            {filtered.map((item, idx) => (
              <tr
                key={item.id}
                className={
                  idx % 2 === 0
                    ? 'bg-white'
                    : 'bg-indigo-50'
                }
              >
                <td className="px-6 py-4 flex items-center gap-3 min-w-[180px]">
                  <img
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100 shadow"
                    src={item.image}
                    alt={`Dr. ${item.name} profile`}
                  />
                  <span className="font-semibold text-gray-900">{item.name}</span>
                </td>
                <td className="px-6 py-4 text-indigo-700 font-medium">{item.speciality}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  <span className="block">{item.date}</span>
                  <span className="block text-sm text-gray-500">{item.time}</span>
                </td>
                <td className="px-6 py-4 flex flex-col gap-2 min-w-[160px]">
                  <button
                    className="flex items-center gap-2 justify-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold px-5 py-2 rounded-2xl shadow hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    aria-label="Pay online"
                  >
                    <CreditCard className="w-5 h-5" /> Pay Online
                  </button>
                  <button
                    className="flex items-center gap-2 justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-2xl shadow hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-red-400"
                    aria-label="Cancel appointment"
                  >
                    <XCircle className="w-5 h-5" /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default MyAppointments