import React from "react";

const Cardio = () => {
  const cardioExercises = ["Running", "Cycling", "Jump Rope", "Swimming"];

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <h1 className="text-2xl font-bold">Cardio Exercises</h1>
      {cardioExercises.map((exercise) => (
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

export default Cardio;
