# Fitbbo Workouts

Aplicación independiente para gestionar ejercicios, rutinas y programas de entrenamiento. SPA estática sin dependencias de backend.

## 🏗️ Arquitectura

```
fitbbo-workouts (React + Vite + TypeScript + Tailwind)
│
├── /public/data/
│   ├── exercises.json (1.324 ejercicios)
│   └── routines/
│       ├── ppl-v1.json (Push Pull Legs)
│       └── ...
│
├── /public/images/  (100+ imágenes de ejercicios)
├── /public/videos/  (100+ GIFs animados)
│
└── /src/
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── RoutinePage.tsx
    │   └── ExercisePage.tsx
    ├── components/
    │   ├── ExerciseCard.tsx
    │   ├── ExerciseDetail.tsx
    │   ├── RoutineDay.tsx
    │   └── RoutineHeader.tsx
    ├── services/
    │   ├── exercise.service.ts
    │   └── routine.service.ts
    └── types/
        ├── exercise.ts
        ├── routine.ts
        └── program.ts
```

## 🚀 Inicio rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
```

## 📋 Stack

- **React 18** - UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **JSON estático** - Base de datos

## 🎯 Características

### ✅ Implementado

- [x] Catálogo de 1.324 ejercicios
- [x] Carga eficiente con Map indexado
- [x] Rutina PPL v1 (ejemplo)
- [x] Página de rutina con ejercicios
- [x] Página de detalle de ejercicio
- [x] Instrucciones en español e inglés
- [x] Diseño mobile-first
- [x] Tailwind CSS para estilos
- [x] Caché de ejercicios y rutinas

### 🔄 Próximas fases

- [ ] Más rutinas (Upper/Lower, Full Body, etc.)
- [ ] Programas de entrenamiento
- [ ] Integración con WebView de Fitbbo Mobile
- [ ] Service Worker para modo offline
- [ ] Despliegue en Vercel

## 🔗 Rutas

- `/` - Home con lista de rutinas
- `/routine/:routineKey` - Detalle de rutina
- `/exercise/:exerciseId` - Detalle de ejercicio

## 📊 Dataset

### Origen

[exercises-dataset](https://github.com/shahanbutt/exercises-dataset)

- 1.324 ejercicios
- Imágenes y GIFs animados
- Instrucciones en múltiples idiomas

### Idiomas soportados

- Español (es)
- English (en)

## 📦 Rutinas

### Estructura

```json
{
  "key": "ppl",
  "version": 1,
  "name": "Push Pull Legs",
  "description": "...",
  "level": "intermediate",
  "days": [
    {
      "key": "push",
      "name": "Push",
      "exercises": [
        {
          "exerciseId": "1254",
          "sets": 4,
          "reps": "8-10",
          "restSeconds": 120
        }
      ]
    }
  ]
}
```

## 📝 Notas de licencia

Las imágenes y GIFs provienen de Gym Visual. Ver `LICENSE` en el dataset original.

## 📱 Integración WebView

Para Fitbbo Mobile:

```javascript
<WebView
  source={{
    uri: `https://fitbbo-workouts.vercel.app/routine/${routineKey}`
  }}
/>
```

## 🚀 Despliegue

```bash
npm install -g vercel
vercel
```

---

**Versión:** 0.1.0 | **Actualizado:** 2026-08-28
