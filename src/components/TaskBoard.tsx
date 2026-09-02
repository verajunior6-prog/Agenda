import React, { useState } from 'react';
import { Check, Clock, AlertCircle, Calendar, ChevronDown, Filter, ListTodo, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ─── Helpers ───────────────────────────────────────────────────────────────

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
}

function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

// ─── Tipos ─────────────────────────────────────────────────────────────────

type Priority = 'alta' | 'media' | 'baja';
type Area = 'laboral' | 'personal' | 'financiera' | 'escritura';
type Status = 'pendiente' | 'en_progreso' | 'completada';

interface Task {
  id: string;
  title: string;
  priority: Priority;
  area: Area;
  status: Status;
  dueDate: Date;
  completed: boolean;
}

// ─── Datos de demostración ─────────────────────────────────────────────────

const DEMO_TASKS: Task[] = [
  {
    id: '1',
    title: 'Revisar correo de proveedores',
    priority: 'alta',
    area: 'laboral',
    status: 'pendiente',
    dueDate: new Date(),
    completed: false,
  },
  {
    id: '2',
    title: 'Escribir borrador del capítulo 3',
    priority: 'media',
    area: 'escritura',
    status: 'en_progreso',
    dueDate: new Date(),
    completed: false,
  },
  {
    id: '3',
    title: 'Pagar factura de electricidad',
    priority: 'alta',
    area: 'financiera',
    status: 'pendiente',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    completed: false,
  },
  {
    id: '4',
    title: 'Planificar menú semanal',
    priority: 'baja',
    area: 'personal',
    status: 'pendiente',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    completed: false,
  },
  {
    id: '5',
    title: 'Preparar presentación trimestral',
    priority: 'alta',
    area: 'laboral',
    status: 'en_progreso',
    dueDate: new Date(),
    completed: false,
  },
  {
    id: '6',
    title: 'Revisar presupuesto mensual',
    priority: 'media',
    area: 'financiera',
    status: 'pendiente',
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    completed: true,
  },
  {
    id: '7',
    title: 'Editar artículo del blog',
    priority: 'media',
    area: 'escritura',
    status: 'pendiente',
    dueDate: new Date(),
    completed: false,
  },
  {
    id: '8',
    title: 'Llamar al dentista',
    priority: 'baja',
    area: 'personal',
    status: 'pendiente',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    completed: false,
  },
];

// ─── Mapas de estilos ──────────────────────────────────────────────────────

const PRIORITY_STYLES: Record<Priority, { label: string; color: string }> = {
  alta: { label: 'Alta', color: '#C0392B' },
  media: { label: 'Media', color: '#D4AC0D' },
  baja: { label: 'Baja', color: '#27AE60' },
};

const AREA_STYLES: Record<Area, { label: string; color: string }> = {
  laboral: { label: 'Laboral', color: '#3B6B8A' },
  personal: { label: 'Personal', color: '#4A7C59' },
  financiera: { label: 'Financiera', color: '#B8860B' },
  escritura: { label: 'Escritura', color: '#6B5E4E' },
};

const STATUS_STYLES: Record<Status, { label: string; bg: string; text: string }> = {
  pendiente: { label: 'Pendiente', bg: '#F7F5F2', text: '#6B5E4E' },
  en_progreso: { label: 'En progreso', bg: '#E8F0FE', text: '#3B6B8A' },
  completada: { label: 'Completada', bg: '#E6F4EA', text: '#27AE60' },
};

// ─── Componente principal ──────────────────────────────────────────────────

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [activeFilter, setActiveFilter] = useState<'hoy' | 'escritura'>('hoy');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Filtro: Hoy → no completadas, ordenadas por prioridad y fecha
  const hoyTasks = tasks
    .filter((t) => !t.completed && isToday(t.dueDate))
    .sort((a, b) => {
      const priorityOrder: Record<Priority, number> = { alta: 0, media: 1, baja: 2 };
      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;
      return a.dueDate.getTime() - b.dueDate.getTime();
    });

  // Filtro: Escritura → no completadas, ordenadas por prioridad y fecha
  const escrituraTasks = tasks
    .filter((t) => !t.completed && t.area === 'escritura')
    .sort((a, b) => {
      const priorityOrder: Record<Priority, number> = { alta: 0, media: 1, baja: 2 };
      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;
      return a.dueDate.getTime() - b.dueDate.getTime();
    });

  const filteredTasks = activeFilter === 'hoy' ? hoyTasks : escrituraTasks;

  return (
    <div className="w-full max-w-4xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* ── Encabezado ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ListTodo className="w-5 h-5" style={{ color: '#4A7C59' }} />
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ color: '#2D2A24' }}
          >
            Tareas y Agenda
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" style={{ color: '#6B5E4E' }} />
          <span className="text-sm" style={{ color: '#6B5E4E' }}>
            {activeFilter === 'hoy' ? 'Hoy' : 'Escritura'}
          </span>
        </div>
      </div>

      {/* ── Pestañas de filtro ── */}
      <div className="flex gap-1 mb-6">
        <button
          onClick={() => setActiveFilter('hoy')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            activeFilter === 'hoy'
              ? 'text-white'
              : 'hover:bg-opacity-80'
          )}
          style={{
            backgroundColor: activeFilter === 'hoy' ? '#4A7C59' : '#F7F5F2',
            color: activeFilter === 'hoy' ? '#FFFFFF' : '#2D2A24',
          }}
        >
          <Calendar className="w-4 h-4" />
          Hoy
          {hoyTasks.length > 0 && (
            <span
              className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full"
              style={{
                backgroundColor: activeFilter === 'hoy' ? 'rgba(255,255,255,0.2)' : '#E6F4EA',
                color: activeFilter === 'hoy' ? '#FFFFFF' : '#4A7C59',
              }}
            >
              {hoyTasks.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveFilter('escritura')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            activeFilter === 'escritura'
              ? 'text-white'
              : 'hover:bg-opacity-80'
          )}
          style={{
            backgroundColor: activeFilter === 'escritura' ? '#6B5E4E' : '#F7F5F2',
            color: activeFilter === 'escritura' ? '#FFFFFF' : '#2D2A24',
          }}
        >
          <BookOpen className="w-4 h-4" />
          Escritura
          {escrituraTasks.length > 0 && (
            <span
              className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full"
              style={{
                backgroundColor: activeFilter === 'escritura' ? 'rgba(255,255,255,0.2)' : '#F0EBE3',
                color: activeFilter === 'escritura' ? '#FFFFFF' : '#6B5E4E',
              }}
            >
              {escrituraTasks.length}
            </span>
          )}
        </button>
      </div>

      {/* ── Sección: ✅ Tareas de hoy ── */}
      {activeFilter === 'hoy' && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg" role="img" aria-label="check">✅</span>
            <h2
              className="text-lg font-semibold"
              style={{ color: '#2D2A24' }}
            >
              Tareas de hoy
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F7F5F2', color: '#6B5E4E' }}>
              Vista enlazada: Tareas y Agenda / vista &ldquo;Hoy&rdquo;
            </span>
          </div>
          {renderTable(filteredTasks, toggleTask)}
        </div>
      )}

      {/* ── Sección: ✍️ Escritura ── */}
      {activeFilter === 'escritura' && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg" role="img" aria-label="escritura">✍️</span>
            <h2
              className="text-lg font-semibold"
              style={{ color: '#2D2A24' }}
            >
              Escritura
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F7F5F2', color: '#6B5E4E' }}>
              Vista enlazada: Tareas y Agenda / filtro Área = Escritura
            </span>
          </div>
          {renderTable(filteredTasks, toggleTask)}
          {/* Sub-sección: Proyectos en progreso */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #D4CFC8' }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg" role="img" aria-label="proyecto">📋</span>
              <h3
                className="text-base font-medium"
                style={{ color: '#2D2A24' }}
              >
                Proyectos en curso
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F7F5F2', color: '#6B5E4E' }}>
                Vista enlazada: Proyectos / filtro Estado = En progreso
              </span>
            </div>
            <div
              className="rounded-lg p-4 text-sm"
              style={{ backgroundColor: '#F7F5F2', color: '#6B5E4E' }}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" style={{ color: '#6B5E4E' }} />
                <span>Novela &ldquo;El último invierno&rdquo; — Capítulo 4 en revisión</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <BookOpen className="w-4 h-4" style={{ color: '#6B5E4E' }} />
                <span>Artículos semanales — 3 borradores pendientes</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Separador decorativo ── */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1" style={{ height: '1px', backgroundColor: '#D4CFC8' }} />
        <span className="text-xs" style={{ color: '#D4CFC8' }}>✦</span>
        <div className="flex-1" style={{ height: '1px', backgroundColor: '#D4CFC8' }} />
      </div>

      {/* ── Estado vacío ── */}
      {filteredTasks.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-12 rounded-lg"
          style={{ backgroundColor: '#F7F5F2' }}
        >
          <AlertCircle className="w-8 h-8 mb-3" style={{ color: '#D4CFC8' }} />
          <p className="text-sm font-medium" style={{ color: '#6B5E4E' }}>
            {activeFilter === 'hoy'
              ? 'No hay tareas pendientes para hoy. ¡Buen trabajo!'
              : 'No hay tareas de escritura pendientes.'}
          </p>
          <p className="text-xs mt-1" style={{ color: '#B0A89C' }}>
            Crea una nueva tarea para empezar.
          </p>
        </div>
      )}
    </div>
  );
};

// ─── Tabla ─────────────────────────────────────────────────────────────────

function renderTable(
  tasks: Task[],
  onToggle: (id: string) => void
) {
  if (tasks.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm" style={{ color: '#2D2A24' }}>
        <thead>
          <tr
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: '#6B5E4E', borderBottom: '1px solid #D4CFC8' }}
          >
            <th className="py-3 pr-3 text-left font-medium">Tarea</th>
            <th className="py-3 px-3 text-left font-medium">Prioridad</th>
            <th className="py-3 px-3 text-left font-medium">Área</th>
            <th className="py-3 px-3 text-left font-medium">Estado</th>
            <th className="py-3 pl-3 text-left font-medium">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={task.id}
              className="group transition-colors duration-150"
              style={{
                borderBottom: index < tasks.length - 1 ? '1px solid #D4CFC8' : 'none',
              }}
            >
              {/* Tarea con checkbox circular */}
              <td className="py-3 pr-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggle(task.id)}
                    className={cn(
                      'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                    )}
                    style={{
                      borderColor: task.completed ? '#4A7C59' : '#D4CFC8',
                      backgroundColor: task.completed ? '#4A7C59' : 'transparent',
                      '--tw-ring-color': '#4A7C59',
                    } as React.CSSProperties}
                    aria-label={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                  >
                    {task.completed && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </button>
                  <span
                    className={cn(
                      'text-sm leading-snug',
                      task.completed && 'line-through opacity-60'
                    )}
                    style={{ color: '#2D2A24' }}
                  >
                    {task.title}
                  </span>
                </div>
              </td>

              {/* Prioridad */}
              <td className="py-3 px-3">
                <span
                  className="inline-block px-2.5 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${PRIORITY_STYLES[task.priority].color}18`,
                    color: PRIORITY_STYLES[task.priority].color,
                  }}
                >
                  {PRIORITY_STYLES[task.priority].label}
                </span>
              </td>

              {/* Área */}
              <td className="py-3 px-3">
                <span
                  className="inline-block px-2.5 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${AREA_STYLES[task.area].color}18`,
                    color: AREA_STYLES[task.area].color,
                  }}
                >
                  {AREA_STYLES[task.area].label}
                </span>
              </td>

              {/* Estado */}
              <td className="py-3 px-3">
                <span
                  className="inline-block px-2.5 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: STATUS_STYLES[task.status].bg,
                    color: STATUS_STYLES[task.status].text,
                  }}
                >
                  {STATUS_STYLES[task.status].label}
                </span>
              </td>

              {/* Fecha */}
              <td className="py-3 pl-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" style={{ color: '#B0A89C' }} />
                  <span className="text-xs" style={{ color: '#6B5E4E' }}>
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskBoard;
