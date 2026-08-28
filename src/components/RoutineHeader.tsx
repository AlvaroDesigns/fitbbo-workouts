import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { Routine } from "../types/routine";
import { publicPath } from "../utils/paths";
export function RoutineHeader({routine}:{routine:Routine}){const style={"--hero-image":`url(${publicPath("images/0027-eZyBC3j.jpg")})`} as CSSProperties;return <header className="routine-hero" style={style}><nav className="hero-nav"><Link to="/" className="icon-button" aria-label="Volver">←</Link></nav><div className="hero-copy"><span className="eyebrow" style={{color:"#b8ff4c"}}>Programa · {routine.days.length} {routine.days.length===1?"día":"días"}</span><h1>{routine.name}</h1><p>{routine.description}</p><div className="chips"><span className="chip">Nivel intermedio</span><span className="chip">Hipertrofia</span><span className="chip">45–60 min</span></div></div></header>}
