import React, { useState } from 'react';

// ─── Tipos ───────────────────────────────────────────────────────────────
type Habit = {
  id: string;
  nombre: string;
  completado: boolean;
};

// ─── Helpers ─────────────────────────────────────────────────────────────
const todayKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const demoHabits: Habit[] = [
  { id: 'h1', nombre: 'Meditar 10 min', completado: false },
  { id: 'h2', nombre: 'Leer 20 páginas', completado: false },
  { id: 'h3', nombre: 'Beber 2 L de agua', completado: false },
  { id: 'h4', nombre: 'Escribir en diario', completado: false },
  { id: 'h5', nombre: 'Estiramientos', completado: false },
];

// ─── Componente ──────────────────────────────────────────────────────────
const HabitsTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(demoHabits);
  const [fecha] = useState<string>(todayKey);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completado: !h.completado } : h))
    );
  };

  const completados = habits.filter((h) => h.completado).length;
  const total = habits.length;

  return (
    <section
      className="rounded-xl p-6"
      style={{
        backgroundColor: '#F0F5F0',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Encabezado ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-lg font-semibold tracking-tight"
          style={{ color: '#2D2A24' }}
        >
          🌿 Hábitos
        </h2>
        <span
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#4A7C59',
            border: '1px solid #D4CFC8',
          }}
        >
          {fecha}
        </span>
      </div>

      {/* ── Subtítulo enlazado ─────────────────────────────────────── */}
      <p
        className="text-xs mb-5"
        style={{ color: '#9E9488', letterSpacing: '0.02em' }}
      >
        [Vista enlazada: Hábitos / filtro Fecha = Hoy]
      </p>

      {/* ── Progreso ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-5">
        <div
          className="h-2 flex-1 rounded-full overflow-hidden"
          style={{ backgroundColor: '#D4CFC8' }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${total > 0 ? (completados / total) * 100 : 0}%`,
              backgroundColor: '#4A7C59',
            }}
          />
        </div>
        <span
          className="text-xs font-medium"
          style={{ color: '#4A7C59', minWidth: '2.5rem', textAlign: 'right' }}
        >
          {completados}/{total}
        </span>
      </div>

      {/* ── Lista de hábitos ──────────────────────────────────────── */}
      <ul className="flex flex-col gap-2" role="list">
        {habits.map((habit) => (
          <li key={habit.id}>
            <label
              className="flex items-center gap-3 cursor-pointer select-none py-2 px-3 rounded-lg transition-colors duration-150"
              style={{
                backgroundColor: habit.completado ? '#FFFFFF' : '#FFFFFF',
                border: '1px solid #E5E0D8',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#4A7C59';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#E5E0D8';
              }}
            >
              {/* Checkbox cuadrado */}
              <input
                type="checkbox"
                checked={habit.completado}
                onChange={() => toggleHabit(habit.id)}
                className="shrink-0 appearance-none w-5 h-5 border-2 rounded-sm cursor-pointer transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C59]"
                style={{
                  borderRadius: '4px',
                  borderColor: habit.completado ? '#4A7C59' : '#9E9488',
                  backgroundColor: habit.completado ? '#4A7C59' : 'transparent',
                  backgroundImage: habit.completado
                    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E")`
                    : 'none',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                aria-label={`Marcar "${habit.nombre}" como ${
                  habit.completado ? 'pendiente' : 'completado'
                }`}
              />
              {/* Nombre del hábito */}
              <span
                className="text-sm transition-all duration-200"
                style={{
                  color: habit.completado ? '#9E9488' : '#2D2A24',
                  textDecoration: habit.completado ? 'line-through' : 'none',
                  textDecorationColor: '#9E9488',
                }}
              >
                {habit.nombre}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {/* ── Separador decorativo ──────────────────────────────────── */}
      <div
        className="relative flex items-center justify-center mt-6 pt-4"
        style={{ borderTop: '1px solid #D4CFC8' }}
      >
        <span
          className="absolute px-2 text-xs"
          style={{
            color: '#D4CFC8',
            backgroundColor: '#F0F5F0',
            lineHeight: 1,
          }}
        >
          ✦
        </span>
      </div>
    </section>
  );
};

export default HabitsTracker;
