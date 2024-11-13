// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find that page.
        </p>
        <div className="space-x-4">
          <Link
            to="/"
            className="bg-red-500 text-white py-2 px-6 rounded-md shadow-md transition transform hover:bg-red-600 hover:scale-105 duration-300 ease-in-out"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
