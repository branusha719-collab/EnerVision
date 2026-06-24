import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const links = [
  { to: '/', label: 'Home' },
  { to: '/forecast', label: 'Forecast' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/about', label: 'About' },
];

// Logo SVG — solar bolt
function Logo() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
      <circle cx="14" cy="14" r="14" fill="white" fillOpacity="0.15" />
      {/* Sun */}
      <circle cx="14" cy="14" r="5" fill="white" />
      {/* Rays */}
      <line x1="14" y1="4" x2="14" y2="7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="21" x2="14" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="14" x2="7" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="14" x2="24" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6.9" y1="6.9" x2="9.1" y2="9.1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.9" y1="18.9" x2="21.1" y2="21.1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21.1" y1="6.9" x2="18.9" y2="9.1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9.1" y1="18.9" x2="6.9" y2="21.1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 dark:bg-[#070c15]/92 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center shrink-0 group-hover:bg-sky-600 transition-colors">
            <Logo />
          </span>
          <span className="font-bold text-[15px] tracking-tight text-slate-900 dark:text-white font-display">
            Ener<span className="text-sky-500">Vision</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-[13.5px] font-medium rounded-lg transition-colors duration-150 font-body ${
                  isActive
                    ? 'text-sky-500'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-sky-50 dark:bg-sky-500/10 rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-[#070c15] border-b border-slate-200 dark:border-slate-800"
          >
            <div className="px-5 pb-5 pt-2 flex flex-col gap-1">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors font-body ${
                      isActive
                        ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-500'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
