import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 shadow-lg text-xs">
      <p className="font-semibold text-slate-600 dark:text-slate-300 mb-1 font-display">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-500" />
          <span className="text-slate-500 font-body">Generation:</span>
          <span className="font-bold text-slate-800 dark:text-slate-100 mono">{p.value} Wh</span>
        </div>
      ))}
    </div>
  );
}

export default function ForecastChart({ data, title, subtitle }) {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#1a2540' : '#f1f5f9';
  const axisColor = isDark ? '#475569' : '#94a3b8';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
    >
      <div className="mb-5">
        <p className="text-sm font-bold text-slate-900 dark:text-white font-display">{title}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5 font-body">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 9, fill: axisColor }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: axisColor }} axisLine={false} tickLine={false} unit=" Wh" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="generation"
            stroke="#0ea5e9"
            strokeWidth={2}
            fill="url(#chartGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#0ea5e9', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
