import React from "react";

const Biceps = () => {
  const bicepsExercises = [
    "Bicep Curls",
    "Hammer Curls",
    "Concentration Curls",
    "Preacher Curls",
  ];

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <h1 className="text-2xl font-bold">Biceps Exercises</h1>
      {bicepsExercises.map((exercise) => (
        <div
          key={exercise}
          className="w-full max-w-md py-4 bg-blue-500 text-white text-lg font-bold rounded-lg text-center"
        >
          {exercise}
        </div>
      ))}
    </div>
  );
};

export default Biceps;
