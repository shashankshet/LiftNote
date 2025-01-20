import React from "react";
import { useNavigate } from "react-router-dom";

const Trackworkout = () => {
  const navigate = useNavigate();
  const workoutCategories = [
    "Cardio",
    "Chest",
    "Back",
    "Biceps",
    "Triceps",
    "Abs",
    "Legs",
  ];

  const handleButtonClick = (category) => {
    if (category === "Chest") {
      navigate("/chest");
    } else if (category === "Cardio") {
      navigate("/cardio");
    } else if (category === "Back") {
      navigate("/back");
    } else if (category === "Biceps") {
      navigate("/biceps");
    } else if (category === "Triceps") {
      navigate("/triceps");
    } else if (category === "Abs") {
      navigate("/abs");
    } else if (category === "Legs") {
      navigate("/legs");
    }
    // Add more conditions for other categories if needed
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {workoutCategories.map((category) => (
        <button
          key={category}
          className="w-full max-w-md py-4 bg-blue-500 text-white text-lg font-bold rounded-lg hover:bg-blue-600"
          onClick={() => handleButtonClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Trackworkout;
