'use client';

import { useState } from 'react';

interface ParamConfig {
  name: string;
  unit: string;
  labels: [string, string];
  values: [number, number];
  description: string;
  /** If true, lower sesudah = better (e.g. emisi, CFPP, viscosity, HFRR, fuel consumption) */
  lowerIsBetter?: boolean;
  /**
   * Force Y-axis to start from 0.
   * Use when ratio between values is already very dramatic (e.g. HC: 13.7 → 0, NOx: 91 → 41).
   */
  forceZeroBase?: boolean;
}

interface TabConfig {
  id: string;
  label: string;
  params: ParamConfig[];
}

const tabs: TabConfig[] = [
  {
    id: 'fisika-kimia',
    label: 'Fisika-Kimia BBM',
    params: [
      {
        name: 'Angka Setana',
        unit: '-',
        labels: ['61,0', '61,8'],
        values: [61.0, 61.8],
        description: 'Angka setana yang lebih tinggi = pembakaran lebih sempurna & tenaga lebih responsif.',
        lowerIsBetter: false,
      },
      {
        name: 'Stabilitas Oksidasi',
        unit: 'menit',
        labels: ['227 mnt', '295 mnt'],
        values: [227, 295],
        description: 'Biodiesel lebih tahan oksidasi — tidak mudah rusak & lebih aman disimpan.',
        lowerIsBetter: false,
      },
      {
        name: 'Acid Value',
        unit: 'mg KOH/g',
        labels: ['0,18', '0,19'],
        values: [0.18, 0.19],
        description: 'Perubahan minor — tetap dalam batas aman standar SNI.',
        lowerIsBetter: true,
      },
      {
        name: 'Cold Filter Plugging Point',
        unit: '°C',
        labels: ['10 °C', '9 °C'],
        values: [10, 9],
        description: 'CFPP lebih rendah = biodiesel lebih lancar di suhu dingin, filter tidak mudah tersumbat.',
        lowerIsBetter: true,
      },
      {
        name: 'Viskositas Kinematik',
        unit: 'mm²/s',
        labels: ['4,537', '4,505'],
        values: [4.537, 4.505],
        description: 'Viskositas lebih rendah = atomisasi sempurna di injektor, pompa bekerja lebih ringan.',
        lowerIsBetter: true,
      },
      {
        name: 'Lubrisitas (HFRR)',
        unit: 'micron',
        labels: ['280,5 µm', '249,0 µm'],
        values: [280.5, 249.0],
        description: 'Gesekan lebih rendah = injektor & ruang bakar terlindungi lebih baik dari aus.',
        lowerIsBetter: true,
      },
    ],
  },
  {
    id: 'emisi',
    label: 'Emisi',
    params: [
      {
        name: 'CO',
        unit: 'ppm',
        labels: ['161 ppm', '142 ppm'],
        values: [161, 142],
        description: 'Emisi karbon monoksida turun — pembakaran lebih tuntas.',
        lowerIsBetter: true,
      },
      {
        name: 'CO₂',
        unit: '%',
        labels: ['2,3%', '2,8%'],
        values: [2.3, 2.8],
        description: 'CO₂ lebih tinggi justru menunjukkan pembakaran yang lebih sempurna.',
        lowerIsBetter: false,
      },
      {
        name: 'NOx',
        unit: 'ppm',
        labels: ['91 ppm', '41 ppm'],
        values: [91, 41],
        description: 'NOx turun drastis 55% — mesin lebih ramah lingkungan & lulus uji emisi.',
        lowerIsBetter: true,
        forceZeroBase: true,
      },
      {
        name: 'Hidrokarbon (HC)',
        unit: 'ppm',
        labels: ['13,7 ppm', '<0,10 ppm'],
        values: [13.7, 0.1],
        description: 'HC turun hingga mendekati nol — hampir tidak ada bahan bakar yang terbuang sia-sia.',
        lowerIsBetter: true,
        forceZeroBase: true,
      },
      {
        name: 'Opasitas (Asap)',
        unit: '%',
        labels: ['10,8%', '7,8%'],
        values: [10.8, 7.8],
        description: 'Asap hitam berkurang signifikan — knalpot lebih bersih & lulus uji KIR.',
        lowerIsBetter: true,
      },
    ],
  },
  {
    id: 'performa-1',
    label: 'Performa 1 (B100)',
    params: [
      {
        name: 'Torsi Maksimum',
        unit: 'Nm',
        labels: ['284,8 Nm', '294,2 Nm'],
        values: [284.8, 294.2],
        description: 'Torsi meningkat — akselerasi lebih kuat terutama saat bermuatan penuh.',
        lowerIsBetter: false,
      },
      {
        name: 'Daya Maksimum',
        unit: 'HP',
        labels: ['117,2 HP', '121,1 HP'],
        values: [117.2, 121.1],
        description: 'Tenaga mesin naik signifikan — performa di tanjakan & jalan berat meningkat nyata.',
        lowerIsBetter: false,
      },
      {
        name: 'Konsumsi BBM',
        unit: 'L/100km',
        labels: ['5,61 L', '5,33 L'],
        values: [5.61, 5.33],
        description: 'Konsumsi bahan bakar turun — lebih irit BBM per kilometer perjalanan.',
        lowerIsBetter: true,
      },
    ],
  },
  {
    id: 'performa-2',
    label: 'Performa 2 (Pertamina Dex)',
    params: [
      {
        name: 'Torsi Maksimum',
        unit: 'Nm',
        labels: ['620,8 Nm', '713,4 Nm'],
        values: [620.8, 713.4],
        description: 'Torsi meningkat drastis — tarikan mesin jauh lebih bertenaga di semua putaran.',
        lowerIsBetter: false,
      },
      {
        name: 'Daya Maksimum',
        unit: 'HP',
        labels: ['232,9 HP', '254,1 HP'],
        values: [232.9, 254.1],
        description: 'Daya meningkat signifikan — kinerja mesin optimal bahkan di kondisi beban berat.',
        lowerIsBetter: false,
      },
    ],
  },
];

// ─── Color tokens ─────────────────────────────────────────────────────────────
const COLOR_BEFORE = '#8fad89';
const COLOR_AFTER_GOOD = '#1d7a0e';
const COLOR_AFTER_NEUTRAL = '#528247';
const GRID_COLOR = '#eef0ea';
const TEXT_COLOR = '#6e8763';
const AXIS_COLOR = '#dde1d5';

const SVG_W = 500;
const SVG_H = 220;
const PAD = { top: 20, right: 16, bottom: 44, left: 52 };

function fmt(v: number): string {
  if (v < 0.1) return v.toFixed(2);
  if (v % 1 === 0) return v.toString();
  return v.toFixed(v < 10 ? 2 : v < 100 ? 1 : 0);
}

function getPctChange(v1: number, v2: number, lowerIsBetter: boolean): number {
  if (v1 === 0) return 0;
  const raw = ((v2 - v1) / v1) * 100;
  return lowerIsBetter ? -raw : raw;
}

function BarSvgChart({
  labels,
  values,
  lowerIsBetter = false,
  forceZeroBase = false,
}: {
  labels: [string, string];
  values: [number, number];
  lowerIsBetter?: boolean;
  forceZeroBase?: boolean;
}) {
  const [v1, v2] = values;

  const minVal = Math.min(v1, v2);
  const maxVal = Math.max(v1, v2);
  const spread = maxVal - minVal;

  let yMin: number;
  let yMax: number;

  if (forceZeroBase || spread === 0) {
    yMin = 0;
    yMax = maxVal * 1.25 || 1;
  } else {
    // Target fill ratio: the spread between bars occupies ~62% of chart height.
    // This keeps every comparison visually dramatic regardless of absolute value scale.
    const TARGET_FILL = 0.62;
    const chartRange = spread / TARGET_FILL;
    const padBelow = chartRange * 0.27; // 27% whitespace below shorter bar
    const padAbove = chartRange * 0.11; // 11% whitespace above taller bar
    yMin = Math.max(0, minVal - padBelow);
    yMax = maxVal + padAbove;
  }

  const plotW = SVG_W - PAD.left - PAD.right;
  const plotH = SVG_H - PAD.top - PAD.bottom;
  const barWidth = plotW * 0.28;
  const gap = (plotW - 2 * barWidth) / 3;
  const xA = PAD.left + gap;
  const xB = PAD.left + 2 * gap + barWidth;

  const toY = (v: number) =>
    PAD.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  const barATop = toY(v1);
  const barBTop = toY(v2);
  const baseY = PAD.top + plotH;

  const barAH = baseY - barATop;
  const barBH = baseY - barBTop;

  const yTicks = 4;
  const tickValues: number[] = [];
  for (let i = 0; i <= yTicks; i++) {
    tickValues.push(yMin + ((yMax - yMin) / yTicks) * i);
  }

  const isImproved = lowerIsBetter ? v2 < v1 : v2 > v1;
  const afterColor = isImproved ? COLOR_AFTER_GOOD : COLOR_AFTER_NEUTRAL;

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {tickValues.map((v, i) => {
        const y = toY(v);
        return (
          <g key={i}>
            <line x1={PAD.left} y1={y} x2={PAD.left + plotW} y2={y} stroke={GRID_COLOR} strokeDasharray="3 3" />
            <text x={PAD.left - 7} y={y + 4} textAnchor="end" fill={TEXT_COLOR} fontSize={9} fontFamily="inherit">
              {fmt(v)}
            </text>
          </g>
        );
      })}

      <line x1={PAD.left} y1={baseY} x2={PAD.left + plotW} y2={baseY} stroke={AXIS_COLOR} />

      {/* Bar Sebelum */}
      <rect x={xA} y={barATop} width={barWidth} height={Math.max(barAH, 2)} rx={5} fill={COLOR_BEFORE} />
      <text x={xA + barWidth / 2} y={barATop - 6} textAnchor="middle" fill={COLOR_BEFORE} fontSize={10} fontWeight={700} fontFamily="inherit">
        {labels[0]}
      </text>

      {/* Bar Sesudah */}
      <rect x={xB} y={barBTop} width={barWidth} height={Math.max(barBH, 2)} rx={5} fill={afterColor} />
      <text x={xB + barWidth / 2} y={barBTop - 6} textAnchor="middle" fill={afterColor} fontSize={10} fontWeight={700} fontFamily="inherit">
        {labels[1]}
      </text>

      {/* X-axis labels */}
      <text x={xA + barWidth / 2} y={SVG_H - 6} textAnchor="middle" fill={TEXT_COLOR} fontSize={11} fontWeight={600} fontFamily="inherit">
        Sebelum
      </text>
      <text x={xB + barWidth / 2} y={SVG_H - 6} textAnchor="middle" fill={afterColor} fontSize={11} fontWeight={700} fontFamily="inherit">
        Sesudah
      </text>

      {/* Truncated-axis zigzag indicator */}
      {!forceZeroBase && yMin > 0 && (
        <polyline
          points={`${PAD.left - 4},${baseY + 3} ${PAD.left},${baseY + 7} ${PAD.left - 4},${baseY + 11} ${PAD.left},${baseY + 15}`}
          fill="none"
          stroke={AXIS_COLOR}
          strokeWidth={1.5}
        />
      )}
    </svg>
  );
}

function ImprovementBadge({ v1, v2, lowerIsBetter }: { v1: number; v2: number; lowerIsBetter: boolean }) {
  const pct = getPctChange(v1, v2, lowerIsBetter);
  const isPositive = pct > 0;
  const isNeutral = Math.abs(pct) < 0.5;

  if (isNeutral) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
        isPositive
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-red-50 text-red-500'
      }`}
    >
      {isPositive ? '▲' : '▼'} {Math.abs(pct).toFixed(1)}%
      <span className="font-normal opacity-70">{isPositive ? 'lebih baik' : 'berubah'}</span>
    </span>
  );
}

function ParamChart({ param }: { param: ParamConfig }) {
  const [v1, v2] = param.values;
  return (
    <div className="rounded-2xl border border-olive-100 bg-white p-5 md:p-6 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3 mb-1">
        <h4 className="text-sm font-bold text-brand-dark leading-tight">{param.name}</h4>
        <span className="text-[11px] font-semibold text-olive-400 bg-olive-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
          {param.unit}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <ImprovementBadge v1={v1} v2={v2} lowerIsBetter={param.lowerIsBetter ?? false} />
        {param.lowerIsBetter !== undefined && (
          <span className="text-[10px] text-olive-400 font-medium">
            {param.lowerIsBetter ? '↓ semakin rendah semakin baik' : '↑ semakin tinggi semakin baik'}
          </span>
        )}
      </div>

      {param.description && (
        <p className="text-[12px] text-olive-500 leading-relaxed">{param.description}</p>
      )}

      <BarSvgChart
        labels={param.labels}
        values={param.values}
        lowerIsBetter={param.lowerIsBetter}
        forceZeroBase={param.forceZeroBase}
      />
    </div>
  );
}

export default function TestResultsChart() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-brand-dark text-white'
                : 'bg-olive-100 text-brand-copy hover:bg-olive-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        {currentTab.params.map((param) => (
          <ParamChart key={param.name} param={param} />
        ))}
      </div>
    </div>
  );
}

