import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center">
              <img src={logo} alt="Logo" className="w-8 h-8" />
              <span className="ml-2 text-lg font-bold">SIMS PPOB</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/topup" className="text-gray-800">
              Top Up
            </Link>
            <Link
              to="/transaction"
              className="text-gray-800"
            >
              Transaction
            </Link>
            <Link to="/profile" className="text-gray-800">
              Account
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleNavbar}
              className="text-gray-800 hover:text-red-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/topup"
              className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            >
              Top Up
            </Link>
            <Link
              to="/transaction"
              className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            >
              Transaction
            </Link>
            <Link
              to="/profile"
              className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            >
              Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
