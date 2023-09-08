import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/image/Logo.png";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { title } = props;
  
  return (
    <nav className="w-full">
      <div className="flex items-center justify-between h-16 px-4 md:px-48 border-b-4 border-purple-700">
        <div>
          <Link to="/home" className="flex items-center gap-2">
            <img src={logo} alt="logo navbar" className="w-8 h-8" />
            <h1 className="text-sm font-bold">SIMS PPOB</h1>
          </Link>
        </div>
        <ul className="flex gap-x-12 font-medium">
          <li
            className={
              title === "Top Up"
                ? "text-red-600"
                : "text-black hover:text-red-400"
            }
          >
            <Link to="/topup">Top Up</Link>
          </li>
          <li
            className={
              title === "Transaction"
                ? "text-red-600"
                : "text-black hover:text-red-400"
            }
          >
            <Link to="/transaction">Transaction</Link>
          </li>
          <li
            className={
              title === "Profile"
                ? "text-red-600"
                : "text-black hover:text-red-400"
            }
          >
            <Link to="/profile">Akun</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;