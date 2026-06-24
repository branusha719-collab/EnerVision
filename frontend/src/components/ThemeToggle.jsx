import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{ scale: 0.7, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.7, rotate: 30, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        {isDark ? <HiMoon size={18} /> : <HiSun size={18} />}
      </motion.span>
    </button>
  );
}
