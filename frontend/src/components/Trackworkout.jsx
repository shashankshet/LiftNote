import React, { useState } from "react";
import workoutCategories from "../data/workoutCategories.json";
import { motion } from "framer-motion";
import { SearchIcon } from "@heroicons/react/solid";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-800 p-6 w-full">
      {/* Header with Search */}
      <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 p-6 z-10 flex flex-col items-center space-y-4">
        <motion.input
          type="text"
          placeholder="Search workouts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-xl bg-gray-700 text-white border border-gray-600 placeholder-gray-400"
          whileFocus={{ scale: 1.05 }}
        />
        
        {/* Categories */}
        <div className="relative w-full max-w-md overflow-x-auto scrollbar-hide">
          <div className="flex justify-start gap-4">
            {workoutCategories.map((category, index) => (
              <motion.button
                key={index}
                className={`flex-shrink-0 w-28 sm:w-32 h-12 bg-gray-700 text-white rounded-full shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all ${
                  selectedCategory === category.name ? "bg-gray-600" : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-full h-full flex items-center justify-center space-x-2">
                  <SearchIcon className="h-5 w-5" />
                  <h2 className="text-sm font-semibold">{category.name}</h2>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="w-full max-w-md p-4 mt-24">
        <motion.ul
          className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden h-96 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredExercises.map((exercise, index) => (
            <motion.li
              key={index}
              className="p-4 border-b border-gray-700 last:border-0"
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="text-lg font-bold text-white">{exercise}</h2>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Trackworkout;
