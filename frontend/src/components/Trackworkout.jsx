import React, { useState } from "react";

const Trackworkout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const workoutCategories = [
    {
      name: "Cardio",
      image: "static/images/cardio.png",
      exercises: ["Running", "Cycling", "Swimming"],
    },
    {
      name: "Chest",
      image: "static/images/chest.png",
      exercises: [
        "Bench Press",
        "Machine Chest Press",
        "Incline Bench Press",
        "Chest Fly",
        "Cable Fly",
        "Push Ups",
      ],
    },
    {
      name: "Back",
      image: "static/images/Back-muscles.png",
      exercises: ["Pull Ups", "Deadlifts", "Bent Over Rows", "Lat Pulldowns"],
    },
    {
      name: "Biceps",
      image: "static/images/bicep.png",
      exercises: [
        "Bicep Curls",
        "Hammer Curls",
        "Concentration Curls",
        "Preacher Curls",
      ],
    },
    {
      name: "Triceps",
      image: "static/images/tricep.png",
      exercises: [
        "Tricep Dips",
        "Skull Crushers",
        "Tricep Pushdowns",
        "Overhead Tricep Extension",
      ],
    },
    {
      name: "Abs",
      image: "static/images/abs.png",
      exercises: ["Crunches", "Planks", "Leg Raises", "Russian Twists"],
    },
    {
      name: "Legs",
      image: "static/images/legs.png",
      exercises: ["Squats", "Lunges", "Leg Press", "Calf Raises"],
    },
  ];

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black dark:bg-black p-6">
      <input
        type="text"
        placeholder="Search workouts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 w-full max-w-md"
      />
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {workoutCategories.map((category) => (
          <button
            key={category.name}
            className={`w-24 h-24 bg-gray-800 text-white rounded-full shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform dark:bg-gray-800 ${
              selectedCategory === category.name ? "bg-blue-500" : ""
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">+</span>
              <h2 className="text-sm font-bold">{category.name}</h2>
            </div>
          </button>
        ))}
      </div>
      <div className="w-full max-w-md p-4">
        <ul className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
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
