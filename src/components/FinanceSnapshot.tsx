import React from 'react';

// ─── Tipos ───────────────────────────────────────────────────────────────
interface Movimiento {
  id: string;
  tipo: 'ingreso' | 'gasto';
  importe: number;
  categoria: string;
  fecha: string; // ISO string
  descripcion: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────
const formatearMoneda = (valor: number): string =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(valor);

const formatearFecha = (iso: string): string => {
  const d = new Date(iso);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
};

const CATEGORIAS: Record<string, { label: string; bg: string; text: string }> = {
  alimentacion: { label: 'Alimentación', bg: '#FFF0E0', text: '#A66C2E' },
  transporte: { label: 'Transporte', bg: '#E3F0FF', text: '#2C6B9E' },
  ocio: { label: 'Ocio', bg: '#F0E6FF', text: '#7B4EA8' },
  salario: { label: 'Salario', bg: '#E6F7E6', text: '#2E7D32' },
  freelance: { label: 'Freelance', bg: '#E0F7FA', text: '#00838F' },
  vivienda: { label: 'Vivienda', bg: '#FFF3E0', text: '#BF6A1A' },
  salud: { label: 'Salud', bg: '#FCE4EC', text: '#B03A5E' },
  educacion: { label: 'Educación', bg: '#E8EAF6', text: '#3F51B5' },
  otros: { label: 'Otros', bg: '#F5F5F5', text: '#616161' },
};

const obtenerEtiqueta = (cat: string) =>
  CATEGORIAS[cat.toLowerCase()] ?? { label: cat, bg: '#F5F5F5', text: '#616161' };

// ─── Datos de demostración ───────────────────────────────────────────────
const MOVIMIENTOS_DEMO: Movimiento[] = [
  {
    id: '1',
    tipo: 'ingreso',
    importe: 2450.0,
    categoria: 'salario',
    fecha: '2025-03-01',
    descripcion: 'Nómina marzo',
  },
  {
    id: '2',
    tipo: 'ingreso',
    importe: 320.0,
    categoria: 'freelance',
    fecha: '2025-03-05',
    descripcion: 'Proyecto web',
  },
  {
    id: '3',
    tipo: 'gasto',
    importe: 85.5,
    categoria: 'alimentacion',
    fecha: '2025-03-03',
    descripcion: 'Supermercado',
  },
  {
    id: '4',
    tipo: 'gasto',
    importe: 120.0,
    categoria: 'transporte',
    fecha: '2025-03-04',
    descripcion: 'Gasolina',
  },
  {
    id: '5',
    tipo: 'gasto',
    importe: 45.0,
    categoria: 'ocio',
    fecha: '2025-03-06',
    descripcion: 'Cine y cena',
  },
  {
    id: '6',
    tipo: 'gasto',
    importe: 200.0,
    categoria: 'vivienda',
    fecha: '2025-03-02',
    descripcion: 'Recibo luz',
  },
];

// ─── Componente ──────────────────────────────────────────────────────────
const FinanceSnapshot: React.FC = () => {
  const ingresos = MOVIMIENTOS_DEMO.filter((m) => m.tipo === 'ingreso');
  const gastos = MOVIMIENTOS_DEMO.filter((m) => m.tipo === 'gasto');

  const totalIngresos = ingresos.reduce((acc, m) => acc + m.importe, 0);
  const totalGastos = gastos.reduce((acc, m) => acc + m.importe, 0);
  const balance = totalIngresos - totalGastos;

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: '24px',
        fontFamily: "'Inter', sans-serif",
        color: '#2D2A24',
        maxWidth: 720,
        margin: '0 auto',
      }}
    >
      {/* Encabezado con el copy exacto del brief */}
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            margin: 0,
            color: '#2D2A24',
          }}
        >
          💰 Finanzas rápidas
        </h2>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#6B5E4E',
            margin: '4px 0 0 0',
          }}
        >
          [Vista enlazada: Finanzas / filtro Fecha = Este mes]
        </p>
      </div>

      {/* Separador decorativo con ✦ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 20,
        }}
      >
        <div style={{ flex: 1, height: 1, backgroundColor: '#D4CFC8' }} />
        <span style={{ fontSize: '0.75rem', color: '#B8860B' }}>✦</span>
        <div style={{ flex: 1, height: 1, backgroundColor: '#D4CFC8' }} />
      </div>

      {/* Resumen ingresos / gastos */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 140,
            backgroundColor: '#F7F5F2',
            borderRadius: 6,
            padding: '12px 16px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#6B5E4E',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Ingresos
          </p>
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#27AE60',
            }}
          >
            {formatearMoneda(totalIngresos)}
          </p>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 140,
            backgroundColor: '#F7F5F2',
            borderRadius: 6,
            padding: '12px 16px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#6B5E4E',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Gastos
          </p>
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#C0392B',
            }}
          >
            {formatearMoneda(totalGastos)}
          </p>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 140,
            backgroundColor: '#F7F5F2',
            borderRadius: 6,
            padding: '12px 16px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#6B5E4E',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Balance
          </p>
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: balance >= 0 ? '#27AE60' : '#C0392B',
            }}
          >
            {formatearMoneda(balance)}
          </p>
        </div>
      </div>

      {/* Tabla compacta */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid #D4CFC8',
                color: '#6B5E4E',
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>Movimiento</th>
              <th style={{ textAlign: 'right', padding: '8px 12px' }}>Importe</th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>Categoría</th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {MOVIMIENTOS_DEMO.map((mov) => {
              const etiqueta = obtenerEtiqueta(mov.categoria);
              return (
                <tr
                  key={mov.id}
                  style={{
                    borderBottom: '1px solid #E8E5E0',
                    verticalAlign: 'middle',
                  }}
                >
                  <td
                    style={{
                      padding: '12px',
                      color: '#2D2A24',
                      fontWeight: 400,
                    }}
                  >
                    {mov.descripcion}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 500,
                      color: mov.tipo === 'ingreso' ? '#27AE60' : '#C0392B',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {mov.tipo === 'ingreso' ? '+' : '-'}
                    {formatearMoneda(mov.importe)}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        backgroundColor: etiqueta.bg,
                        color: etiqueta.text,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        padding: '2px 8px',
                        borderRadius: 4,
                        lineHeight: '1.4',
                      }}
                    >
                      {etiqueta.label}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: '#6B5E4E',
                      fontSize: '0.8125rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {formatearFecha(mov.fecha)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Fila de total */}
      <div
        style={{
          backgroundColor: '#FFF8E7',
          borderTop: '2px solid #B8860B',
          marginTop: 0,
          padding: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 700,
          fontSize: '0.9375rem',
          color: '#2D2A24',
          borderRadius: '0 0 6px 6px',
        }}
      >
        <span>Total</span>
        <span
          style={{
            color: balance >= 0 ? '#27AE60' : '#C0392B',
          }}
        >
          {formatearMoneda(balance)}
        </span>
      </div>

      {/* Nota de demo */}
      <p
        style={{
          margin: '16px 0 0 0',
          fontSize: '0.75rem',
          color: '#6B5E4E',
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        Datos de demostración. Conecta Supabase desde el panel Backend para
        gestionar tus finanzas reales.
      </p>
    </section>
  );
};

export default FinanceSnapshot;
