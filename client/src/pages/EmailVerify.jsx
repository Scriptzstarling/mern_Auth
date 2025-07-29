import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {
  axios.defaults.withCredentials = true
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent)
  const navigate = useNavigate()

  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handlekeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })

      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) {
      navigate('/')
    }
  }, [isLoggedin, userData])

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
        className='absolute left-4 sm:left-20 top-5 w-20 sm:w-28 cursor-pointer brightness-200'
      />

      <form
        onSubmit={onSubmitHandler}
        className='p-8 rounded-2xl shadow-2xl w-96 text-sm border border-gray-800 backdrop-blur-md'
        style={{
          background: 'linear-gradient(160deg, rgba(30,30,30,0.95), rgba(10,10,10,0.9))'
        }}
      >
        <h1 className='text-gray-100 text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-gray-400'>Enter the 6-digit code sent to your email id.</p>

        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              autoFocus={index === 0}
              type="text"
              maxLength="1"
              key={index}
              required
              className='w-12 h-12 bg-gray-800/70 text-gray-200 text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200'
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handlekeyDown(e, index)}
            />
          ))}
        </div>

        <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium hover:from-gray-500 hover:to-gray-700 transition-all duration-300'>
          Verify Email
        </button>
      </form>
    </div>
  )
}

export default EmailVerify
