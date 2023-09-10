import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-red-700 text-black">
      <p className="font-bold text-4xl">Error Page</p>
      <p className="font-bold text-4xl px-1">Please Check Page</p>
      <Link
        to="/"
        className="text-black font-bold text-4xl border-b-4"
      >
        Click Link
      </Link>
    </div>
  );
};

export default ErrorPage;