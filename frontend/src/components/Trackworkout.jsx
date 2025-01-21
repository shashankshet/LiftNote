import React from "react";
import { useNavigate } from "react-router-dom";

const Trackworkout = () => {
  const navigate = useNavigate();
  const workoutCategories = [
    {
      name: "Cardio",
      image: "src/assets/cardio.png",
    },
    { name: "Chest", image: "src/assets/chest.png" },
    { name: "Back", image: "src/assets/Back-muscles.png" },
    { name: "Biceps", image: "src/assets/bicep.png" },
    { name: "Triceps", image: "src/assets/tricep.png" },
    { name: "Abs", image: "src/assets/abs.png" },
    { name: "Legs", image: "src/assets/legs.png" },
  ];

  const handleCardClick = (category) => {
    navigate(`/${category.toLowerCase()}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {workoutCategories.map((category) => (
        <div
          key={category.name}
          className="w-80 h-40 bg-black text-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
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
  );
};

export default Trackworkout;
