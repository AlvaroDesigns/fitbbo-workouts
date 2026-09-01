import { Link } from "react-router-dom";
import type { RoutineDay as RoutineDayType } from "../types/routine";
import { ExerciseCard } from "./ExerciseCard";
export function RoutineDay({
  day,
  routineKey,
}: Readonly<{
  day: RoutineDayType;
  routineKey: string;
}>) {
  return (
    <section className="day-panel glass">
      <div className="day-panel-head">
        <div>
          <span className="eyebrow">Sesión de hoy</span>
          <h3>{day.name}</h3>
        </div>
        <Link
          className="start-button"
          to={`/routine/${routineKey}/workout/${day.key}`}
        >
          Empezar
        </Link>
      </div>
      {day.exercises.map(
        (item, index) =>
          item.exercise && (
            <ExerciseCard
              key={`${item.exerciseId}-${index}`}
              exercise={item.exercise}
              image={item.image}
              sets={item.sets}
              reps={item.reps}
              restSeconds={item.restSeconds}
              prescription={item.prescription}
            />
          ),
      )}
    </section>
  );
}
