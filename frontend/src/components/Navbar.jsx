import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [logintoken] = useState(localStorage.getItem("token"));
  const loginav = useNavigate();

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="bg-gray-800 p-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Logo or app name */}
        <NavLink to="/" className="text-white text-2xl font-bold">MyApp</NavLink>

        {/* Navbar Links */}
        <div className="flex space-x-4">
          <NavLink to="/" className="text-white hover:text-gray-400">Home</NavLink>
          <NavLink to="/uservote" className="text-white hover:text-gray-400">Voting</NavLink>
          {/* <NavLink to="/signup" className="text-white hover:text-gray-400">Sign Up</NavLink> */}
          
          {/* Login/Logout Button */}
          {!logintoken ? (
            <span
              onClick={() => loginav("/login")}
              className="text-white hover:text-gray-400 cursor-pointer font-semibold"
            >
              Login
            </span>
          ) : (
            <button
              onClick={logout}
              className=" text-white  rounded-md focus:outline-none"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
