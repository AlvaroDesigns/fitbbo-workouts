import type { Exercise } from "./exercise";

export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  reps: string;
  restSeconds: number;
  prescription?: string;
  exercise?: Exercise;
}

export interface RoutineDay {
  key: string;
  name: string;
  exercises: RoutineExercise[];
}

export interface Routine {
  key: string;
  version: number;
  name: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  days: RoutineDay[];
}
