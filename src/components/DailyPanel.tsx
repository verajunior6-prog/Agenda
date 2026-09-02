import { useState } from 'react';
import { PenLine, Heart, Moon, Check } from 'lucide-react';
import clsx from 'clsx';

type Mood = '😴' | '🙂' | '😊' | '⚡';

const MOODS: Mood[] = ['😴', '🙂', '😊', '⚡'];

const ENERGY_LEVELS = 5;

const todayLabel = new Intl.DateTimeFormat('es', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date());

export default function DailyPanel() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [energy, setEnergy] = useState(0);
  const [priorities, setPriorities] = useState<string[]>(['', '', '']);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const [writing, setWriting] = useState('');
  const [wellbeing, setWellbeing] = useState('');
  const [closed, setClosed] = useState(false);

  const togglePriority = (index: number) => {
    setChecked((prev) => prev.map((c, i) => (i === index ? !c : c)));
  };

  const updatePriority = (index: number, value: string) => {
    setPriorities((prev) => prev.map((p, i) => (i === index ? value : p)));
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#F7F5F2] text-[#2D2A24] font-['Inter']">
      <div className="bg-[#FFFFFF] rounded-2xl p-4 flex flex-col gap-2">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-[#2D2A24]">🌤️ Hoy</h1>

        {/* Quote */}
        <blockquote className="font-['Crimson_Pro'] italic text-[#6B5E4E] text-base leading-relaxed">
          “La constancia construye lo que la inspiración comienza.”
        </blockquote>

        {/* Date */}
        <p className="text-sm text-[#6B5E4E]">
          <span className="font-medium text-[#2D2A24]">Fecha:</span> {todayLabel}
        </p>

        {/* Mood */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-[#2D2A24]">Estado de ánimo:</p>
          <div className="flex items-center gap-2" role="radiogroup" aria-label="Estado de ánimo">
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mood === m}
                aria-label={`Estado de ánimo ${m}`}
                onClick={() => setMood(m)}
                className={clsx(
                  'flex items-center justify-center w-12 h-12 rounded-full text-2xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-2',
                  mood === m
                    ? 'bg-[#4A7C59]/15 ring-2 ring-[#4A7C59]'
                    : 'bg-[#F7F5F2] hover:bg-[#4A7C59]/10'
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Energy */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-[#2D2A24]">Energía:</p>
          <div
            className="flex items-center gap-1"
            role="slider"
            aria-label="Nivel de energía"
            aria-valuemin={0}
            aria-valuemax={ENERGY_LEVELS}
            aria-valuenow={energy}
          >
            {Array.from({ length: ENERGY_LEVELS }, (_, i) => i + 1).map((level) => (
              <button
                key={level}
                type="button"
                aria-label={`Energía ${level} de ${ENERGY_LEVELS}`}
                onClick={() => setEnergy(level)}
                className={clsx(
                  'text-2xl leading-none transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-2 rounded',
                  level <= energy ? 'scale-110' : 'opacity-40 grayscale'
                )}
              >
                ⭐
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1" aria-hidden="true">
          <div className="flex-1 h-px bg-[#D4CFC8]" />
          <span className="text-[#D4CFC8] text-xs">✦</span>
          <div className="flex-1 h-px bg-[#D4CFC8]" />
        </div>

        {/* Priorities */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-[#2D2A24]">🎯 Mis 3 prioridades</h2>
          {priorities.map((priority, index) => (
            <div key={index} className="flex items-center gap-2">
              <button
                type="button"
                role="checkbox"
                aria-checked={checked[index]}
                aria-label={`Prioridad ${index + 1}`}
                onClick={() => togglePriority(index)}
                className={clsx(
                  'flex items-center justify-center w-6 h-6 rounded-md border-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-2 shrink-0',
                  checked[index]
                    ? 'bg-[#4A7C59] border-[#4A7C59] text-white'
                    : 'border-[#D4CFC8] bg-white hover:border-[#4A7C59]'
                )}
              >
                {checked[index] && <Check className="w-4 h-4" strokeWidth={3} />}
              </button>
              <input
                type="text"
                value={priority}
                onChange={(e) => updatePriority(index, e.target.value)}
                placeholder={`Prioridad ${index + 1}:`}
                aria-label={`Prioridad ${index + 1}`}
                className={clsx(
                  'flex-1 min-w-0 bg-transparent border-b border-[#D4CFC8] py-1.5 text-base focus:outline-none focus:border-[#4A7C59] transition-colors duration-200',
                  checked[index] && 'line-through text-[#6B5E4E]'
                )}
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1" aria-hidden="true">
          <div className="flex-1 h-px bg-[#D4CFC8]" />
          <span className="text-[#D4CFC8] text-xs">✦</span>
          <div className="flex-1 h-px bg-[#D4CFC8]" />
        </div>

        {/* Writing */}
        <div className="flex flex-col gap-2">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#2D2A24]">
            <PenLine className="w-5 h-5 text-[#6B5E4E]" aria-hidden="true" />
            Escritura del día
          </h2>
          <textarea
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder="Escribe unas líneas sobre tu día…"
            rows={4}
            aria-label="Escritura del día"
            className="w-full bg-[#F7F5F2] border border-[#D4CFC8] rounded-lg p-3 text-base leading-relaxed resize-y focus:outline-none focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] transition-colors duration-200"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1" aria-hidden="true">
          <div className="flex-1 h-px bg-[#D4CFC8]" />
          <span className="text-[#D4CFC8] text-xs">✦</span>
          <div className="flex-1 h-px bg-[#D4CFC8]" />
        </div>

        {/* Wellbeing */}
        <div className="flex flex-col gap-2">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#2D2A24]">
            <Heart className="w-5 h-5 text-[#4A7C59]" aria-hidden="true" />
            Bienestar
          </h2>
          <textarea
            value={wellbeing}
            onChange={(e) => setWellbeing(e.target.value)}
            placeholder="¿Cómo te sientes física y emocionalmente?"
            rows={3}
            aria-label="Bienestar"
            className="w-full bg-[#F7F5F2] border border-[#D4CFC8] rounded-lg p-3 text-base leading-relaxed resize-y focus:outline-none focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] transition-colors duration-200"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1" aria-hidden="true">
          <div className="flex-1 h-px bg-[#D4CFC8]" />
          <span className="text-[#D4CFC8] text-xs">✦</span>
          <div className="flex-1 h-px bg-[#D4CFC8]" />
        </div>

        {/* Close day */}
        <div className="flex flex-col gap-2">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#2D2A24]">
            <Moon className="w-5 h-5 text-[#6B5E4E]" aria-hidden="true" />
            Cierre del día
          </h2>
          <button
            type="button"
            onClick={() => setClosed((prev) => !prev)}
            className={clsx(
              'flex items-center justify-center gap-2 w-full min-h-[44px] rounded-lg px-4 py-2.5 text-base font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-2',
              closed
                ? 'bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]'
                : 'bg-[#4A7C59] text-white hover:bg-[#3d6a4b]'
            )}
          >
            {closed ? (
              <>
                <Check className="w-5 h-5" aria-hidden="true" />
                Día cerrado
              </>
            ) : (
              'Cerrar el día'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
