import { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, List, CheckCircle2, Clock, Bell } from 'lucide-react';
import clsx from 'clsx';
import { format, addDays, startOfWeek, endOfWeek, isSameDay, isSameMonth, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';

type Task = {
  id: string;
  title: string;
  area: 'laboral' | 'personal' | 'financiera';
  date: Date;
  time?: string;
  reminder?: string;
  done: boolean;
};

type Habit = {
  id: string;
  name: string;
  area: 'laboral' | 'personal' | 'financiera';
  done: boolean;
};

const AREA_COLORS: Record<Task['area'], string> = {
  laboral: '#3B6B8A',
  personal: '#4A7C59',
  financiera: '#B8860B',
};

const AREA_LABELS: Record<Task['area'], string> = {
  laboral: 'Laboral',
  personal: 'Personal',
  financiera: 'Financiera',
};

const REMINDER_SUGGESTIONS: { type: string; reminder: string }[] = [
  { type: 'Reunión o cita', reminder: '30 minutos antes' },
  { type: 'Bloque de escritura', reminder: '10 minutos antes' },
  { type: 'Fecha límite laboral', reminder: '1 día antes y 1 hora antes' },
  { type: 'Pago o factura', reminder: '3 días antes' },
  { type: 'Rutina personal', reminder: 'A la hora exacta' },
];

const DEMO_TASKS: Task[] = [
  { id: 't1', title: 'Reunión de equipo', area: 'laboral', date: new Date(), time: '09:30', reminder: '30 minutos antes', done: false },
  { id: 't2', title: 'Bloque de escritura', area: 'escritura', date: new Date(), time: '11:00', reminder: '10 minutos antes', done: false },
  { id: 't3', title: 'Pagar factura de luz', area: 'financiera', date: addDays(new Date(), 1), reminder: '3 días antes', done: false },
  { id: 't4', title: 'Rutina de ejercicio', area: 'personal', date: new Date(), time: '18:00', reminder: 'A la hora exacta', done: true },
  { id: 't5', title: 'Entrega de informe', area: 'laboral', date: addDays(new Date(), 3), reminder: '1 día antes y 1 hora antes', done: false },
];

const DEMO_HABITS: Habit[] = [
  { id: 'h1', name: 'Meditar 10 min', area: 'personal', done: true },
  { id: 'h2', name: 'Leer 20 páginas', area: 'personal', done: false },
  { id: 'h3', name: 'Revisar finanzas', area: 'financiera', done: false },
  { id: 'h4', name: 'Planificar el día', area: 'laboral', done: true },
];

const WeeklyPlanning = () => {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [habits, setHabits] = useState<Habit[]>(DEMO_HABITS);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const todayTasks = tasks.filter((t) => isSameDay(t.date, new Date()));
  const weekTasks = tasks.filter((t) => t.date >= weekStart && t.date <= weekEnd);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));
  };

  const navigateWeek = (dir: 1 | -1) => {
    setSelectedDate((prev) => addDays(prev, dir * 7));
  };

  const navigateMonth = (dir: 1 | -1) => {
    setCurrentMonth((prev) => (dir === 1 ? addMonths(prev, 1) : subMonths(prev, 1)));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
    setCurrentMonth(new Date());
  };

  const tasksForDay = (day: Date) => tasks.filter((t) => isSameDay(t.date, day));

  return (
    <div className="w-full max-w-5xl mx-auto" style={{ backgroundColor: '#FFFFFF', color: '#2D2A24', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 py-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: '#2D2A24' }}>
            📅 Planificación semanal
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B5E4E' }}>
            Vista enlazada: Tareas y Agenda / vista “Esta semana”
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-2 text-sm font-medium rounded-md border transition-colors"
            style={{ borderColor: '#D4CFC8', color: '#2D2A24', backgroundColor: '#F7F5F2', minHeight: 44 }}
          >
            Hoy
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateWeek(-1)}
              aria-label="Semana anterior"
              className="p-2 rounded-md border transition-colors hover:bg-[#F7F5F2]"
              style={{ borderColor: '#D4CFC8', minHeight: 44, minWidth: 44 }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => navigateWeek(1)}
              aria-label="Semana siguiente"
              className="p-2 rounded-md border transition-colors hover:bg-[#F7F5F2]"
              style={{ borderColor: '#D4CFC8', minHeight: 44, minWidth: 44 }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="flex rounded-md border overflow-hidden" style={{ borderColor: '#D4CFC8' }}>
            <button
              onClick={() => setView('calendar')}
              className={clsx('px-3 py-2 text-sm flex items-center gap-1 transition-colors', view === 'calendar' && 'font-medium')}
              style={{
                minHeight: 44,
                backgroundColor: view === 'calendar' ? '#E8F0F5' : '#FFFFFF',
                color: view === 'calendar' ? '#3B6B8A' : '#2D2A24',
              }}
            >
              <CalendarDays size={16} /> Calendario
            </button>
            <button
              onClick={() => setView('list')}
              className={clsx('px-3 py-2 text-sm flex items-center gap-1 transition-colors', view === 'list' && 'font-medium')}
              style={{
                minHeight: 44,
                backgroundColor: view === 'list' ? '#E8F0F5' : '#FFFFFF',
                color: view === 'list' ? '#3B6B8A' : '#2D2A24',
              }}
            >
              <List size={16} /> Lista
            </button>
          </div>
        </div>
      </div>

      {/* Divider with ✦ */}
      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px" style={{ backgroundColor: '#D4CFC8' }} />
        <span className="text-sm" style={{ color: '#D4CFC8' }}>✦</span>
        <div className="flex-1 h-px" style={{ backgroundColor: '#D4CFC8' }} />
      </div>

      {/* Week label */}
      <div className="py-2">
        <p className="text-sm font-medium" style={{ color: '#3B6B8A' }}>
          {format(weekStart, "d 'de' MMMM", { locale: es })} — {format(weekEnd, "d 'de' MMMM", { locale: es })}
        </p>
      </div>

      {/* Two columns: Tareas de hoy + Hábitos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        {/* Tareas de hoy */}
        <section className="rounded-lg p-4" style={{ backgroundColor: '#F7F5F2' }}>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 size={18} style={{ color: '#3B6B8A' }} />
            Tareas de hoy
          </h2>
          <ul className="space-y-2">
            {todayTasks.length === 0 && (
              <li className="text-sm" style={{ color: '#6B5E4E' }}>
                No hay tareas para hoy. Añade una tarea con fecha para verla aquí.
              </li>
            )}
            {todayTasks.map((task) => (
              <li key={task.id} className="flex items-start gap-2 p-2 rounded-md" style={{ backgroundColor: '#FFFFFF' }}>
                <button
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.done ? `Marcar ${task.title} como pendiente` : `Marcar ${task.title} como completada`}
                  className="mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0"
                  style={{
                    borderColor: AREA_COLORS[task.area] || '#6B5E4E',
                    backgroundColor: task.done ? (AREA_COLORS[task.area] || '#6B5E4E') : 'transparent',
                    minWidth: 24,
                    minHeight: 24,
                  }}
                >
                  {task.done && <span className="text-white text-xs">✓</span>}
                </button>
                <div className="min-w-0 flex-1">
                  <p className={clsx('text-sm font-medium truncate', task.done && 'line-through')} style={{ color: task.done ? '#6B5E4E' : '#2D2A24' }} title={task.title}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${AREA_COLORS[task.area] || '#6B5E4E'}1A`, color: AREA_COLORS[task.area] || '#6B5E4E' }}>
                      {AREA_LABELS[task.area] || 'Escritura'}
                    </span>
                    {task.time && (
                      <span className="text-xs flex items-center gap-1" style={{ color: '#6B5E4E' }}>
                        <Clock size={12} /> {task.time}
                      </span>
                    )}
                    {task.reminder && (
                      <span className="text-xs flex items-center gap-1" style={{ color: '#6B5E4E' }}>
                        <Bell size={12} /> {task.reminder}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Hábitos */}
        <section className="rounded-lg p-4" style={{ backgroundColor: '#F7F5F2' }}>
          <h2 className="text-lg font-semibold mb-3">Hábitos</h2>
          <ul className="space-y-2">
            {habits.map((habit) => (
              <li key={habit.id} className="flex items-center gap-2 p-2 rounded-md" style={{ backgroundColor: '#FFFFFF' }}>
                <button
                  onClick={() => toggleHabit(habit.id)}
                  aria-label={habit.done ? `Marcar ${habit.name} como pendiente` : `Marcar ${habit.name} como completado`}
                  className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0"
                  style={{
                    borderColor: AREA_COLORS[habit.area],
                    backgroundColor: habit.done ? AREA_COLORS[habit.area] : 'transparent',
                    minWidth: 24,
                    minHeight: 24,
                  }}
                >
                  {habit.done && <span className="text-white text-xs">✓</span>}
                </button>
                <span className={clsx('text-sm truncate flex-1', habit.done && 'line-through')} style={{ color: habit.done ? '#6B5E4E' : '#2D2A24' }} title={habit.name}>
                  {habit.name}
                </span>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: AREA_COLORS[habit.area] }} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Vista calendario / lista */}
      <div className="rounded-lg border" style={{ borderColor: '#D4CFC8' }}>
        <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: '#D4CFC8' }}>
          <h2 className="font-semibold text-base">Esta semana</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateMonth(-1)}
              aria-label="Mes anterior"
              className="p-2 rounded-md hover:bg-[#F7F5F2]"
              style={{ minHeight: 44, minWidth: 44 }}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-medium px-2" style={{ color: '#3B6B8A' }}>
              {format(currentMonth, 'MMMM yyyy', { locale: es })}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              aria-label="Mes siguiente"
              className="p-2 rounded-md hover:bg-[#F7F5F2]"
              style={{ minHeight: 44, minWidth: 44 }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {view === 'calendar' ? (
          <div className="hidden md:block overflow-y-auto" style={{ maxHeight: 400 }}>
            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-b" style={{ borderColor: '#D4CFC8' }}>
              {weekDays.map((day) => (
                <div key={day.toISOString()} className="p-2 text-center text-xs font-medium uppercase" style={{ color: '#6B5E4E' }}>
                  {format(day, 'EEE', { locale: es })}
                </div>
              ))}
            </div>
            {/* Week days */}
            <div className="grid grid-cols-7">
              {weekDays.map((day) => {
                const dayTasks = tasksForDay(day);
                const isToday = isSameDay(day, new Date());
                return (
                  <div
                    key={day.toISOString()}
                    className="min-h-[80px] p-1 border-b border-r last:border-r-0"
                    style={{
                      borderColor: '#D4CFC8',
                      backgroundColor: isToday ? '#E8F0F5' : '#FFFFFF',
                    }}
                  >
                    <div className="flex items-center justify-between px-1">
                      <span
                        className={clsx('text-xs font-medium', isToday && 'font-semibold')}
                        style={{ color: isToday ? '#3B6B8A' : '#2D2A24' }}
                      >
                        {format(day, 'd')}
                      </span>
                      {isToday && <span className="text-[10px] font-medium" style={{ color: '#3B6B8A' }}>Hoy</span>}
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayTasks.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-1 px-1 py-0.5 rounded text-[11px] truncate"
                          style={{ backgroundColor: `${AREA_COLORS[task.area] || '#6B5E4E'}1A`, color: AREA_COLORS[task.area] || '#6B5E4E' }}
                          title={task.title}
                        >
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: AREA_COLORS[task.area] || '#6B5E4E' }} />
                          <span className="truncate">{task.title}</span>
                        </div>
                      ))}
                      {dayTasks.length > 3 && (
                        <p className="text-[11px] px-1" style={{ color: '#6B5E4E' }}>
                          +{dayTasks.length - 3} más
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="md:hidden overflow-y-auto" style={{ maxHeight: 400 }}>
            <ul className="divide-y" style={{ borderColor: '#D4CFC8' }}>
              {weekDays.map((day) => {
                const dayTasks = tasksForDay(day);
                const isToday = isSameDay(day, new Date());
                return (
                  <li key={day.toISOString()} className="p-3" style={{ backgroundColor: isToday ? '#E8F0F5' : '#FFFFFF' }}>
                    <p className="text-sm font-medium mb-2" style={{ color: isToday ? '#3B6B8A' : '#2D2A24' }}>
                      {format(day, "EEEE d 'de' MMMM", { locale: es })}
                      {isToday && <span className="ml-2 text-xs font-semibold">Hoy</span>}
                    </p>
                    {dayTasks.length === 0 ? (
                      <p className="text-sm" style={{ color: '#6B5E4E' }}>Sin tareas</p>
                    ) : (
                      <ul className="space-y-1">
                        {dayTasks.map((task) => (
                          <li key={task.id} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: AREA_COLORS[task.area] || '#6B5E4E' }} />
                            <span className="truncate" title={task.title}>{task.title}</span>
                            {task.time && <span className="text-xs shrink-0" style={{ color: '#6B5E4E' }}>{task.time}</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Recordatorios */}
      <section className="mt-6 rounded-lg p-4" style={{ backgroundColor: '#F7F5F2' }}>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Bell size={18} style={{ color: '#3B6B8A' }} />
          Recordatorios y notificaciones
        </h2>
        <p className="text-sm mb-3" style={{ color: '#6B5E4E' }}>
          Notion puede enviarte recordatorios si configuras una fecha con hora.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: '#D4CFC8' }}>
                <th className="text-left py-2 pr-4 font-medium" style={{ color: '#2D2A24' }}>Tipo de actividad</th>
                <th className="text-left py-2 font-medium" style={{ color: '#2D2A24' }}>Recordatorio sugerido</th>
              </tr>
            </thead>
            <tbody>
              {REMINDER_SUGGESTIONS.map((row) => (
                <tr key={row.type} className="border-b last:border-b-0" style={{ borderColor: '#D4CFC8' }}>
                  <td className="py-2 pr-4" style={{ color: '#2D2A24' }}>{row.type}</td>
                  <td className="py-2" style={{ color: '#6B5E4E' }}>{row.reminder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm mt-3" style={{ color: '#6B5E4E' }}>
          Para recibir alertas, revisa que las notificaciones de Notion estén activadas tanto en la app como en tu móvil u ordenador.
        </p>
      </section>

      {/* Revisión semanal */}
      <section className="mt-6 rounded-lg p-4 border" style={{ borderColor: '#D4CFC8', backgroundColor: '#FFFFFF' }}>
        <h2 className="text-lg font-semibold mb-2">7. Revisión semanal</h2>
        <p className="text-sm" style={{ color: '#6B5E4E' }}>
          Crea una página o bloque plegable llamado:
        </p>
        <p className="mt-2 text-base italic font-medium" style={{ color: '#3B6B8A' }}>
          “Revisión semanal”
        </p>
      </section>
    </div>
  );
};

export default WeeklyPlanning;
