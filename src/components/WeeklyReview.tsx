import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ─── Helpers ───────────────────────────────────────────────────────────────

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

// ─── Types ─────────────────────────────────────────────────────────────────

interface WeeklyData {
  logros: string[];
  palabrasEscritas: number | '';
  proyectoAvance: string;
  proximoObjetivo: string;
  gastosRevisar: string;
  ahorroConseguido: number | '';
  pagosProximos: string;
  habitoMantuve: string;
  aspectoMejorar: string;
  plan: boolean[];
}

const PLAN_ITEMS = [
  'Elegir prioridades',
  'Programar bloques de escritura',
  'Revisar fechas límite',
  'Revisar presupuesto',
  'Reservar tiempo personal',
] as const;

const INITIAL_DATA: WeeklyData = {
  logros: ['', '', ''],
  palabrasEscritas: '',
  proyectoAvance: '',
  proximoObjetivo: '',
  gastosRevisar: '',
  ahorroConseguido: '',
  pagosProximos: '',
  habitoMantuve: '',
  aspectoMejorar: '',
  plan: PLAN_ITEMS.map(() => false),
};

// ─── Separador decorativo ──────────────────────────────────────────────────

function Separator() {
  return (
    <div className="flex items-center gap-3 my-6" role="separator" aria-orientation="horizontal">
      <span className="flex-1 h-px bg-[#D4CFC8]" />
      <span className="text-[#D4CFC8] text-xs select-none" aria-hidden="true">
        ✦
      </span>
      <span className="flex-1 h-px bg-[#D4CFC8]" />
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────

const WeeklyReview: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<WeeklyData>(INITIAL_DATA);

  const toggle = () => setOpen((prev) => !prev);

  // ── Helpers de actualización ────────────────────────────────────────────

  const updateLogro = (index: number, value: string) => {
    setData((prev) => {
      const logros = [...prev.logros];
      logros[index] = value;
      return { ...prev, logros };
    });
  };

  const updateField = <K extends keyof WeeklyData>(
    key: K,
    value: WeeklyData[K],
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const togglePlan = (index: number) => {
    setData((prev) => {
      const plan = [...prev.plan];
      plan[index] = !plan[index];
      return { ...prev, plan };
    });
  };

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <section
      className={cn(
        'bg-[#FFFFFF] rounded-lg',
        'border border-[#D4CFC8]/40',
        'overflow-hidden',
        'font-sans',
      )}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Cabecera del acordeón ─────────────────────────────────────── */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="weekly-review-content"
        className={cn(
          'w-full flex items-center gap-3 px-4 py-3',
          'text-left text-[#2D2A24]',
          'transition-colors duration-200',
          'hover:bg-[#F7F5F2]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-2',
        )}
      >
        <span className="text-lg" aria-hidden="true">
          🔄
        </span>
        <span
          className={cn(
            'text-lg font-medium tracking-tight',
            'font-serif',
          )}
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          Revisión semanal
        </span>
        <span
          className={cn(
            'ml-auto text-sm text-[#6B5E4E] transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {/* ── Contenido plegable ────────────────────────────────────────── */}
      <div
        id="weekly-review-content"
        role="region"
        aria-labelledby="weekly-review-header"
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-2 space-y-6">
            {/* ════════════════════════════════════════════════════════════ */}
            {/* Logros de la semana                                        */}
            {/* ════════════════════════════════════════════════════════════ */}
            <section>
              <h3
                className={cn(
                  'text-base font-semibold text-[#6B5E4E] mb-2',
                  'font-sans',
                )}
              >
                Logros de la semana
              </h3>
              <div className="space-y-2">
                {data.logros.map((logro, idx) => (
                  <textarea
                    key={idx}
                    value={logro}
                    onChange={(e) => updateLogro(idx, e.target.value)}
                    placeholder={`- `}
                    rows={1}
                    className={cn(
                      'w-full resize-none overflow-hidden',
                      'bg-[#F7F5F2] text-[#2D2A24]',
                      'border border-[#D4CFC8]/50',
                      'rounded px-3 py-2',
                      'text-sm leading-relaxed',
                      'placeholder:text-[#6B5E4E]/40',
                      'focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent',
                    )}
                    style={{ minHeight: '2.5rem' }}
                    onInput={(e) => {
                      const el = e.currentTarget;
                      el.style.height = 'auto';
                      el.style.height = `${el.scrollHeight}px`;
                    }}
                  />
                ))}
              </div>
            </section>

            <Separator />

            {/* ════════════════════════════════════════════════════════════ */}
            {/* Escritura                                                   */}
            {/* ════════════════════════════════════════════════════════════ */}
            <section>
              <h3
                className={cn(
                  'text-base font-semibold text-[#6B5E4E] mb-3',
                  'font-sans',
                )}
              >
                Escritura
              </h3>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="palabras-escritas"
                    className="block text-sm text-[#2D2A24] mb-1"
                  >
                    Palabras escritas:
                  </label>
                  <input
                    id="palabras-escritas"
                    type="number"
                    min={0}
                    value={data.palabrasEscritas}
                    onChange={(e) =>
                      updateField(
                        'palabrasEscritas',
                        e.target.value === '' ? '' : Number(e.target.value),
                      )
                    }
                    className={cn(
                      'w-full bg-[#F7F5F2] text-[#2D2A24]',
                      'border border-[#D4CFC8]/50',
                      'rounded px-3 py-2',
                      'text-sm',
                      'focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent',
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="proyecto-avance"
                    className="block text-sm text-[#2D2A24] mb-1"
                  >
                    Proyecto que más avancé:
                  </label>
                  <textarea
                    id="proyecto-avance"
                    value={data.proyectoAvance}
                    onChange={(e) => updateField('proyectoAvance', e.target.value)}
                    rows={2}
                    className={cn(
                      'w-full resize-none bg-[#F7F5F2] text-[#2D2A24]',
                      'border border-[#D4CFC8]/50',
                      'rounded px-3 py-2',
                      'text-sm leading-relaxed',
                      'focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent',
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="proximo-objetivo"
                    className="block text-sm text-[#2D2A24] mb-1"
                  >
                    Próximo objetivo:
                  </label>
                  <textarea
                    id="proximo-objetivo"
                    value={data.proximoObjetivo}
                    onChange={(e) => updateField('proximoObjetivo', e.target.value)}
                    rows={2}
                    className={cn(
                      'w-full resize-none bg-[#F7F5F2] text-[#2D2A24]',
                      'border border-[#D4CFC8]/50',
                      'rounded px-3 py-2',
                      'text-sm leading-relaxed',
                      'focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent',
                    )}
                  />
                </div>
              </div>
            </section>

            <Separator />

            {/* ════════════════════════════════════════════════════════════ */}
            {/* Finanzas                                                    */}
            {/* ════════════════════════════════════════════════════════════ */}
            <section>
              <h3
                className={cn(
                  'text-base font-semibold text-[#6B5E4E] mb-3',
                  'font-sans',
                )}
              >
                Finanzas
              </h3>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="gastos-revisar"
                    className="block text-sm text-[#2D2A24] mb-1"
                  >
                    Gastos que debo revisar:
                  </label>
                  <textarea
                    id="gastos-revisar"
                    value={data.gastosRevisar}
                    onChange={(e) => updateField('gastosRevisar', e.target.value)}
                    rows={2}
                    className={cn(
                      'w-full resize-none bg-[#F7F5F2] text-[#2D2A24]',
                      'border border-[#D4CFC8]/50',
                      'rounded px-3 py-2',
                      'text-sm leading-relaxed',
                      'focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent',
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="ahorro-conseguido"
                    className="block text-sm text-[#2D2A24] mb-1"
                  >
                    Ahorro conseguido:
                  </label>
                  <input
                    id="ahorro-conseguido"
                    type="number"
                    min={0}
                    value={data.ahorroConseguido}
                    onChange={(e) =>
                      updateField(
                        'ahorroConseguido',
                        e.target.value === '' ? '' : Number(e.target.value),
                      )
                    }
                    className={cn(
                      'w-full bg-[#F7F5F2] text-[#2D2A24]',
                      'border border-[#D4CFC8]/50',
                      'rounded px-3 py-2',
                      'text-sm',
                      'focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent',
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="pagos-proximos"
                    className="block text-sm text-[#2D2A24] mb-1"
                  >
                    Pagos próximos:
                  </label>
                  <textarea
                    id="pagos-proximos"
                    value={data.pagosProximos}
                    onChange={(e) => updateField('pagosProximos', e.target.value)}
                    rows={2}
                    className={cn(
                      'w-full resize-none bg-[#F7F5F2] text-[#2D2A24]',
                      'border border-[#D4CFC8]/50',
                      'rounded px-3 py-2',
                      'text-sm leading-relaxed',
                      'focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent',
                    )}
                  />
                </div>
              </div>
            </section>

            <Separator />

            {/* ════════════════════════════════════════════════════════════ */}
            {/* Bienestar                                                    */}
            {/* ════════════════════════════════════════════════════════════ */}
            <section>
              <h3
                className={cn(
                  'text-base font-semibold text-[#6B5E4E] mb-3',
                  'font-sans',
                )}
              >
                Bienestar
              </h3>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="habito-mantuve"
                    className="block text-sm text-[#2D2A24] mb-1"
                  >
                    Hábito que mantuve:
                  </label>
                  <textarea
                    id="habito-mantuve"
                    value={data.habitoMantuve}
                    onChange={(e) => updateField('habitoMantuve', e.target.value)}
                    rows={2}
                    className={cn(
                      'w-full resize-none bg-[#F7F5F2] text-[#2D2A24]',
                      'border border-[#D4CFC8]/50',
                      'rounded px-3 py-2',
                      'text-sm leading-relaxed',
                      'focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent',
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="aspecto-mejorar"
                    className="block text-sm text-[#2D2A24] mb-1"
                  >
                    Aspecto que quiero mejorar:
                  </label>
                  <textarea
                    id="aspecto-mejorar"
                    value={data.aspectoMejorar}
                    onChange={(e) => updateField('aspectoMejorar', e.target.value)}
                    rows={2}
                    className={cn(
                      'w-full resize-none bg-[#F7F5F2] text-[#2D2A24]',
                      'border border-[#D4CFC8]/50',
                      'rounded px-3 py-2',
                      'text-sm leading-relaxed',
                      'focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent',
                    )}
                  />
                </div>
              </div>
            </section>

            <Separator />

            {/* ════════════════════════════════════════════════════════════ */}
            {/* Plan para la próxima semana                                  */}
            {/* ════════════════════════════════════════════════════════════ */}
            <section>
              <h3
                className={cn(
                  'text-base font-semibold text-[#6B5E4E] mb-3',
                  'font-sans',
                )}
              >
                Plan para la próxima semana
              </h3>
              <div className="space-y-2">
                {PLAN_ITEMS.map((item, idx) => (
                  <label
                    key={idx}
                    className={cn(
                      'flex items-start gap-3 cursor-pointer',
                      'text-sm text-[#2D2A24]',
                      'group',
                    )}
                  >
                    <span
                      className={cn(
                        'relative mt-0.5 flex-shrink-0',
                        'w-5 h-5 rounded',
                        'border-2 border-[#D4CFC8]',
                        'transition-colors duration-150',
                        data.plan[idx]
                          ? 'bg-[#4A7C59] border-[#4A7C59]'
                          : 'bg-[#FFFFFF]',
                        'group-hover:border-[#4A7C59]',
                      )}
                    >
                      {data.plan[idx] && (
                        <svg
                          className="w-full h-full text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={data.plan[idx]}
                      onChange={() => togglePlan(idx)}
                      className="sr-only"
                      aria-label={item}
                    />
                    <span className="pt-0.5 leading-snug">{item}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyReview;
