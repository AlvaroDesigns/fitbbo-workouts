import { Link } from "react-router-dom";
import { publicPath } from "../utils/paths";

const sessions = [
  {
    key: "ppl-v1",
    title: "Push Pull Legs",
    meta: "3 días · 45–60 min",
    image: "upper/0025-bench-press.png",
    tone: "lime",
  },
  {
    key: "core-v1",
    title: "Core",
    meta: "4 ejercicios · 25 min",
    image: "core/0001-sit-up.png",
    tone: "violet",
  },
  {
    key: "legs-v1",
    title: "Piernas",
    meta: "4 ejercicios · 45 min",
    image: "legs/0043-squat.png",
    tone: "orange",
  },
  {
    key: "shoulders-v1",
    title: "Hombros",
    meta: "4 ejercicios · 40 min",
    image: "shoulders/0091-overhead-press.png",
    tone: "blue",
  },
  {
    key: "upper-v1",
    title: "Tren superior",
    meta: "4 ejercicios · 45 min",
    image: "upper/0025-bench-press.png",
    tone: "pink",
  },
  {
    key: "chest-v1",
    title: "Pecho",
    meta: "5 ejercicios · 50 min",
    image: "chest/0025-bench-press.png",
    tone: "orange",
  },
  {
    key: "back-v1",
    title: "Espalda",
    meta: "5 ejercicios · 50 min",
    image: "back/0027-bent-over-row.png",
    tone: "blue",
  },
  {
    key: "arms-v1",
    title: "Brazos",
    meta: "6 ejercicios · 45 min",
    image: "arms/0031-barbell-curl.png",
    tone: "violet",
  },
  {
    key: "full-body-v1",
    title: "Cuerpo completo",
    meta: "6 ejercicios · 60 min",
    image: "full-body/0043-squat.png",
    tone: "lime",
  },
  {
    key: "hyrox-men-v1",
    title: "HYROX Hombre",
    meta: "8 estaciones · 60–75 min",
    image: "hyrox/03-sled-push.png",
    tone: "orange",
  },
  {
    key: "hyrox-women-v1",
    title: "HYROX Mujer",
    meta: "8 estaciones · 60–75 min",
    image: "hyrox/09-wall-ball.png",
    tone: "pink",
  },
] as const;

export function HomePage() {
  return (
    <main className="home-page home-page-compact">
      <section className="session-section">
        <div className="home-section-head">
          <div>
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
