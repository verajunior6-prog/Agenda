import { useState } from 'react';
import { Check, PenLine, Target, Clock, Sparkles, Droplets, Footprints, BookOpen, Moon, Smartphone, TrendingUp, BookMarked, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface WritingTask {
  id: number;
  name: string;
  project: string;
  time: string;
  done: boolean;
}

interface Project {
  id: number;
  name: string;
  type: string;
  currentWords: number;
  targetWords: number;
}

const initialTasks: WritingTask[] = [
  { id: 1, name: 'Escribir capítulo 3', project: 'La casa del viento', time: '09:00', done: false },
  { id: 2, name: 'Revisar escena de apertura', project: 'Relato: El faro', time: '11:30', done: false },
  { id: 3, name: 'Bosquejo de personajes', project: 'Novela: Mar de fondo', time: '16:00', done: true },
  { id: 4, name: 'Corrección de diálogos', project: 'Artículo: Oficio de escribir', time: '18:00', done: false },
];

const initialProjects: Project[] = [
  { id: 1, name: 'La casa del viento', type: 'Novela', currentWords: 24500, targetWords: 60000 },
  { id: 2, name: 'Relato: El faro', type: 'Relato', currentWords: 3200, targetWords: 5000 },
  { id: 3, name: 'Mar de fondo', type: 'Novela', currentWords: 8900, targetWords: 40000 },
  { id: 4, name: 'Oficio de escribir', type: 'Artículo', currentWords: 1450, targetWords: 2000 },
];

const wellbeingItems = [
  { label: 'Beber agua', icon: Droplets },
  { label: 'Movimiento / ejercicio', icon: Footprints },
  { label: 'Lectura', icon: BookOpen },
  { label: 'Descanso suficiente', icon: Moon },
  { label: 'Momento sin pantallas', icon: Smartphone },
];

function ProgressBar({ current, target }: { current: number; target: number }) {
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  return (
    <div className="h-2 w-full rounded-full bg-[#E8E5E0]" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`Progreso ${pct}%`}>
      <div className="h-full rounded-full bg-[#6B5E4E] transition-all duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center gap-3 my-6" aria-hidden="true">
      <div className="h-px flex-1 bg-[#D4CFC8]" />
      <Sparkles className="h-3.5 w-3.5 text-[#6B5E4E]" />
      <div className="h-px flex-1 bg-[#D4CFC8]" />
    </div>
  );
}

export default function WritingSection() {
  const [tasks, setTasks] = useState<WritingTask[]>(initialTasks);
  const [wellbeing, setWellbeing] = useState<boolean[]>(Array(wellbeingItems.length).fill(false));

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const toggleWellbeing = (idx: number) => {
    setWellbeing((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const pendingTasks = tasks.filter((t) => !t.done).length;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#2D2A24] font-['Inter']">
      <div className="mx-auto max-w-6xl px-4 py-6" style={{ padding: '16px' }}>
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 text-[#6B5E4E]">
            <PenLine className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wide uppercase">Área Escritura</span>
          </div>
          <h1 className="mt-2 font-['Crimson_Pro'] text-2xl font-normal text-[#2D2A24]">✍️ Escritura de hoy</h1>
        </header>

        {/* Two columns */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left column: writing tasks */}
          <section className="rounded-lg bg-[#F7F5F2] p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#2D2A24]">Tareas de escritura</h2>
              <span className="rounded-full bg-[#E8E5E0] px-2.5 py-0.5 text-xs font-medium text-[#6B5E4E]">
                {pendingTasks} pendientes
              </span>
            </div>

            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id}>
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className="flex w-full items-start gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-[#E8E5E0]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B5E4E]"
                    aria-pressed={task.done}
                  >
                    <span
                      className={clsx(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                        task.done ? 'border-[#6B5E4E] bg-[#6B5E4E] text-white' : 'border-[#6B5E4E]/40 bg-white'
                      )}
                    >
                      {task.done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={clsx('block truncate text-sm', task.done ? 'text-[#6B5E4E] line-through' : 'text-[#2D2A24]')}>
                        {task.name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-[#6B5E4E]">{task.project}</span>
                    </span>
                    <span className="shrink-0 text-xs text-[#6B5E4E]">{task.time}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Daily writing stats */}
            <div className="mt-6 rounded-md border border-[#D4CFC8] bg-white p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B5E4E]">
                    <Target className="h-3.5 w-3.5" />
                    Objetivo de palabras
                  </div>
                  <p className="mt-1 text-lg font-semibold text-[#2D2A24]">1.000</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B5E4E]">
                    <PenLine className="h-3.5 w-3.5" />
                    Palabras escritas
                  </div>
                  <p className="mt-1 text-lg font-semibold text-[#2D2A24]">640</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B5E4E]">
                    <Clock className="h-3.5 w-3.5" />
                    Tiempo dedicado
                  </div>
                  <p className="mt-1 text-lg font-semibold text-[#2D2A24]">1h 20m</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B5E4E]">
                    <BookMarked className="h-3.5 w-3.5" />
                    Nota o idea del día
                  </div>
                  <p className="mt-1 text-sm text-[#2D2A24] line-clamp-2">El personaje recuerda la casa de su abuela al oler el pan.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Right column: projects in progress */}
          <section className="rounded-lg bg-[#F7F5F2] p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#2D2A24]">Proyectos en progreso</h2>
              <TrendingUp className="h-4 w-4 text-[#6B5E4E]" />
            </div>

            <ul className="space-y-3">
              {initialProjects.map((project) => {
                const pct = project.targetWords > 0 ? Math.round((project.currentWords / project.targetWords) * 100) : 0;
                return (
                  <li key={project.id} className="rounded-md border border-[#D4CFC8] bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-['Crimson_Pro'] text-lg font-normal text-[#2D2A24]" title={project.name}>
                          {project.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#6B5E4E]">{project.type}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-[#F7F5F2] px-2 py-0.5 text-xs font-medium text-[#6B5E4E]">
                        {pct}%
                      </span>
                    </div>
                    <div className="mt-3">
                      <ProgressBar current={project.currentWords} target={project.targetWords} />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-[#6B5E4E]">
                      <span>{project.currentWords.toLocaleString('es')} palabras</span>
                      <span>meta: {project.targetWords.toLocaleString('es')}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <SectionDivider />

        {/* Wellbeing */}
        <section className="rounded-lg bg-[#F7F5F2] p-4">
          <h2 className="mb-4 text-base font-semibold text-[#2D2A24]">🌱 Bienestar</h2>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {wellbeingItems.map((item, idx) => {
              const Icon = item.icon;
              const checked = wellbeing[idx];
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => toggleWellbeing(idx)}
                    className="flex w-full items-center gap-3 rounded-md border border-[#D4CFC8] bg-white px-3 py-2.5 text-left transition-colors hover:border-[#6B5E4E]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B5E4E]"
                    aria-pressed={checked}
                  >
                    <span
                      className={clsx(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                        checked ? 'border-[#6B5E4E] bg-[#6B5E4E] text-white' : 'border-[#6B5E4E]/40 bg-white'
                      )}
                    >
                      {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    </span>
                    <Icon className="h-4 w-4 shrink-0 text-[#6B5E4E]" />
                    <span className={clsx('truncate text-sm', checked ? 'text-[#6B5E4E] line-through' : 'text-[#2D2A24]')}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <SectionDivider />

        {/* Day closing */}
        <section className="rounded-lg bg-[#F7F5F2] p-4">
          <h2 className="mb-4 text-base font-semibold text-[#2D2A24]">💭 Cierre del día</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-[#2D2A24]">Lo mejor de hoy:</p>
              <p className="mt-1 text-sm text-[#6B5E4E]">Terminé la escena que me bloqueaba desde el martes.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#2D2A24]">Qué aprendí:</p>
              <p className="mt-1 text-sm text-[#6B5E4E]">Escribir primero el diálogo y luego la narración me ayuda a fluir.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#2D2A24]">Qué quiero preparar para mañana:</p>
              <ul className="mt-1 space-y-1">
                <li className="flex items-start gap-2 text-sm text-[#6B5E4E]">
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>Bosquejo del capítulo 4</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#6B5E4E]">
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>Revisar notas de personajes</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
