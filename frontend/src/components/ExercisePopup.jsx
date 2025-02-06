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
          <div className="flex items-center gap-4 mb-6">
            {/* Weight Input with Unit Toggle */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg text-center text-2xl"
                  placeholder="0"
                  min="0"
                  required
                />
                <div className="mt-2 flex justify-center">
                  <div className="bg-gray-700 rounded-full p-1 flex items-center">
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
            </div>

            {/* Multiplication Symbol */}
            <span className="text-white text-2xl font-bold">×</span>

            {/* Reps Input */}
            <div className="flex-1">
              <input
                type="number"
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
            Save Set
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ExercisePopup; 