import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Trackworkout = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const workoutCategories = [
    { name: "Cardio", image: "static/images/cardio.png" },
    { name: "Chest", image: "static/images/chest.png" },
    { name: "Back", image: "static/images/Back-muscles.png" },
    { name: "Biceps", image: "static/images/bicep.png" },
    { name: "Triceps", image: "static/images/tricep.png" },
    { name: "Abs", image: "static/images/abs.png" },
    { name: "Legs", image: "static/images/legs.png" },
  ];

  const handleCardClick = (category) => {
    navigate(`/${category.toLowerCase()}`);
  };

  const filteredCategories = workoutCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black dark:bg-black p-6">
      <input
        type="text"
        placeholder="Search workouts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 w-full max-w-md"
      />
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {filteredCategories.map((category) => (
          <div
            key={category.name}
            className="w-80 h-40 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform dark:bg-gray-800"
            onClick={() => handleCardClick(category.name)}
          >
            <div className="relative w-full h-full flex">
              <div className="w-1/2 h-full p-4 flex items-center justify-center">
                <h2 className="text-xl font-bold">{category.name}</h2>
              </div>
              <div className="w-1/2 h-full relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-r-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black opacity-50 rounded-r-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trackworkout;
