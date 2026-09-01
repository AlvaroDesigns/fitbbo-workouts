import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageSkeleton } from "../components/PageSkeleton";
import { enrichRoutineWithExercises, loadRoutine } from "../services/routine.service";
import type { Routine } from "../types/routine";
import { publicPath } from "../utils/paths";

export function WorkoutPage() {
  const { routineKey, dayKey } = useParams<{ routineKey: string; dayKey: string }>();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [started, setStarted] = useState(false);
  const [station, setStation] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (routineKey) loadRoutine(routineKey).then(async value => value && setRoutine(await enrichRoutineWithExercises(value))); }, [routineKey]);
  useEffect(() => { if (!restSeconds) return; const timer = window.setInterval(() => setRestSeconds(value => Math.max(0, value - 1)), 1000); return () => window.clearInterval(timer); }, [restSeconds]);
  const day = useMemo(() => routine?.days.find(item => item.key === dayKey), [routine, dayKey]);
  if (!day || !routine) return <PageSkeleton variant="workout" />;
  const cover = day.exercises.find(item => item.image ?? item.exercise?.image)?.image ?? day.exercises.find(item => item.exercise?.image)?.exercise?.image;
  const totalSets = day.exercises.reduce((sum, item) => sum + item.sets, 0);
  const startWorkout = () => { setStarted(true); setStation(0); setCompletedSets(0); setRestSeconds(0); };
  const current = day.exercises[station];
  const finishSet = () => { if (!current) return; if (restSeconds) { setRestSeconds(0); return; } if (completedSets + 1 >= current.sets) { if (station + 1 < day.exercises.length) { setStation(value => value + 1); setCompletedSets(0); setRestSeconds(0); } else setStarted(false); } else { setCompletedSets(value => value + 1); setRestSeconds(current.restSeconds); } };
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  return <main className="workout-page"><section className="workout-cover">{cover && <img src={publicPath(cover)} alt="" />}<div className="workout-top"><button className="icon-button" onClick={() => navigate(-1)} aria-label="Volver">←</button></div><div className="workout-title"><span className="eyebrow">Hoy · {routine.name}</span><h1>{day.name} workout</h1><p>Fuerza · Resistencia · 60–75 min</p></div></section><div className="workout-content" ref={listRef} tabIndex={-1}><div className="metrics"><div className="metric"><strong>{day.exercises.length}</strong><span>Estaciones</span></div><div className="metric"><strong>{totalSets}</strong><span>Bloques</span></div><div className="metric"><strong>60–75'</strong><span>Duración</span></div></div><div className="workout-list-title"><div><span className="eyebrow">Tu sesión</span><h2>Ejercicios</h2></div><span>{totalSets} bloques totales</span></div>{day.exercises.map((item, index) => item.exercise && <Link className="workout-exercise" to={`/exercise/${item.exerciseId}`} key={`${item.exerciseId}-${index}`} aria-label={`Ver información de ${item.exercise.name}`}><span className="number">{String(index + 1).padStart(2, "0")}</span><img src={publicPath(item.image ?? item.exercise.image)} alt="" /><div><h3>{item.exercise.name}</h3><p>{item.prescription ?? `${item.sets} series · ${item.reps} reps · ${item.restSeconds}s`}</p></div><span className="exercise-info-link">Ver</span></Link>)}</div><button className="workout-cta" onClick={startWorkout}>Empezar entrenamiento</button>{started && current?.exercise && <section className="training-sheet" role="dialog" aria-modal="true"><button className="training-close" onClick={() => setStarted(false)} aria-label="Cerrar">×</button><span className="eyebrow">Estación {station + 1} de {day.exercises.length}</span><img src={publicPath(current.image ?? current.exercise.image)} alt="" /><h2>{current.exercise.name}</h2><p>{current.prescription ?? `${current.sets} series · ${current.reps} reps`}</p><div className="training-progress"><strong>Serie {Math.min(completedSets + 1, current.sets)} / {current.sets}</strong>{restSeconds > 0 && <span>Descanso · {formatTime(restSeconds)}</span>}</div><button className="training-action" onClick={finishSet}>{restSeconds > 0 ? "Saltar descanso" : completedSets + 1 >= current.sets ? station + 1 === day.exercises.length ? "Finalizar entrenamiento" : "Siguiente estación" : "Completar serie"}</button></section>}</main>;
}
