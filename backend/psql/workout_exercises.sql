CREATE TABLE workout_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercises(id),
    sets INT DEFAULT 1,
    reps INT[],
    weight DECIMAL[],
    duration INT, -- for cardio exercises (in seconds)
    created_at TIMESTAMP DEFAULT now()
);
