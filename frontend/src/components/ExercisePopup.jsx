import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XIcon } from '@heroicons/react/solid';
import { workoutService } from '../services/workout.service';

const ExercisePopup = ({ exercise, onClose, onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [unit, setUnit] = useState('kg');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const workoutData = {
        exercise,
        weight: Number(weight),
        reps: Number(reps),
        unit
      };

      await workoutService.createWorkout(workoutData);
      onSubmit(weight, reps, unit);
    } catch (err) {
      setError('Failed to save workout. Please try again.');
    } finally {
      setLoading(false);
    }
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
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-xl w-[90%] max-w-md border border-gray-800 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{exercise}</h2>
          <button 
            onClick={onClose}
            className="transition-transform hover:rotate-90 duration-300"
          >
            <XIcon className="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <h3 className="text-white text-lg mb-4 font-light">What is the heaviest weight you lifted?</h3>
          <div className="flex items-start gap-4 mb-6">
            {/* Weight Input Column */}
            <div className="flex-1 flex flex-col items-center">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 bg-black text-white rounded-lg text-center text-2xl border border-gray-800 focus:border-white transition-colors focus:outline-none"
                placeholder="0"
                min="0"
                required
              />
              <div className="mt-2 w-full">
                <div className="bg-black rounded-full p-1 flex items-center justify-center border border-gray-800">
                  <button
                    type="button"
                    onClick={() => setUnit('kg')}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      unit === 'kg' 
                        ? 'bg-white text-black' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    KG
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('lbs')}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      unit === 'lbs' 
                        ? 'bg-white text-black' 
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
              <span className="text-white text-2xl font-light">×</span>
            </div>

            {/* Reps Input Column */}
            <div className="flex-1 flex flex-col items-center">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full p-3 bg-black text-white rounded-lg text-center text-2xl border border-gray-800 focus:border-white transition-colors focus:outline-none"
                placeholder="0"
                min="0"
                required
              />
              <div className="mt-2 text-center text-gray-400 text-sm font-light">
                REPS
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-white text-black p-4 rounded-lg text-xl font-semibold transition-colors
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            {loading ? 'Saving...' : 'SAVE THIS SET'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ExercisePopup; 