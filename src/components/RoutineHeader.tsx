import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { Routine } from "../types/routine";
import { publicPath } from "../utils/paths";
const routineHeroImages: Record<string, string> = {
  "hyrox-men-v1": "images/hyrox/03-sled-push.png",
  "hyrox-women-v1": "images/hyrox/09-wall-ball.png",
};
export function RoutineHeader({routine}:{routine:Routine}){const heroImage=routineHeroImages[routine.key]??"images/0027-eZyBC3j.jpg";const style={"--hero-image":`url(${publicPath(heroImage)})`} as CSSProperties;return <header className="routine-hero" style={style}><nav className="hero-nav"><Link to="/" className="icon-button" aria-label="Volver">←</Link></nav><div className="hero-copy"><span className="eyebrow hero-program-label">Programa · {routine.days.length} {routine.days.length===1?"día":"días"}</span><h1>{routine.name}</h1><p>{routine.description}</p><div className="chips"><span className="chip">Nivel intermedio</span><span className="chip">Hipertrofia</span><span className="chip">45–60 min</span></div></div></header>}
