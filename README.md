# Mi Agenda Integral

## Descripción

Crea una página nueva en Notion con el nombre: ✦ Mi Agenda Integral Añade un icono sencillo —por ejemplo, ✦, 🗓️ o 🌿— y utiliza una portada clara y minimalista. 🌤️ Panel de Hoy Puedes copiar este bloque al inicio de tu página: markdown # 🌤️ Hoy > “La constancia construye lo que la inspiración comienza.” **Fecha:** @hoy **Estado de ánimo:** 😴 / 🙂 / 😊 / ⚡ **Energía:** ⭐⭐⭐☆☆ ## 🎯 Mis 3 priorid

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · PWA

## Estructura

- `/src/App.tsx` — punto de entrada
- `/src/components/DailyPanel.tsx` — Panel de Hoy con fecha, estado de ánimo, energía, 3 prioridades, escritura del día, bienestar y cierre del día.
- `/src/components/TaskBoard.tsx` — Vista enlazada de Tareas y Agenda con filtro Hoy (no completadas), orden por prioridad y fecha.
- `/src/components/WritingSection.tsx` — Vista enlazada de Tareas y Agenda filtrada por Área=Escritura y Proyectos en progreso.
- `/src/components/HabitsTracker.tsx` — Vista enlazada de Hábitos con filtro Fecha=Hoy, lista de hábitos con casilla de completado.
- `/src/components/FinanceSnapshot.tsx` — Vista enlazada de Finanzas con filtro Fecha=Este mes, muestra ingresos/gastos y suma al final.
- `/src/components/WeeklyPlanning.tsx` — Vista enlazada de Tareas y Agenda con filtro Esta semana, vista calendario o tabla.
- `/src/components/WeeklyReview.tsx` — Bloque plegable de Revisión semanal con logros, escritura, finanzas, bienestar y plan.

## Instalación

```bash
npm install
npm run dev    # desarrollo (Vite)
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

- `VITE_SUPABASE_URL` — URL de tu proyecto Supabase (Settings → API).
- `VITE_SUPABASE_ANON_KEY` — anon/publishable key del mismo proyecto.

Las variables `VITE_*` son públicas en el navegador: **nunca** pongas la `service_role` ni otros secretos aquí.

## Deploy en Vercel

1. Importa el repositorio en [vercel.com](https://vercel.com) (framework: Vite).
2. Build command `npm run build`, output `dist/`.
3. Carga las variables `VITE_*` de `.env.example` en Settings → Environment Variables.
4. En Supabase → Auth → URL Configuration agrega el dominio de Vercel a los redirects si tu app usa login.

## Integración continua

El workflow `.github/workflows/cosmos-build.yml` valida el build en cada push y, si falta `package-lock.json`, lo genera y propone un PR con el lockfile.

## Navegación

SPA con React Router y fallback de navegación para publicación.

---

_Generado con Cosmos Code_
