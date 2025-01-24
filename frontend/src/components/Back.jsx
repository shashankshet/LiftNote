import React, { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";

const Back = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const reportRef = useRef(null);

  useEffect(() => {
    const storedLogs =
      JSON.parse(localStorage.getItem("backWorkoutLogs")) || [];
    setWorkoutLogs(storedLogs);
  }, []);

  const backExercises = [
    { name: "Pull Ups", image: "static/images/pullup.png" },
    { name: "Deadlifts", image: "static/images/deadlift.png" },
    { name: "Bent Over Rows", image: "static/images/bentoverrows.png" },
    { name: "Lat Pulldowns", image: "static/images/latpulldown.png" },
  ];

  const handleCardClick = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "weight") setWeight(value);
    if (name === "reps") setReps(value);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setWeight("");
    setReps("");
  };

  const handleSave = () => {
    const newLog = {
      exercise: selectedExercise,
      weight: parseInt(weight),
      reps: parseInt(reps),
      set:
        workoutLogs.filter((log) => log.exercise === selectedExercise).length +
        1,
    };
    const updatedLogs = [...workoutLogs, newLog];
    setWorkoutLogs(updatedLogs);
    localStorage.setItem("backWorkoutLogs", JSON.stringify(updatedLogs));
    handleCloseModal();
  };

  const handleEdit = (index) => {
    const log = workoutLogs[index];
    setSelectedExercise(log.exercise);
    setWeight(log.weight);
    setReps(log.reps);
    setIsModalOpen(true);
    const updatedLogs = workoutLogs.filter((_, i) => i !== index);
    setWorkoutLogs(updatedLogs);
    localStorage.setItem("backWorkoutLogs", JSON.stringify(updatedLogs));
  };

  const handleDelete = (index) => {
    const updatedLogs = workoutLogs.filter((_, i) => i !== index);
    setWorkoutLogs(updatedLogs);
    localStorage.setItem("backWorkoutLogs", JSON.stringify(updatedLogs));
  };

  const generateReport = () => {
    if (reportRef.current === null) {
      return;
    }

    toPng(reportRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "back_workout_report.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to generate image", err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 mt-4 sm:mt-8">Back Exercises</h1>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {backExercises.map((exercise) => (
          <div
            key={exercise.name}
            className="w-80 h-40 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform dark:bg-gray-800"
            onClick={() => handleCardClick(exercise.name)}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-4 sm:p-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Log Workout for {selectedExercise}
            </h2>
            <label className="block text-lg font-bold mb-2">
              Enter weight (kg):
            </label>
            <input
              type="number"
              name="weight"
              value={weight}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 mb-4"
            />
            <label className="block text-lg font-bold mb-2">Enter reps:</label>
            <input
              type="number"
              name="reps"
              value={reps}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-red-500 rounded-lg"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {workoutLogs.length > 0 && (
        <div className="mt-8 w-full max-w-4xl p-4 sm:p-6">
          <h2 className="text-xl font-bold mb-4">Workout Logs</h2>
          <div ref={reportRef} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <table className="w-full bg-gray-800 text-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-4 text-left">Exercise</th>
                  <th className="p-4 text-left">Weight (kg)</th>
                  <th className="p-4 text-left">Reps</th>
                  <th className="p-4 text-left">Set</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workoutLogs.map((log, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="p-4">{log.exercise}</td>
                    <td className="p-4">{log.weight}</td>
                    <td className="p-4">{log.reps}</td>
                    <td className="p-4">Set {log.set}</td>
                    <td className="p-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        className="px-2 py-1 bg-blue-500 rounded-lg"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 rounded-lg"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 rounded-lg"
            onClick={generateReport}
          >
            Generate Report
          </button>
        </div>
      )}
    </div>
  );
};

export default Back;
