import React from "react";

const Cardio = () => {
  const cardioExercises = [
    { name: "Running", image: "static/images/running.png" },
    { name: "Cycling", image: "static/images/cycling.png" },
    { name: "Jump Rope", image: "static/images/skipping.png" },
    { name: "Swimming", image: "static/images/swimming.png" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-6 mt-4 sm:mt-8">Cardio Exercises</h1>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {cardioExercises.map((exercise) => (
          <div
            key={exercise.name}
            className="w-80 h-40 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform dark:bg-gray-800"
          >
            <div className="relative w-full h-full flex">
              <div className="w-1/2 h-full p-4 flex items-center justify-center">
                <h2 className="text-xl font-bold">{exercise.name}</h2>
              </div>
              <div className="w-1/2 h-full relative">
                <img
                  src={exercise.image}
                  alt={exercise.name}
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

export default Cardio;
