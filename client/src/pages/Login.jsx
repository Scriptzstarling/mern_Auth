import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className='flex items-center justify-center min-h-screen px-6 sm:px-0'
      style={{
        background: 'radial-gradient(circle at center, #2c2c2c 0%, #0d0d0d 100%)'
      }}
    >
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=''
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer brightness-200'
      />

      {/* Updated Form with Dark Gradient */}
      <div
        className='p-10 rounded-2xl shadow-2xl w-full sm:w-96 text-gray-200 text-sm border border-gray-800 backdrop-blur-md'
        style={{
          background: 'linear-gradient(160deg, rgba(30,30,30,0.95), rgba(10,10,10,0.9))'
        }}
      >
        <h1 className='text-3xl font-semibold text-gray-100 text-center mb-3'>
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account'}
        </h1>

        <p className='text-center text-sm mb-6 text-gray-400'>
          {state === 'Sign Up' ? 'Sign up to get started' : 'Welcome back, login to continue'}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-800/70'>
              <img src={assets.person_icon} alt='' />
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className='bg-transparent outline-none w-full text-gray-200 placeholder-gray-500'
                type='text'
                placeholder='Full Name'
                required
              />
            </div>
          )}

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-800/70'>
            <img src={assets.mail_icon} alt='' />
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              className='bg-transparent outline-none w-full text-gray-200 placeholder-gray-500'
              type='email'
              placeholder='Email Id'
              required
            />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-800/70'>
            <img src={assets.lock_icon} alt='' />
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              className='bg-transparent outline-none w-full text-gray-200 placeholder-gray-500'
              type='password'
              placeholder='Password'
              required
            />
          </div>

          <p
            onClick={() => navigate('/reset-password')}
            className='mb-4 text-gray-400 hover:text-gray-200 cursor-pointer text-sm'
          >
            Forgot Password?
          </p>

          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium hover:from-gray-500 hover:to-gray-700 transition-all duration-300 shadow-lg'>
            {state}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className='text-gray-400 text-center text-xs mt-4'>
            Already have an account?
            <span
              onClick={() => setState('Login')}
              className='text-gray-200 cursor-pointer underline ml-1'
            >
              Login here
            </span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-xs mt-4'>
            Don't have an account?
            <span
              onClick={() => setState('Sign Up')}
              className='text-gray-200 cursor-pointer underline ml-1'
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default Login
