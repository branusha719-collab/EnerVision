import { motion } from 'framer-motion';
import { TbBolt } from 'react-icons/tb';

export default function ResultCard({ energy, generatedAt }) {
  // Context label
  const getContext = (e) => {
    if (e >= 200) return 'Strong output — excellent solar conditions';
    if (e >= 120) return 'Good output — typical clear-sky day';
    if (e >= 60) return 'Moderate output — partial cloud cover likely';
    return 'Low output — overcast or night conditions';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 rounded-2xl p-7 text-white shadow-xl shadow-sky-500/20"
    >
      {/* Decorative circle */}
      <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/8 rounded-full" />
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <TbBolt className="text-sky-200 text-sm" />
          <p className="text-sky-100 text-xs font-semibold uppercase tracking-wide font-body">Predicted Generation</p>
        </div>

        <div className="flex items-end gap-2 mb-3">
          <span className="text-6xl font-bold mono leading-none font-display">{energy}</span>
          <span className="text-sky-200 text-xl font-medium mb-1">Wh</span>
        </div>

        <p className="text-xs text-sky-100 font-body mb-4 leading-relaxed">{getContext(energy)}</p>

        <div className="pt-4 border-t border-white/15">
          <div className="flex items-center gap-2 text-xs text-sky-200">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
              <path d="M8 5v3.5l2 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-body">Generated at {generatedAt}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
