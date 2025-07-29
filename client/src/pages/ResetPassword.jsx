import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {

  const { backendUrl } = useContext(AppContent)
  axios.defaults.withCredentials = true

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlekeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword })
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen px-6 sm:px-0"
      style={{
        background: 'radial-gradient(circle at center, #2c2c2c 0%, #0d0d0d 100%)'
      }}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer brightness-200"
      />

      {/* Enter email id */}
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="p-8 rounded-2xl shadow-2xl w-96 text-sm border border-gray-800 backdrop-blur-md"
          style={{
            background: 'linear-gradient(160deg, rgba(30,30,30,0.95), rgba(10,10,10,0.9))'
          }}
        >
          <h1 className="text-gray-100 text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-gray-400">
            Enter your registered email address
          </p>

          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800/70 mb-4">
            <img src={assets.mail_icon} alt="" className="w-4 h-4" />
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent outline-none text-gray-200 w-full placeholder:text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium hover:from-gray-500 hover:to-gray-700 transition-all duration-300">
            Submit
          </button>
        </form>
      )}

      {/* Otp input form */}
      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOTP}
          className="p-8 rounded-2xl shadow-2xl w-96 text-sm border border-gray-800 backdrop-blur-md"
          style={{
            background: 'linear-gradient(160deg, rgba(30,30,30,0.95), rgba(10,10,10,0.9))'
          }}
        >
          <h1 className="text-gray-100 text-2xl font-semibold text-center mb-4">
            Reset password OTP
          </h1>
          <p className="text-center mb-6 text-gray-400">
            Enter the 6-digit code sent to your email id.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 bg-gray-800/70 text-gray-200 text-center text-xl rounded-md"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handlekeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium hover:from-gray-500 hover:to-gray-700 transition-all duration-300">
            Submit
          </button>
        </form>
      )}

      {/* Enter new password */}
      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="p-8 rounded-2xl shadow-2xl w-96 text-sm border border-gray-800 backdrop-blur-md"
          style={{
            background: 'linear-gradient(160deg, rgba(30,30,30,0.95), rgba(10,10,10,0.9))'
          }}
        >
          <h1 className="text-gray-100 text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-gray-400">
            Enter the new password below
          </p>
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800/70 mb-4">
            <img src={assets.lock_icon} alt="" className="w-4 h-4" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-gray-200 flex-1 placeholder:text-gray-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium hover:from-gray-500 hover:to-gray-700 transition-all duration-300">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
