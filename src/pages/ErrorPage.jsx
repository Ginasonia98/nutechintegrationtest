import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-red-700 text-black">
      <p className="font-bold text-4xl">Error Page</p>
      <p className="font-bold text-4xl px-1">Please click to the login page</p>
      <Link
        to="/"
        className="text-black font-bold text-4xl hover:border-green-600 hover:text-gray-400 border-b-4"
      >
        Click here
      </Link>
    </div>
  );
};

export default ErrorPage;