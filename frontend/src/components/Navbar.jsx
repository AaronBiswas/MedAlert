import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200 px-6 py-4 h-20">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-gray-800">MedAlert</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 text-xl font-medium text-gray-700">
          <li
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white border border-gray-200 rounded-box w-52"
          >
            <li>
              <a>Home</a>
            </li>
          </ul>
        </div>

        {/* Button / Action */}
        <div className="hidden lg:block">
          <button className="btn btn-primary btn-md" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
