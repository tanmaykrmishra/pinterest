import React, { useState } from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
  const { pins, loading } = PinData();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredPins = pins.filter(
    (pin) =>
      pin.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      pin.pin.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const groupedPins = filteredPins.reduce((groups, pin) => {
    const { pin: pinCategory } = pin;
    if (!groups[pinCategory]) {
      groups[pinCategory] = [];
    }
    groups[pinCategory].push(pin);
    return groups;
  }, {});

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Search by title or category..."
              className="w-full sm:w-2/3 md:w-1/2 p-4 border border-red-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {Object.keys(groupedPins).map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-3xl font-semibold text-red-600 mb-4">
                {category}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr">
                {groupedPins[category].map((pin, pinIndex) => (
                  <PinCard key={pinIndex} pin={pin} />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
