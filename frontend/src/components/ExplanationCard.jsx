import { motion } from 'framer-motion';

const impactConfig = {
  positive: {
    label: 'Boosted output',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    bar: 'bg-emerald-400',
    border: 'border-emerald-100 dark:border-emerald-500/20',
  },
  neutral: {
    label: 'Neutral effect',
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-500 dark:text-slate-400',
    bar: 'bg-slate-400',
    border: 'border-slate-200 dark:border-slate-700',
  },
  negative: {
    label: 'Reduced output',
    bg: 'bg-red-50 dark:bg-red-500/10',
    text: 'text-red-500 dark:text-red-400',
    bar: 'bg-red-400',
    border: 'border-red-100 dark:border-red-500/20',
  },
};

function ExplanationItem({ factor, impact, weight, detail, index }) {
  const cfg = impactConfig[impact];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.07, duration: 0.35 }}
      className={`border ${cfg.border} border-slate-100 dark:border-slate-800 rounded-xl p-4 hover:shadow-sm transition-shadow`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-800 dark:text-white font-display">{factor}</p>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed font-body">{detail}</p>
        </div>
        <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-md border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
          {cfg.label}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${cfg.bar}`}
            initial={{ width: 0 }}
            animate={{ width: `${weight}%` }}
            transition={{ delay: 0.3 + index * 0.07, duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs mono text-slate-400 w-8 text-right">{weight}%</span>
      </div>
    </motion.div>
  );
}

export default function ExplanationCard({ explanations }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 shadow-sm">
      <p className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-display">What drove this prediction?</p>
      <p className="text-xs text-slate-400 mb-5 font-body">Each input's contribution to the final forecast — so you know exactly what matters.</p>
      <div className="space-y-3">
        {explanations.map((exp, i) => (
          <ExplanationItem key={exp.id} {...exp} index={i} />
        ))}
      </div>
    </div>
  );
}
