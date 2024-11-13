import React from "react";
import { Link } from "react-router-dom";

const PinCard = ({ pin }) => {
  return (
    <div className="relative p-2">
      <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
        {/* Image Container with Fixed Aspect Ratio */}
        <div className="relative w-full h-64">
          <img
            src={pin.image.url}
            alt={pin.title}
            className="object-cover w-full h-full rounded-lg transition-transform duration-300"
          />
        </div>
        {/* Overlay and Button */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/pin/${pin._id}`}
            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            View Pin
          </Link>
        </div>
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-lg font-medium text-gray-700">{pin.title}</h3>
      </div>
    </div>
  );
};

export default PinCard;
