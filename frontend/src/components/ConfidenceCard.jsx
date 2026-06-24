import { motion } from 'framer-motion';

function Arc({ pct }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const half = circ / 2;
  const fill = (pct / 100) * half;

  const color = pct >= 85 ? '#10b981' : pct >= 70 ? '#f59e0b' : '#ef4444';

  return (
    <svg viewBox="0 0 110 60" className="w-full max-w-[140px]">
      {/* Background arc */}
      <path
        d={`M 7 55 A ${r} ${r} 0 0 1 103 55`}
        fill="none"
        stroke="currentColor"
        className="text-slate-100 dark:text-slate-800"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Fill arc */}
      <motion.path
        d={`M 7 55 A ${r} ${r} 0 0 1 103 55`}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${half} ${half}`}
        strokeDashoffset={half}
        animate={{ strokeDashoffset: half - fill }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
      />
      <text x="55" y="52" textAnchor="middle" className="mono" fontSize="16" fontWeight="700" fill={color}>
        {pct}%
      </text>
    </svg>
  );
}

export default function ConfidenceCard({ confidence }) {
  const level = confidence >= 85 ? 'High' : confidence >= 70 ? 'Moderate' : 'Low';
  const color = confidence >= 85 ? 'text-emerald-500' : confidence >= 70 ? 'text-amber-500' : 'text-red-500';
  const desc = confidence >= 85
    ? 'Model is confident in this prediction based on the given inputs.'
    : confidence >= 70
    ? 'Reasonable confidence — consider cross-checking with nearby weather data.'
    : 'Low confidence — inputs may be at the edge of the model\'s training range.';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 shadow-sm"
    >
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-5 font-body">Model Confidence</p>
      <div className="flex flex-col items-center gap-2">
        <Arc pct={confidence} />
        <span className={`text-sm font-bold ${color} font-display`}>{level} confidence</span>
        <p className="text-xs text-slate-400 text-center max-w-[200px] leading-relaxed font-body">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
