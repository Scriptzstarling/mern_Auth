import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-100">
      {/* Profile Image */}
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6 border-2 border-gray-600 shadow-lg"
      />

      {/* Greeting */}
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2 text-gray-50">
        Hey {userData ? userData.name : 'Developer'}!
        <img className="w-8 aspect-square" src={assets.hand_wave} alt="" />
      </h1>

      {/* Main Title */}
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
        Welcome to our app
      </h2>

      {/* Subtitle */}
      <p className="mb-8 max-w-md text-gray-300">
       Take a quick tour and unlock the full power of our app in minutes!
      </p>

      
    </div>
  );
};

export default Header;
