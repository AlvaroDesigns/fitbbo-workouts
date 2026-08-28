import { Link } from "react-router-dom";
import { publicPath } from "../utils/paths";

const sessions = [
  {
    key: "ppl-v1",
    title: "Push Pull Legs",
    meta: "3 días · 45–60 min",
    image: "0025-EIeI8Vf.jpg",
    tone: "lime",
  },
  {
    key: "core-v1",
    title: "Core",
    meta: "4 ejercicios · 25 min",
    image: "0084-7M66AVi.jpg",
    tone: "violet",
  },
  {
    key: "legs-v1",
    title: "Piernas",
    meta: "4 ejercicios · 45 min",
    image: "0043-qXTaZnJ.jpg",
    tone: "orange",
  },
  {
    key: "shoulders-v1",
    title: "Hombros",
    meta: "4 ejercicios · 40 min",
    image: "0091-kTbSH9h.jpg",
    tone: "blue",
  },
  {
    key: "upper-v1",
    title: "Tren superior",
    meta: "4 ejercicios · 45 min",
    image: "0027-eZyBC3j.jpg",
    tone: "pink",
  },
  {
    key: "chest-v1",
    title: "Pecho",
    meta: "5 ejercicios · 50 min",
    image: "0047-3TZduzM.jpg",
    tone: "orange",
  },
  {
    key: "back-v1",
    title: "Espalda",
    meta: "5 ejercicios · 50 min",
    image: "0049-dmgMp3n.jpg",
    tone: "blue",
  },
  {
    key: "arms-v1",
    title: "Brazos",
    meta: "6 ejercicios · 45 min",
    image: "0031-25GPyDY.jpg",
    tone: "violet",
  },
  {
    key: "full-body-v1",
    title: "Cuerpo completo",
    meta: "6 ejercicios · 60 min",
    image: "0032-ila4NZS.jpg",
    tone: "lime",
  },
  {
    key: "hyrox-men-v1",
    title: "HYROX Hombre",
    meta: "8 estaciones · 60–75 min",
    image: "0028-SGY8Zui.jpg",
    tone: "orange",
  },
  {
    key: "hyrox-women-v1",
    title: "HYROX Mujer",
    meta: "8 estaciones · 60–75 min",
    image: "0054-t8iSghb.jpg",
    tone: "pink",
  },
] as const;

export function HomePage() {
  return (
    <main className="home-page home-page-compact">
      <section className="session-section">
        <div className="home-section-head">
          <div>
            <span className="eyebrow">Biblioteca</span>
            <h2>Elige una sesión</h2>
          </div>
          <span>{sessions.length} planes</span>
        </div>
        <div className="session-grid">
          {sessions.map((session, index) => (
            <Link
              key={session.key}
              to={`/routine/${session.key}`}
              className={`session-card session-${session.tone} ${index === 0 ? "session-featured" : ""}`}
            >
              <img src={publicPath(`images/${session.image}`)} alt="" />
              <span className="session-shade" />
              <span className="session-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="session-copy">
                <span>{session.meta}</span>
                <h3>{session.title}</h3>
              </div>
              <span className="session-open">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
