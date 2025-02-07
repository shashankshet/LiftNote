import React, { useState, useEffect } from "react";
import workoutCategories from "../data/workoutCategories.json";
import { motion } from "framer-motion";
import { SearchIcon } from "@heroicons/react/solid";
import ExercisePopup from "./ExercisePopup";
import WorkoutSummaryPopup from "./WorkoutSummaryPopup";
import { workoutService } from "../services/workout.service";

const Trackworkout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const [lastWorkout, setLastWorkout] = useState({});

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const data = await workoutService.getWorkouts();
      setWorkouts(data || []);
    } catch (err) {
      setError("Failed to fetch workouts");
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleWorkoutSave = (weight, reps) => {
    setLastWorkout({ exercise: selectedExercise, weight, reps });
    setShowSummaryPopup(true);
  };

  const handleAddNewLog = () => {
    setSelectedExercise(null);
    setSelectedCategory(null);
  };

  const filteredExercises = workoutCategories
    .filter((category) => !selectedCategory || category.name === selectedCategory)
    .flatMap((category) => category.exercises)
    .filter((exercise) =>
      exercise.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 p-6 w-full">
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {/* Header with Search */}
      <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 backdrop-blur-sm p-6 z-10 flex flex-col items-center space-y-4 border-b border-gray-800">
        <motion.input
          type="text"
          placeholder="Search workouts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-xl bg-black text-white border border-gray-800 placeholder-gray-400 focus:border-white transition-colors focus:outline-none"
          whileFocus={{ scale: 1.02 }}
        />
        
        {/* Categories */}
        <div className="relative w-full max-w-md overflow-x-auto scrollbar-hide">
          <div className="flex justify-start gap-4">
            {workoutCategories.map((category, index) => (
              <motion.button
                key={index}
                className={`flex-shrink-0 w-28 sm:w-32 h-12 rounded-full shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 border ${
                  selectedCategory === category.name 
                    ? 'bg-white text-black border-white' 
                    : 'bg-black text-white border-gray-800 hover:border-white'
                }`}
                onClick={() => handleCategoryClick(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-full h-full flex items-center justify-center space-x-2">
                  <SearchIcon className="h-5 w-5" />
                  <h2 className="text-sm font-semibold">{category.name}</h2>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="w-full max-w-md p-4 mt-36">
        <motion.ul
          className="bg-black border border-gray-800 rounded-xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredExercises.map((exercise, index) => (
            <motion.li
              key={index}
              className="border-b border-gray-800 last:border-0 cursor-pointer transition-colors hover:bg-gray-900"
              whileHover={{ scale: 1.01 }}
              onClick={() => handleExerciseClick(exercise)}
            >
              <div className="p-4 flex items-center justify-between">
                <h2 className="text-lg font-light text-white">{exercise}</h2>
                <div className="text-gray-400">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Recent Workouts Section */}
      <div className="w-full max-w-md mt-8">
        <h2 className="text-white text-xl mb-4">Recent Workouts</h2>
        {loading ? (
          <div className="text-gray-400">Loading workouts...</div>
        ) : workouts.length > 0 ? (
          <div className="space-y-4">
            {workouts.map((workout, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 rounded-lg p-4"
              >
                <div className="text-white font-medium">{workout.exercise}</div>
                <div className="text-gray-400">
                  {workout.weight} {workout.unit} × {workout.reps} reps
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(workout.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">No workouts recorded yet</div>
        )}
      </div>

      {/* Exercise Popup */}
      {selectedExercise && (
        <ExercisePopup
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onSubmit={handleWorkoutSave}
        />
      )}

      {/* Workout Summary Popup */}
      {showSummaryPopup && (
        <WorkoutSummaryPopup
          exercise={lastWorkout.exercise}
          weight={lastWorkout.weight}
          reps={lastWorkout.reps}
          onClose={() => setShowSummaryPopup(false)}
          onAddNewLog={handleAddNewLog}
        />
      )}
    </div>
  );
};

export default Trackworkout;
