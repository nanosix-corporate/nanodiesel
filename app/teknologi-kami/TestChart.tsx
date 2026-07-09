'use client';

import { useState } from 'react';

type ChartData = {
  params: string[];
  without: number[];
  withN6: number[];
  unit: string;
  higherBetter: boolean[];
};

const categories: Record<string, { label: string; data: ChartData }> = {
  fisikaKimia: {
    label: 'Hasil Uji Fisika-Kimia BBM',
    data: {
      params: ['CFPP', 'Lubrisitas (HFRR)'],
      without: [10, 280.5],
      withN6: [9, 249.0],
      unit: '-',
      higherBetter: [false, false]
    }
  },
  emisi: {
    label: 'Hasil Uji Emisi',
    data: {
      params: ['CO', 'CO₂', 'NOx', 'HC', 'Opasitas'],
      without: [161, 2.3, 91, 13.7, 10.8],
      withN6: [142, 2.8, 41, 0.1, 7.8],
      unit: 'ppm / %',
      higherBetter: [false, false, false, false, false]
    }
  },
  performa1: {
    label: 'Hasil Uji Performa (B100)',
    data: {
      params: ['Torsi Maks.', 'Daya Maks.', 'Konsumsi BBM'],
      without: [284.8, 117.2, 5.61],
      withN6: [294.2, 121.1, 5.33],
      unit: 'Nm / HP / L/100km',
      higherBetter: [true, true, false]
    }
  },
  performa2: {
    label: 'Hasil Uji Performa (Pertamina Dex)',
    data: {
      params: ['Torsi Maks.', 'Daya Maks.'],
      without: [620.8, 232.9],
      withN6: [713.4, 254.1],
      unit: 'Nm / HP',
      higherBetter: [true, true]
    }
  }
};

const tabGroups = [
  { key: 'fisikaKimia', label: 'Fisika-Kimia BBM' },
  { key: 'emisi', label: 'Emisi' },
  { key: 'performa1', label: 'Performa (B100)' },
  { key: 'performa2', label: 'Performa (Dex)' },
];

const W = 640;
const H = 360;
const PAD = { top: 30, right: 30, bottom: 60, left: 55 };
const chartW = W - PAD.left - PAD.right;
const chartH = H - PAD.top - PAD.bottom;

function formatVal(v: number) {
  if (v < 1) return v.toFixed(1);
  if (v < 10) return v.toFixed(1);
  return v % 1 === 0 ? v.toFixed(0) : v.toFixed(1);
}

function Chart({ data, unit }: { data: ChartData; unit: string }) {
  const allVals = [...data.without, ...data.withN6];
  const yMin = 0;
  const yMax = Math.max(...allVals) * 1.15;
  const yRange = yMax - yMin;

  const xPoints = data.params.map((_, i) => PAD.left + (i / Math.max(data.params.length - 1, 1)) * chartW);

  function yPos(v: number) {
    return PAD.top + chartH - ((v - yMin) / yRange) * chartH;
  }

  const linePath = (vals: number[]) =>
    vals
      .map((v, i) => `${i === 0 ? 'M' : 'L'}${xPoints[i].toFixed(1)},${yPos(v).toFixed(1)}`)
      .join(' ');

  const gridlines = [];
  const steps = 5;
  for (let i = 0; i <= steps; i++) {
    const y = PAD.top + (i / steps) * chartH;
    const v = yMax - (i / steps) * yRange;
    gridlines.push(
      <g key={i}>
        <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#eef0ea" strokeWidth={1} />
              <text x={PAD.left - 8} y={y + 4} textAnchor="end" className="text-xs" fill="#6e8763">
          {v >= 1000 ? (v / 1000).toFixed(1) + 'k' : formatVal(v)}
        </text>
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-w-[700px] mx-auto">
      {gridlines}

      <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + chartH} stroke="#dde1d5" strokeWidth={1} />
      <line x1={PAD.left} y1={PAD.top + chartH} x2={W - PAD.right} y2={PAD.top + chartH} stroke="#dde1d5" strokeWidth={1} />

      <path d={linePath(data.without)} fill="none" stroke="#1a2b17" strokeWidth={2.5} strokeLinejoin="round" />
      {data.without.map((v, i) => (
        <circle key={i} cx={xPoints[i]} cy={yPos(v)} r={4} fill="#1a2b17" />
      ))}

      <path d={linePath(data.withN6)} fill="none" stroke="#528247" strokeWidth={2.5} strokeLinejoin="round" strokeDasharray="6 3" />
      {data.withN6.map((v, i) => (
        <circle key={i} cx={xPoints[i]} cy={yPos(v)} r={4} fill="#528247" />
      ))}

      {data.params.map((p, i) => (
        <text
          key={i}
          x={xPoints[i]}
          y={PAD.top + chartH + 18}
          textAnchor="end"
          transform={`rotate(-30 ${xPoints[i]} ${PAD.top + chartH + 18})`}
          className="text-xs md:text-xs"
          fill="#121212"
        >
          {p}
        </text>
      ))}

      <g transform={`translate(${PAD.left + 10}, ${PAD.top + 8})`}>
        <rect x={0} y={0} width={14} height={14} rx={3} fill="#1a2b17" />
        <text x={20} y={11} className="text-xs" fill="#121212">Tanpa N6 / B100</text>
        <rect x={160} y={0} width={14} height={14} rx={3} fill="#528247" />
        <text x={180} y={11} className="text-xs" fill="#121212">Dengan N6</text>
      </g>
    </svg>
  );
}

export default function TestChart() {
  const [active, setActive] = useState('fisikaKimia');
  const cat = categories[active];
  if (!cat) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {tabGroups.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              active === tab.key
                ? 'bg-brand-dark text-white'
                : 'bg-olive-100 text-brand-copy hover:bg-olive-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Chart data={cat.data} unit={cat.data.unit} />
    </div>
  );
}
