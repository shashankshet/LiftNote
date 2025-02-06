import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XIcon } from '@heroicons/react/solid';

const ExercisePopup = ({ exercise, onClose, onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [unit, setUnit] = useState('kg'); // Default to kg

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(weight, reps, unit);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-gray-800 p-6 rounded-xl w-[90%] max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{exercise}</h2>
          <button onClick={onClose}>
            <XIcon className="h-6 w-6 text-gray-400 hover:text-gray-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-white text-lg mb-4">What is the heaviest weight you lifted?</h3>
          <div className="flex items-start gap-4 mb-6">
            {/* Weight Input Column */}
            <div className="flex-1 flex flex-col items-center">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg text-center text-2xl"
                placeholder="0"
                min="0"
                required
              />
              <div className="mt-2 w-full">
                <div className="bg-gray-700 rounded-full p-1 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setUnit('kg')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      unit === 'kg' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    KG
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('lbs')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      unit === 'lbs' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    LBS
                  </button>
                </div>
              </div>
            </div>

            {/* Multiplication Symbol */}
            <div className="flex flex-col items-center justify-center h-[52px]">
              <span className="text-white text-2xl font-bold">×</span>
            </div>

            {/* Reps Input Column */}
            <div className="flex-1 flex flex-col items-center">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg text-center text-2xl"
                placeholder="0"
                min="0"
                required
              />
              <div className="mt-2 text-center text-gray-400 text-sm">
                REPS
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors"
          >
            SAVE THIS SET
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ExercisePopup; 