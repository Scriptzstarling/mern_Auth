import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      {/* Logo */}
      <img src={assets.logo} alt="" className="w-28 sm:w-32 brightness-200" />

      {/* User / Login */}
      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-800 text-gray-100 relative group shadow-md">
          {userData.name[0].toUpperCase()}

          {/* Dropdown */}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-900/95 text-gray-200 text-sm rounded-lg backdrop-blur-md shadow-lg space-y-2 w-40">
              
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-2 px-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-md text-center cursor-pointer hover:opacity-90 transition-all duration-200"
                >
                  Verify Email
                </li>
              )}
              
              <li
                onClick={logout}
                className="py-2 px-3 bg-gray-800 text-red-400 font-medium rounded-md text-center cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-200"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-100 bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/80 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Login <img src={assets.arrow_icon} alt="" className="invert brightness-200" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
