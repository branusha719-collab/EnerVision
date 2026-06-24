import { useState } from 'react';
import { motion } from 'framer-motion';

function SliderField({ label, unit, min, max, step = 1, value, onChange, description, helperText, color = '#0ea5e9' }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2.5 group">
      <div className="flex items-start justify-between gap-3">
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 font-display">{label}</label>
          {description && <p className="text-xs text-slate-400 mt-0.5 font-body leading-relaxed">{description}</p>}
        </div>
        <span className="mono text-lg font-bold shrink-0" style={{ color }}>
          {value}
          <span className="text-xs font-normal text-slate-400 ml-1">{unit}</span>
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-2 appearance-none rounded-full cursor-pointer outline-none transition-all"
          style={{
            background: `linear-gradient(to right, ${color} ${pct}%, ${pct > 0 ? '#e2e8f0' : '#e2e8f0'} ${pct}%)`,
          }}
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-slate-400 mono">{min}</span>
          <span className="text-[10px] text-slate-400 mono">{max}</span>
        </div>
      </div>
      {helperText && (
        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-body leading-relaxed pl-0.5">{helperText}</p>
      )}
    </div>
  );
}

const SLIDERS = [
  {
    key: 'ghi',
    label: 'Global Horizontal Irradiance',
    unit: 'W/m²',
    min: 0,
    max: 1200,
    step: 10,
    description: 'Amount of sunlight hitting a flat surface',
    helperText: '0 = night / overcast · 600–900 = typical sunny day · 1200 = peak clear sky',
    color: '#f59e0b',
    default: 600,
  },
  {
    key: 'temp',
    label: 'Ambient Temperature',
    unit: '°C',
    min: -5,
    max: 50,
    step: 0.5,
    description: 'Air temperature at ground level',
    helperText: 'Panels are most efficient at 15–30°C. Higher temperatures can reduce output slightly.',
    color: '#10b981',
    default: 28,
  },
  {
    key: 'humidity',
    label: 'Relative Humidity',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    description: 'Moisture content of the air',
    helperText: 'High humidity scatters sunlight and can slightly reduce solar energy reaching panels.',
    color: '#0ea5e9',
    default: 55,
  },
];

export default function WeatherForm({ onPredict }) {
  const [values, setValues] = useState({ ghi: 600, temp: 28, humidity: 55 });

  const handleSubmit = () => {
    onPredict(values);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 shadow-sm">
      <div className="mb-7">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 font-display">Weather Parameters</h3>
        <p className="text-xs text-slate-400 font-body leading-relaxed">Adjust the sliders to match current or expected conditions in your area.</p>
      </div>

      <div className="space-y-8">
        {SLIDERS.map(({ key, label, unit, min, max, step, description, helperText, color }) => (
          <SliderField
            key={key}
            label={label}
            unit={unit}
            min={min}
            max={max}
            step={step}
            value={values[key]}
            onChange={val => setValues(v => ({ ...v, [key]: val }))}
            description={description}
            helperText={helperText}
            color={color}
          />
        ))}
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2 mt-7 pt-6 border-t border-slate-100 dark:border-slate-800">
        {[
          { label: 'GHI', value: `${values.ghi} W/m²`, bg: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20' },
          { label: 'Temp', value: `${values.temp}°C`, bg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20' },
          { label: 'RH', value: `${values.humidity}%`, bg: 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-100 dark:border-sky-500/20' },
        ].map(({ label, value, bg }) => (
          <span key={label} className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg mono border ${bg}`}>
            {label}: {value}
          </span>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        onClick={handleSubmit}
        className="w-full mt-5 py-3.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 transition-all duration-200 font-display tracking-wide"
      >
        Generate Forecast
      </motion.button>
    </div>
  );
}
