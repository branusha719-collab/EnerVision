import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const STATS = [
  { value: "94%", label: "Forecast accuracy" },
  { value: "3 GW", label: "Karnataka RE capacity" },
  { value: "<100ms", label: "Prediction time" },
];

function SolarSceneIllustration() {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="h-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#075985" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="h-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2744" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#060f1e" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="h-panel-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#075985" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="h-panel-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0c3a5f" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient
          id="h-sun-glow"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <radialGradient id="h-sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <filter id="h-glow-sun">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="h-glow-panel">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="h-clip">
          <rect width="480" height="360" rx="16" />
        </clipPath>
      </defs>

      <g clipPath="url(#h-clip)">
        {/* Sky */}
        <rect width="480" height="360" fill="url(#h-sky)" />

        {/* Horizon atmospheric haze */}
        <ellipse
          cx="240"
          cy="260"
          rx="260"
          ry="60"
          fill="#0ea5e9"
          opacity="0.06"
        />

        {/* Sun halo */}
        <circle cx="390" cy="70" r="56" fill="url(#h-sun-halo)" />

        {/* Sun */}
        <motion.circle
          cx="390"
          cy="70"
          r="26"
          fill="url(#h-sun-glow)"
          filter="url(#h-glow-sun)"
          animate={{ opacity: [0.82, 1, 0.82], r: [26, 27, 26] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sun rays */}
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => (
          <motion.line
            key={i}
            x1={390 + Math.cos((angle * Math.PI) / 180) * 32}
            y1={70 + Math.sin((angle * Math.PI) / 180) * 32}
            x2={390 + Math.cos((angle * Math.PI) / 180) * 46}
            y2={70 + Math.sin((angle * Math.PI) / 180) * 46}
            stroke="#fbbf24"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Light beams from sun to panels */}
        {[150, 170, 195].map((x, i) => (
          <motion.line
            key={i}
            x1="390"
            y1="88"
            x2={x}
            y2="185"
            stroke="#fbbf24"
            strokeWidth="0.8"
            strokeDasharray="4 8"
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Ground */}
        <rect x="0" y="268" width="480" height="92" fill="url(#h-ground)" />

        {/* Horizon line */}
        <line
          x1="0"
          y1="268"
          x2="480"
          y2="268"
          stroke="#1e3a5f"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* === SOLAR PANEL ARRAY === */}
        {/* Back row */}
        <g transform="translate(60, 200) rotate(-18)" opacity="0.55">
          <rect width="72" height="48" rx="2" fill="url(#h-panel-b)" />
          {[24, 48].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="48"
              stroke="#7dd3fc"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          ))}
          {[16, 32].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="72"
              y2={y}
              stroke="#7dd3fc"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          ))}
          <rect width="72" height="5" rx="2" fill="white" opacity="0.06" />
          <line
            x1="36"
            y1="48"
            x2="36"
            y2="65"
            stroke="#334155"
            strokeWidth="3"
          />
          <line
            x1="20"
            y1="65"
            x2="52"
            y2="65"
            stroke="#334155"
            strokeWidth="2"
          />
        </g>

        <g transform="translate(148, 208) rotate(-18)" opacity="0.55">
          <rect
            width="72"
            height="48"
            rx="2"
            fill="url(#h-panel-a)"
            opacity="0.8"
          />
          {[24, 48].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="48"
              stroke="#7dd3fc"
              strokeWidth="0.5"
              strokeOpacity="0.35"
            />
          ))}
          {[16, 32].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="72"
              y2={y}
              stroke="#7dd3fc"
              strokeWidth="0.5"
              strokeOpacity="0.35"
            />
          ))}
          <line
            x1="36"
            y1="48"
            x2="36"
            y2="62"
            stroke="#334155"
            strokeWidth="3"
          />
          <line
            x1="20"
            y1="62"
            x2="52"
            y2="62"
            stroke="#334155"
            strokeWidth="2"
          />
        </g>

        {/* Front row */}
        <g
          transform="translate(40, 220) rotate(-18)"
          filter="url(#h-glow-panel)"
        >
          <rect width="88" height="58" rx="3" fill="url(#h-panel-a)" />
          {[29.3, 58.6].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="58"
              stroke="#bae6fd"
              strokeWidth="0.6"
              strokeOpacity="0.55"
            />
          ))}
          {[19.3, 38.6].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="88"
              y2={y}
              stroke="#bae6fd"
              strokeWidth="0.6"
              strokeOpacity="0.55"
            />
          ))}
          <rect width="88" height="7" rx="3" fill="white" opacity="0.09" />
          <line
            x1="44"
            y1="58"
            x2="44"
            y2="80"
            stroke="#475569"
            strokeWidth="3.5"
          />
          <line
            x1="24"
            y1="80"
            x2="64"
            y2="80"
            stroke="#475569"
            strokeWidth="2"
          />
        </g>

        <g
          transform="translate(148, 230) rotate(-18)"
          filter="url(#h-glow-panel)"
        >
          <rect width="88" height="58" rx="3" fill="url(#h-panel-b)" />
          {[29.3, 58.6].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="58"
              stroke="#bae6fd"
              strokeWidth="0.6"
              strokeOpacity="0.5"
            />
          ))}
          {[19.3, 38.6].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="88"
              y2={y}
              stroke="#bae6fd"
              strokeWidth="0.6"
              strokeOpacity="0.5"
            />
          ))}
          <rect width="88" height="7" rx="3" fill="white" opacity="0.09" />
          <line
            x1="44"
            y1="58"
            x2="44"
            y2="76"
            stroke="#475569"
            strokeWidth="3.5"
          />
          <line
            x1="24"
            y1="76"
            x2="64"
            y2="76"
            stroke="#475569"
            strokeWidth="2"
          />
        </g>

        {/* === WIND TURBINE === */}
        <path d="M 348 268 L 344 115 L 352 115 L 356 268 Z" fill="#334155" />
        <circle cx="348" cy="113" r="7" fill="#475569" />
        <motion.g
          style={{ originX: "348px", originY: "113px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M348 113 Q358 90 352 62 Q346 84 348 113Z"
            fill="#64748b"
            opacity="0.9"
          />
          <path
            d="M348 113 Q324 105 302 115 Q324 117 348 113Z"
            fill="#64748b"
            opacity="0.9"
          />
          <path
            d="M348 113 Q365 130 360 158 Q352 138 348 113Z"
            fill="#64748b"
            opacity="0.9"
          />
        </motion.g>

        {/* Second smaller turbine */}
        <path d="M 424 268 L 421 175 L 427 175 L 430 268 Z" fill="#2d3f52" />
        <circle cx="424" cy="173" r="5" fill="#3d4f62" />
        <motion.g
          style={{ originX: "424px", originY: "173px" }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "linear",
            delay: 0.6,
          }}
        >
          <path
            d="M424 173 Q431 157 428 138 Q423 153 424 173Z"
            fill="#4b5e72"
            opacity="0.85"
          />
          <path
            d="M424 173 Q410 167 396 173 Q410 175 424 173Z"
            fill="#4b5e72"
            opacity="0.85"
          />
          <path
            d="M424 173 Q432 185 429 204 Q423 190 424 173Z"
            fill="#4b5e72"
            opacity="0.85"
          />
        </motion.g>

        {/* Energy flow line */}
        <motion.path
          d="M 200 255 Q 270 262 348 268"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -22] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          opacity="0.4"
        />

        {/* Forecast output data chip — inside illustration, bottom right area */}
        <g transform="translate(252, 148)">
          <rect width="104" height="52" rx="9" fill="#060f1e" opacity="0.88" />
          <rect
            width="104"
            height="52"
            rx="9"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="0.75"
            opacity="0.45"
          />
          <text
            x="10"
            y="17"
            fontSize="7"
            fill="#64748b"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.05em"
          >
            FORECAST OUTPUT
          </text>
          <text
            x="10"
            y="33"
            fontSize="13"
            fill="#38bdf8"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
          >
            245 Wh
          </text>
          <circle cx="92" cy="12" r="3.5" fill="#22c55e" opacity="0.9" />
          <motion.circle
            cx="92"
            cy="12"
            r="3.5"
            fill="#22c55e"
            opacity="0"
            animate={{ r: [3.5, 7], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </g>
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.022] dark:opacity-[0.045]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "38px 38px",
        }}
      />
      {/* Ambient blobs */}
      <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] bg-sky-400/6 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[480px] h-[480px] bg-amber-400/5 dark:bg-amber-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 rounded-full px-3.5 py-1.5 mb-8 font-body tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                Karnataka Renewable Energy Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-display text-display-xl text-slate-900 dark:text-white mb-6 text-balance"
            >
              Forecast the{" "}
              <em className="not-italic text-sky-500">sun's output</em>, before
              it rises.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={item}
              className="text-base text-slate-500 dark:text-slate-400 leading-[1.75] mb-10 max-w-lg font-body"
            >
              EnerVision applies machine learning to weather parameters,
              delivering solar energy generation forecasts for Karnataka —
              giving analysts, planners, and grid operators the clarity to act.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-14">
              <NavLink
                to="/forecast"
                className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 transition-all duration-200 active:scale-[0.98] font-body"
              >
                Run a forecast
              </NavLink>
              <NavLink
                to="/analytics"
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-xl transition-colors duration-200 border border-slate-200 dark:border-slate-700 font-body"
              >
                View analytics
              </NavLink>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-10 pt-8 border-t border-slate-100 dark:border-slate-800"
            >
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mono">
                    {value}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 font-body">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-2xl shadow-sky-500/10 dark:shadow-sky-900/20 glow-sky">
              <SolarSceneIllustration />
            </div>

            {/* Single floating GHI chip — top left */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.45 }}
              className="absolute top-4 -left-5 bg-white/96 dark:bg-slate-900/96 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 shadow-lg"
            >
              <p className="text-[10px] text-slate-400 mb-0.5 font-body">GHI</p>
              <p className="text-sm font-semibold mono text-amber-400">
                820 W/m²
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-slate-400 tracking-widest uppercase font-body">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
