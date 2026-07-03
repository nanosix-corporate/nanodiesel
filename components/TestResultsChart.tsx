'use client';

import { useState } from 'react';

interface ParamConfig {
  name: string;
  unit: string;
  labels: [string, string];
  values: [number, number];
  description: string;
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
      { name: 'Angka Setana', unit: '-', labels: ['61,0', '61,8'], values: [61.0, 61.8], description: 'Nano Diesel membuat efisiensi termal yang lebih baik.' },
      { name: 'Stabilitas Oksidasi', unit: 'menit', labels: ['227 menit', '295 menit'], values: [227, 295], description: 'Nano Diesel membuat kestabilan Biodiesel lebih baik.' },
      { name: 'Acid Value', unit: 'mg KOH/g', labels: ['0.18 mg KOH/g', '0.19 mg KOH/g'], values: [0.18, 0.19], description: 'Nano Diesel membuat kestabilan Biodiesel lebih baik.' },
      { name: 'Cold Filter Plugging Point', unit: '°C', labels: ['10 °C', '9 °C'], values: [10, 9], description: 'Nano Diesel membuat Biodiesel dapat melewati filter dengan lebih baik.' },
      { name: 'Viskositas Kinematik', unit: 'mm²/s', labels: ['4,537 mm²/s', '4,505 mm²/s'], values: [4.537, 4.505], description: 'Nano Diesel membuat kerja pompa dan injektor tidak terlalu berat dan pembakaran lebih sempurna.' },
      { name: 'Lubrisitas (HFRR)', unit: 'micron', labels: ['280,5 micron', '249,0 micron'], values: [280.5, 249.0], description: 'Nano Diesel membuat pelumasan sangat baik, pada injektor maupun ruang bakar.' },
    ],
  },
  {
    id: 'emisi',
    label: 'Emisi',
    params: [
      { name: 'CO', unit: 'ppm', labels: ['161,0 ppm', '142 ppm'], values: [161, 142], description: '' },
      { name: 'CO\u2082', unit: '%', labels: ['2,3%', '2,8%'], values: [2.3, 2.8], description: '' },
      { name: 'NOx', unit: 'ppm', labels: ['91,0 ppm', '41 ppm'], values: [91, 41], description: '' },
      { name: 'Hidrokarbon (HC)', unit: 'ppm', labels: ['13,7 ppm', '<0.10 ppm'], values: [13.7, 0], description: '' },
      { name: 'Opasitas', unit: '%', labels: ['10,8%', '7,8%'], values: [10.8, 7.8], description: '' },
    ],
  },
  {
    id: 'performa-1',
    label: 'Performa 1 (B100)',
    params: [
      { name: 'Torsi Maksimum', unit: 'Nm', labels: ['284,8 @2500 rpm', '294,2 @2500 rpm'], values: [284.8, 294.2], description: '' },
      { name: 'Daya Maksimum', unit: 'HP', labels: ['117,2 @3000 rpm', '121,1 @3000 rpm'], values: [117.2, 121.1], description: '' },
      { name: 'Konsumsi BBM', unit: 'L/100km', labels: ['5,61', '5,33'], values: [5.61, 5.33], description: '' },
    ],
  },
  {
    id: 'performa-2',
    label: 'Performa 2 (Pertamina Dex)',
    params: [
      { name: 'Torsi Maksimum', unit: 'Nm', labels: ['620,8 @2500 rpm', '713,4 @2000 rpm'], values: [620.8, 713.4], description: '' },
      { name: 'Daya Maksimum', unit: 'HP', labels: ['232,9 @3000 rpm', '254,1 @3000 rpm'], values: [232.9, 254.1], description: '' },
    ],
  },
];

const BAR_COLOR = '#528247';
const BAR_COLOR_2 = '#255c1a';
const GRID_COLOR = '#eef0ea';
const TEXT_COLOR = '#6e8763';
const AXIS_COLOR = '#dde1d5';

const SVG_W = 500;
const SVG_H = 220;
const PAD = { top: 14, right: 14, bottom: 42, left: 48 };

function fmt(v: number): string {
  if (v < 0.1) return v.toFixed(2);
  if (v % 1 === 0) return v.toString();
  return v.toFixed(v < 10 ? 1 : 0);
}

function BarSvgChart({ labels, values }: { labels: [string, string]; values: [number, number] }) {
  const [v1, v2] = values;
  const maxVal = Math.max(v1, v2, 0);
  const range = maxVal || 1;
  const yMax = range * 1.25;
  const plotW = SVG_W - PAD.left - PAD.right;
  const plotH = SVG_H - PAD.top - PAD.bottom;
  const barWidth = plotW * 0.28;
  const gap = (plotW - 2 * barWidth) / 3;
  const xA = PAD.left + gap;
  const xB = PAD.left + 2 * gap + barWidth;
  const barA = (v1 / yMax) * plotH;
  const barB = (v2 / yMax) * plotH;

  const yTicks = 4;
  const tickValues: number[] = [];
  for (let i = 0; i <= yTicks; i++) {
    tickValues.push((yMax / yTicks) * i);
  }

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {tickValues.map((v, i) => {
        const y = PAD.top + plotH - (v / yMax) * plotH;
        return (
          <g key={i}>
            <line x1={PAD.left} y1={y} x2={PAD.left + plotW} y2={y} stroke={GRID_COLOR} strokeDasharray="3 3" />
            <text x={PAD.left - 8} y={y + 4} textAnchor="end" fill={TEXT_COLOR} fontSize={10} fontFamily="inherit">
              {fmt(v)}
            </text>
          </g>
        );
      })}

      <line x1={PAD.left} y1={PAD.top + plotH} x2={PAD.left + plotW} y2={PAD.top + plotH} stroke={AXIS_COLOR} />

      {/* Bar Sebelum */}
      <rect x={xA} y={PAD.top + plotH - barA} width={barWidth} height={barA} rx={4} fill={BAR_COLOR} />
      <text x={xA + barWidth / 2} y={PAD.top + plotH - barA - 8} textAnchor="middle" fill={BAR_COLOR} fontSize={10} fontWeight={700} fontFamily="inherit">
        {labels[0]}
      </text>

      {/* Bar Sesudah */}
      <rect x={xB} y={PAD.top + plotH - barB} width={barWidth} height={barB} rx={4} fill={BAR_COLOR_2} />
      <text x={xB + barWidth / 2} y={PAD.top + plotH - barB - 8} textAnchor="middle" fill={BAR_COLOR_2} fontSize={10} fontWeight={700} fontFamily="inherit">
        {labels[1]}
      </text>

      {/* X-axis labels */}
      <text x={xA + barWidth / 2} y={SVG_H - 8} textAnchor="middle" fill={TEXT_COLOR} fontSize={12} fontWeight={600} fontFamily="inherit">
        Sebelum
      </text>
      <text x={xB + barWidth / 2} y={SVG_H - 8} textAnchor="middle" fill={TEXT_COLOR} fontSize={12} fontWeight={600} fontFamily="inherit">
        Sesudah
      </text>
    </svg>
  );
}

function ParamChart({ param }: { param: ParamConfig }) {
  return (
    <div className="rounded-2xl border border-olive-100 bg-white p-5 md:p-6 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-bold text-brand-dark">{param.name}</h4>
        <span className="text-[11px] font-semibold text-olive-400 bg-olive-50 px-2 py-0.5 rounded-full">{param.unit}</span>
      </div>
      {param.description && (
        <p className="text-[12px] text-olive-500 leading-relaxed mb-3">{param.description}</p>
      )}
      <BarSvgChart labels={param.labels} values={param.values} />
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
