import type { Exercise } from "../types/exercise";

const hyroxExercise = (
  id: string,
  name: string,
  image: string,
  equipment: string,
  target: string,
  steps: string[],
): Exercise => ({
  id,
  name,
  category: "hyrox",
  body_part: "full body",
  equipment,
  instructions: { es: steps.join(" "), en: steps.join(" ") },
  instruction_steps: { es: steps, en: steps },
  muscle_group: ["cuerpo completo", "cardiovascular"],
  secondary_muscles: [],
  target,
  image: `images/hyrox/${image}`,
  gif_url: `images/hyrox/${image}`,
});

export const hyroxExercises: Exercise[] = [
  hyroxExercise("hyrox-run", "Carrera", "01-running.png", "sin equipo", "resistencia", ["Mantén un ritmo sostenible durante el kilómetro.", "Corre erguido, con pasos cortos y relajados."]),
  hyroxExercise("hyrox-ski-erg", "SkiErg", "02-ski-erg.png", "SkiErg", "resistencia", ["Agarra ambas empuñaduras con los brazos extendidos.", "Lleva las manos hacia abajo usando dorsal, core y cadera.", "Recupera de forma controlada y mantén un ritmo constante."]),
  hyroxExercise("hyrox-sled-push", "Empuje de trineo", "03-sled-push.png", "trineo", "fuerza", ["Apoya las manos en los postes y mantén el tronco inclinado.", "Empuja con pasos cortos y potentes sin redondear la espalda."]),
  hyroxExercise("hyrox-sled-pull", "Arrastre de trineo", "04-sled-pull.png", "trineo y cuerda", "fuerza", ["Tensa la cuerda y desplaza el peso del cuerpo hacia atrás.", "Tira de la cuerda mano sobre mano manteniendo el core firme."]),
  hyroxExercise("hyrox-burpee-broad-jump", "Burpee broad jumps", "05-burpee-broad-jump.png", "peso corporal", "potencia", ["Baja al suelo y completa un burpee.", "Salta hacia delante con ambos pies y aterriza de forma estable.", "Repite avanzando hasta completar la distancia."]),
  hyroxExercise("hyrox-row", "Remo", "06-rowing.png", "remo ergómetro", "resistencia", ["Impulsa primero con las piernas.", "Extiende la cadera y termina llevando el agarre hacia el torso.", "Vuelve de forma fluida: brazos, tronco y piernas."]),
  hyroxExercise("hyrox-farmers-carry", "Farmer's carry", "07-farmers-carry.png", "kettlebells", "agarre", ["Sujeta una pesa a cada lado con los hombros atrás.", "Camina con pasos firmes sin inclinar el tronco."]),
  hyroxExercise("hyrox-sandbag-lunges", "Zancadas con saco", "08-sandbag-lunge.png", "saco de arena", "piernas", ["Coloca el saco de forma estable sobre los hombros.", "Avanza con una zancada y acerca la rodilla trasera al suelo.", "Alterna las piernas manteniendo el pecho erguido."]),
  hyroxExercise("hyrox-wall-balls", "Wall balls", "09-wall-ball.png", "balón medicinal", "potencia", ["Sujeta el balón delante del pecho y baja en sentadilla.", "Extiende cadera y rodillas para lanzar el balón al objetivo.", "Recíbelo con control y enlaza la siguiente repetición."]),
];
