import { authService } from './auth.service';

interface WorkoutSet {
  id?: string;
  exercise: string;
  weight: number;
  unit: string;
  reps: number;
  created_at?: string;
}

const API_URL = 'http://localhost:8080';

export const workoutService = {
  async createWorkout(workoutData: WorkoutSet): Promise<WorkoutSet> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/api/workout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(workoutData),
    });

    if (!response.ok) {
      throw new Error('Failed to create workout');
    }

    return response.json();
  },

  async getWorkouts(): Promise<WorkoutSet[]> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/api/workouts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch workouts');
    }

    return response.json();
  },
}; 