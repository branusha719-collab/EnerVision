export const predictionResult = {
  energy: 245,
  confidence: 87,
  unit: 'Wh',
};

export const explanations = [
  {
    id: 1,
    factor: 'Solar Irradiance',
    impact: 'positive',
    weight: 72,
    detail: 'High GHI of 820 W/m² substantially boosted photovoltaic output, accounting for the majority of generation.',
  },
  {
    id: 2,
    factor: 'Ambient Temperature',
    impact: 'neutral',
    weight: 18,
    detail: 'Temperature of 28°C remained within the optimal operating band for solar panels, causing minimal efficiency loss.',
  },
  {
    id: 3,
    factor: 'Relative Humidity',
    impact: 'negative',
    weight: 10,
    detail: 'Humidity at 65% introduced slight aerosol scattering, reducing effective irradiance by a marginal amount.',
  },
];

// 7-day hourly generation curve (Wh)
export const forecastSeries = [
  { time: '06:00', generation: 12, ghi: 80, temp: 22 },
  { time: '07:00', generation: 48, ghi: 180, temp: 23 },
  { time: '08:00', generation: 112, ghi: 340, temp: 25 },
  { time: '09:00', generation: 178, ghi: 520, temp: 27 },
  { time: '10:00', generation: 224, ghi: 680, temp: 29 },
  { time: '11:00', generation: 251, ghi: 780, temp: 31 },
  { time: '12:00', generation: 265, ghi: 840, temp: 33 },
  { time: '13:00', generation: 258, ghi: 810, temp: 34 },
  { time: '14:00', generation: 237, ghi: 730, temp: 34 },
  { time: '15:00', generation: 198, ghi: 590, temp: 33 },
  { time: '16:00', generation: 145, ghi: 420, temp: 31 },
  { time: '17:00', generation: 82, ghi: 240, temp: 29 },
  { time: '18:00', generation: 28, ghi: 90, temp: 27 },
  { time: '19:00', generation: 4, ghi: 10, temp: 26 },
];

// 30-day daily generation totals (kWh)
export const dailySeries = Array.from({ length: 30 }, (_, i) => {
  const base = 2.1 + Math.sin((i / 30) * Math.PI) * 0.8;
  const noise = (Math.random() - 0.5) * 0.4;
  return {
    day: `Jun ${i + 1}`,
    generation: parseFloat((base + noise).toFixed(2)),
    ghi: Math.round(600 + Math.sin((i / 30) * Math.PI) * 200 + (Math.random() - 0.5) * 80),
    humidity: Math.round(55 + Math.sin((i / 15) * Math.PI) * 20 + (Math.random() - 0.5) * 10),
    temp: Math.round(28 + Math.sin((i / 30) * Math.PI) * 5 + (Math.random() - 0.5) * 3),
  };
});

// Distribution of forecast confidence buckets
export const confidenceDistribution = [
  { range: '50–60%', count: 4 },
  { range: '60–70%', count: 11 },
  { range: '70–80%', count: 18 },
  { range: '80–90%', count: 24 },
  { range: '90–100%', count: 9 },
];

// Energy source breakdown
export const sourceBreakdown = [
  { name: 'Solar PV', value: 68 },
  { name: 'Wind', value: 19 },
  { name: 'Small Hydro', value: 9 },
  { name: 'Biomass', value: 4 },
];

// KPI cards
export const kpiCards = [
  { label: 'Avg Daily Generation', value: '2.34 kWh', delta: '+8%', up: true },
  { label: 'Peak Hour Output', value: '265 Wh', delta: '12:00 IST', up: null },
  { label: 'Forecast Confidence', value: '87%', delta: '+3%', up: true },
  { label: 'GHI Peak', value: '840 W/m²', delta: 'Jun 12', up: null },
];
