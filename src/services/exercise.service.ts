import type { Exercise } from "../types/exercise";
import { publicPath } from "../utils/paths";
import { hyroxExercises } from "../data/hyrox-exercises";

let exerciseCache: Map<string, Exercise> | null = null;
let exerciseListCache: Exercise[] | null = null;

export async function getExercises(): Promise<Exercise[]> {
  if (exerciseListCache) {
    return exerciseListCache;
  }

  try {
    const response = await fetch(publicPath("data/exercises.json"));
    if (!response.ok) {
      throw new Error("Unable to load exercises");
    }

    const catalog: Exercise[] = await response.json();
    const data = [...catalog, ...hyroxExercises];
    exerciseListCache = data;

    // Build indexed map for fast lookups
    exerciseCache = new Map(data.map((exercise) => [exercise.id, exercise]));

    return data;
  } catch (error) {
    console.error("Error loading exercises:", error);
    throw error;
  }
}

export async function getExerciseById(
  id: string,
): Promise<Exercise | undefined> {
  // Ensure cache is loaded
  if (!exerciseCache) {
    await getExercises();
  }

  return exerciseCache?.get(id);
}

export async function getExercisesByIds(ids: string[]): Promise<Exercise[]> {
  if (!exerciseCache) {
    await getExercises();
  }

  return ids
    .map((id) => exerciseCache?.get(id))
    .filter((exercise): exercise is Exercise => exercise !== undefined);
}
