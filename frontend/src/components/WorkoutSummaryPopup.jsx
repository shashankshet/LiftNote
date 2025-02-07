import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WorkoutSummaryPopup = ({ exercise, weight, reps, onClose, onAddNewLog }) => {
  // Mock values for score and better than percentage
  const score = 25; // Mock score
  const betterThanPercentage = 70; // Mock percentage

  // Data for the line graph
  const data = {
    labels: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04'], // Mock dates
    datasets: [
      {
        label: 'Weight (kg)',
        data: [20, 25, 30, 25], // Mock weights
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Function to determine the level based on score
  const getLevel = (score) => {
    if (score < 15) return 'Beginner';
    if (score < 21) return 'Novice';
    if (score < 28) return 'Intermediate';
    if (score < 40) return 'Advanced';
    return 'Elite';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-black p-6 rounded-lg border border-gray-800 w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-4">
          <button className="text-white">Edit Workout</button>
          <button className="text-white">Share</button>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{exercise}</h3>
        <div className="text-lg text-white mb-2">My Best Set: {weight} kg x {reps} reps</div>
        <div className="text-lg text-white mb-2">Score: {score}</div>
        <div className="text-lg text-white mb-2">Better Than: {betterThanPercentage}% of users</div>

        {/* Gauge */}
        <div className="mb-4">
          <div className="text-center text-white">Level: {getLevel(score)}</div>
          <div className="h-2 bg-gray-600 rounded-full">
            <div
              className={`h-full rounded-full ${
                score < 15 ? 'bg-red-500' :
                score < 21 ? 'bg-yellow-500' :
                score < 28 ? 'bg-green-500' :
                score < 40 ? 'bg-blue-500' :
                'bg-purple-500'
              }`}
              style={{ width: `${(score / 105) * 100}%` }}
            />
          </div>
        </div>

        {/* Line Graph */}
        <div className="mb-4">
          <Line data={data} />
        </div>

        <button
          onClick={() => {
            onAddNewLog(); // Call the function to reset the exercise selection
            onClose(); // Close the popup
          }}
          className="w-full bg-white text-black p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Add New Log
        </button>
      </motion.div>
    </motion.div>
  );
};

export default WorkoutSummaryPopup; 