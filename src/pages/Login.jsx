import React, { useState } from 'react'
import { LogIn, UserPlus } from 'lucide-react'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = (event) => {
    event.preventDefault()
    // handle login/signup
  }

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-2xl text-zinc-600 text-sm shadow-2xl bg-white">
        <p className="text-2xl font-bold text-indigo-700">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p className="mb-2">Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input onChange={e => setName(e.target.value)} value={name} className="border border-zinc-300 rounded w-full p-2 mt-1" type="text" required />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input onChange={e => setEmail(e.target.value)} value={email} className="border border-zinc-300 rounded w-full p-2 mt-1" type="email" required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input onChange={e => setPassword(e.target.value)} value={password} className="border border-zinc-300 rounded w-full p-2 mt-1" type="password" required />
        </div>
        <button
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white w-full py-2 rounded-2xl text-base font-semibold shadow hover:scale-105 transition-transform flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-2"
          aria-label={state === 'Sign Up' ? 'Create account' : 'Login'}
        >
          {state === 'Sign Up' ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>
        {state === 'Sign Up' ? (
          <p>Already have an account? <span onClick={() => setState('Login')} className="text-indigo-600 underline cursor-pointer font-semibold">Login here</span></p>
        ) : (
          <p>Create a new account? <span onClick={() => setState('Sign Up')} className="text-indigo-600 underline cursor-pointer font-semibold">Click here</span></p>
        )}
      </div>
    </form>
  )
}

export default Login