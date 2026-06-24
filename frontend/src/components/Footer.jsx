import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070c15]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-sky-500 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
              <circle cx="10" cy="10" r="3.5" fill="white" />
              <line x1="10" y1="2" x2="10" y2="5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="10" y1="15" x2="10" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="2" y1="10" x2="5" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="15" y1="10" x2="18" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="4.2" y1="4.2" x2="6.5" y2="6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="13.5" y1="13.5" x2="15.8" y2="15.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="15.8" y1="4.2" x2="13.5" y2="6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6.5" y1="13.5" x2="4.2" y2="15.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
            Ener<span className="text-sky-500">Vision</span>
          </span>
        </div>
        <nav className="flex gap-5">
          {['/', '/forecast', '/analytics', '/about'].map((to, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors font-body"
            >
              {['Home', 'Forecast', 'Analytics', 'About'][i]}
            </NavLink>
          ))}
        </nav>
        <p className="text-xs text-slate-400 dark:text-slate-600 font-body">
          © 2026 EnerVision · Karnataka, India
        </p>
      </div>
    </footer>
  );
}
