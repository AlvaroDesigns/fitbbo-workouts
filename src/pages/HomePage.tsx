import { Link } from "react-router-dom";
import { publicPath } from "../utils/paths";

const sessions = [
  {
    key: "ppl-v1",
    title: "Push Pull Legs",
    summary: "3 días",
    duration: "45–60 min",
    image: "ppl.jpg",
    tone: "lime",
  },
  {
    key: "core-v1",
    title: "Core",
    summary: "4 ejercicios",
    duration: "25 min",
    image: "core.jpg",
    tone: "violet",
  },
  {
    key: "legs-v1",
    title: "Piernas",
    summary: "4 ejercicios",
    duration: "45 min",
    image: "legs.jpg",
    tone: "orange",
  },
  {
    key: "shoulders-v1",
    title: "Hombros",
    summary: "4 ejercicios",
    duration: "40 min",
    image: "shoulders.jpg",
    tone: "blue",
  },
  {
    key: "upper-v1",
    title: "Tren superior",
    summary: "4 ejercicios",
    duration: "45 min",
    image: "upper.jpg",
    tone: "pink",
  },
  {
    key: "chest-v1",
    title: "Pecho",
    summary: "5 ejercicios",
    duration: "50 min",
    image: "chest.jpg",
    tone: "orange",
  },
  {
    key: "back-v1",
    title: "Espalda",
    summary: "5 ejercicios",
    duration: "50 min",
    image: "back.jpg",
    tone: "blue",
  },
  {
    key: "arms-v1",
    title: "Brazos",
    summary: "6 ejercicios",
    duration: "45 min",
    image: "arms.jpg",
    tone: "violet",
  },
  {
    key: "full-body-v1",
    title: "Cuerpo completo",
    summary: "6 ejercicios",
    duration: "60 min",
    image: "full-body.jpg",
    tone: "lime",
  },
  {
    key: "hyrox-men-v1",
    title: "HYROX Hombre",
    summary: "8 estaciones",
    duration: "60–75 min",
    image: "hyrox-men.jpg",
    tone: "orange",
  },
  {
    key: "hyrox-women-v1",
    title: "HYROX Mujer",
    summary: "8 estaciones",
    duration: "60–75 min",
    image: "hyrox-women.jpg",
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
              <img
                src={publicPath(`images/cards/${session.image}`)}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="session-shade" />
              <span className="session-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="session-copy">
                <div className="session-meta">
                  <span>{session.summary}</span>
                  <span>{session.duration}</span>
                </div>
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
