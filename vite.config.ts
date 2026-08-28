import react from "@vitejs/plugin-react";
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "github-pages-spa-fallback",
      closeBundle() {
        const indexPath = resolve("dist/index.html");
        const indexHtml = readFileSync(indexPath, "utf8");
        copyFileSync(indexPath, resolve("dist/404.html"));

        for (const filename of readdirSync(resolve("public/data/routines"))) {
          if (!filename.endsWith(".json")) continue;
          const routine = JSON.parse(
            readFileSync(resolve("public/data/routines", filename), "utf8"),
          ) as {
            key: string;
            name: string;
            description: string;
            days: Array<{ key: string }>;
          };
          const routineDirectory = resolve("dist/routine", routine.key);
          mkdirSync(routineDirectory, { recursive: true });
          const routineUrl = `https://workouts.fitbbo.com/routine/${routine.key}/`;
          const routineTitle = `${routine.name} | Rutinas Fitbbo`;
          const routineHtml = indexHtml
            .replaceAll("Rutinas de entrenamiento | Fitbbo", routineTitle)
            .replace(
              "Explora rutinas de gimnasio, fuerza, hipertrofia y HYROX con ejercicios, series, repeticiones e instrucciones paso a paso.",
              routine.description,
            )
            .replaceAll('https://workouts.fitbbo.com/"', `${routineUrl}"`)
            .replaceAll(
              "Rutinas de gimnasio, fuerza, hipertrofia y HYROX con ejercicios e instrucciones paso a paso.",
              routine.description,
            );
          writeFileSync(resolve(routineDirectory, "index.html"), routineHtml);

          for (const day of routine.days) {
            const workoutDirectory = resolve(
              routineDirectory,
              "workout",
              day.key,
            );
            mkdirSync(workoutDirectory, { recursive: true });
            writeFileSync(resolve(workoutDirectory, "index.html"), routineHtml);
          }
        }
      },
    },
  ],
  base: "/",
});
