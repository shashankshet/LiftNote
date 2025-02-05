import React, { useState } from "react";
import workoutCategories from "../data/workoutCategories.json";

const Trackworkout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredExercises = workoutCategories
    .filter(
      (category) => !selectedCategory || category.name === selectedCategory
    )
    .flatMap((category) => category.exercises)
    .filter((exercise) =>
      exercise.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black dark:bg-black p-6 w-full">
      <div className="fixed top-0 left-0 right-0 bg-black p-6 z-10 flex flex-col items-center">
        <input
          type="text"
          placeholder="Search workouts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 w-full max-w-md"
        />
        <div className="relative w-full max-w-md overflow-x-auto scrollbar-hide">
  <div className="flex justify-start gap-2">
    {workoutCategories.map((category, index) => (
      <button
        key={index}
        className={`flex-shrink-0 w-28 sm:w-32 h-12 bg-gray-700 text-white rounded-full shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform ${
          selectedCategory === category.name ? "bg-gray-600" : ""
        }`}
        onClick={() => handleCategoryClick(category.name)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <span className="text-2xl font-bold">+</span>
          <h2 className="text-sm font-bold ml-2">{category.name}</h2>
        </div>
      </button>
    ))}
  </div>
</div>

      </div>
      <div className="w-full max-w-md p-4 mt-24">
        <ul className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden h-96 overflow-y-auto">
          {filteredExercises.map((exercise, index) => (
            <li
              key={index}
              className="p-4 border-b border-gray-700 last:border-0"
            >
              <h2 className="text-lg font-bold">{exercise}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Trackworkout;
