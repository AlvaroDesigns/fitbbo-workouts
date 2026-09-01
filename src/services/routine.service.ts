import type { Routine } from "../types/routine";
import { getExercisesByIds } from "./exercise.service";
import { publicPath } from "../utils/paths";

let routineCache: Map<string, Routine> = new Map();

export async function loadRoutine(routineKey: string): Promise<Routine | null> {
  // Check cache first
  if (routineCache.has(routineKey)) {
    return routineCache.get(routineKey) ?? null;
  }

  try {
    const response = await fetch(publicPath(`data/routines/${routineKey}.json`));
    if (!response.ok) {
      return null;
    }

    const routine: Routine = await response.json();
    routineCache.set(routineKey, routine);
    return routine;
  } catch (error) {
    console.error(`Error loading routine ${routineKey}:`, error);
    return null;
  }
}

export async function enrichRoutineWithExercises(
  routine: Routine,
): Promise<Routine> {
  // Extract all exerciseIds from all days
  const exerciseIds = routine.days.reduce((acc, day) => {
    return [...acc, ...day.exercises.map((ex) => ex.exerciseId)];
  }, [] as string[]);

  // Fetch all exercises at once
  const exercises = await getExercisesByIds(exerciseIds);
  const exerciseMap = new Map(exercises.map((ex) => [ex.id, ex]));

  // Enrich routine with exercise data
  const enrichedDays = routine.days.map((day) => ({
    ...day,
    exercises: day.exercises.map((ex) => {
      const exercise = exerciseMap.get(ex.exerciseId);
      return {
        ...ex,
        exercise: exercise && { ...exercise, image: ex.image ?? exercise.image },
      };
    }),
  }));

  return {
    ...routine,
    days: enrichedDays,
  };
}
