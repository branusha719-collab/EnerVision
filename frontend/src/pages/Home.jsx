import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import {
  TbSun,
  TbChartLine,
  TbBrain,
  TbMap,
  TbDroplet,
  TbThermometer,
  TbArrowRight,
  TbBolt,
  TbActivity,
} from "react-icons/tb";

const FEATURES = [
  {
    icon: TbSun,
    title: "Weather-Driven Forecasting",
    body: "Input GHI, temperature, and humidity to receive an instant generation forecast tailored to Karnataka's climate patterns.",
    accent: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-100 dark:border-amber-500/15",
  },
  {
    icon: TbBrain,
    title: "Machine Learning Core",
    body: "A trained regression model maps weather inputs to energy output — built on historical solar generation data from the region.",
    accent: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-100 dark:border-violet-500/15",
  },
  {
    icon: TbChartLine,
    title: "Interactive Analytics",
    body: "Visualise daily trends, parameter correlations, and forecast distributions through a clean analytics dashboard.",
    accent: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-500/10",
    border: "border-sky-100 dark:border-sky-500/15",
  },
  {
    icon: TbMap,
    title: "Karnataka Focus",
    body: "Designed specifically for the geography and weather patterns of Karnataka — where solar potential is among India's highest.",
    accent: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-100 dark:border-emerald-500/15",
  },
];

const INPUT_CARDS = [
  {
    icon: TbSun,
    title: "Global Horizontal Irradiance",
    abbr: "GHI",
    unit: "W/m²",
    color: "text-amber-500",
    iconColor: "text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/20",
    tagBg:
      "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
    accentBar: "bg-amber-400",
    body: "Measures the amount of sunlight reaching the Earth's surface. Higher values generally indicate greater potential for solar energy generation.",
    tip: "Values above 600 W/m² typically correspond to clear-sky conditions during peak sunlight hours — when solar panels generate the most electricity.",
  },
  {
    icon: TbThermometer,
    title: "Temperature",
    abbr: "TEMP",
    unit: "°C",
    color: "text-emerald-500",
    iconColor: "text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20",
    tagBg:
      "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
    accentBar: "bg-emerald-400",
    body: "Represents atmospheric conditions that influence renewable energy performance and help improve forecast accuracy.",
    tip: "Panels operate most efficiently at moderate temperatures. Extreme heat can cause a slight reduction in output — the model accounts for this relationship.",
  },
  {
    icon: TbDroplet,
    title: "Humidity",
    abbr: "RH",
    unit: "%",
    color: "text-sky-500",
    iconColor: "text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-500/10",
    border: "border-sky-200 dark:border-sky-500/20",
    tagBg: "bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-400",
    accentBar: "bg-sky-400",
    body: "Represents the amount of moisture present in the air and can slightly affect renewable energy generation conditions.",
    tip: "High humidity can scatter incoming sunlight before it reaches solar panels. Karnataka's monsoon months see notably elevated humidity levels.",
  },
];

const BENEFITS = [
  {
    label: "Grid operators",
    body: "Plan dispatch schedules with confidence using short-term solar generation forecasts.",
  },
  {
    label: "Energy analysts",
    body: "Explore how weather variables interact with output through built-in explainability.",
  },
  {
    label: "Researchers",
    body: "Access a clean data pipeline from weather inputs to ML predictions, ready for experimentation.",
  },
  {
    label: "Policy makers",
    body: "Understand Karnataka's renewable potential and plan capacity additions with evidence.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Learn what EnerVision does and how renewable energy forecasting works.",
  },
  {
    num: "02",
    title: "Understand",
    desc: "Explore the three weather inputs and why each one matters for solar output.",
  },
  {
    num: "03",
    title: "Enter Inputs",
    desc: "Set current or expected weather conditions using the intuitive sliders.",
  },
  {
    num: "04",
    title: "Generate Forecast",
    desc: "Click once — the ML model returns a prediction in under a second.",
  },
  {
    num: "05",
    title: "Explore Insights",
    desc: "Understand which parameters drove the result and explore trends in the analytics dashboard.",
  },
];

const sectionIn = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function WindTurbineScene() {
  return (
    <svg
      viewBox="0 0 220 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wt-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2744" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#060f1e" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="wt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect width="220" height="300" fill="url(#wt-sky)" />
      {[
        [30, 40],
        [80, 25],
        [150, 50],
        [190, 30],
        [60, 80],
        [170, 90],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="1.2"
          fill="#7dd3fc"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 2 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
      <path d="M106 280 L114 280 L118 108 L102 108 Z" fill="#1e3a5f" />
      <path
        d="M106 280 L108 280 L112 108 L106 108 Z"
        fill="#334155"
        opacity="0.5"
      />
      <circle cx="110" cy="104" r="9" fill="#334155" />
      <circle cx="110" cy="104" r="5" fill="#475569" />
      <motion.g
        style={{ originX: "110px", originY: "104px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        <path d="M110 104 Q120 80 114 50 Q108 72 110 104Z" fill="#94a3b8" />
        <path d="M110 104 Q85 96 64 108 Q88 106 110 104Z" fill="#94a3b8" />
        <path d="M110 104 Q122 126 115 156 Q108 132 110 104Z" fill="#94a3b8" />
      </motion.g>
      <rect x="0" y="278" width="220" height="22" fill="url(#wt-ground)" />
      <line
        x1="0"
        y1="278"
        x2="220"
        y2="278"
        stroke="#1e3a5f"
        strokeWidth="1"
        opacity="0.5"
      />
      <rect x="90" y="274" width="40" height="8" rx="3" fill="#1e3a5f" />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="110"
          cy="104"
          r={20 + i * 18}
          stroke="#0ea5e9"
          strokeWidth="0.8"
          fill="none"
          animate={{ opacity: [0, 0.35, 0], scale: [0.8, 1.2] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
          style={{ originX: "110px", originY: "104px" }}
        />
      ))}
    </svg>
  );
}

function InputsIllustration() {
  return (
    <svg
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="inp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="inp-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2744" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#060f1e" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="inp-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#075985" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="inp-sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <filter id="inp-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="inp-clip">
          <rect width="280" height="200" rx="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#inp-clip)">
        <rect width="280" height="200" fill="url(#inp-sky)" />

        {/* Sun */}
        <circle cx="224" cy="38" r="32" fill="url(#inp-sun-halo)" />
        <motion.circle
          cx="224"
          cy="38"
          r="16"
          fill="#fbbf24"
          filter="url(#inp-glow)"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.line
            key={i}
            x1={224 + Math.cos((angle * Math.PI) / 180) * 19}
            y1={38 + Math.sin((angle * Math.PI) / 180) * 19}
            x2={224 + Math.cos((angle * Math.PI) / 180) * 27}
            y2={38 + Math.sin((angle * Math.PI) / 180) * 27}
            stroke="#fbbf24"
            strokeWidth="1.2"
            strokeLinecap="round"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}

        {/* Humidity cloud */}
        <g opacity="0.55">
          <ellipse
            cx="50"
            cy="44"
            rx="22"
            ry="14"
            fill="#bae6fd"
            opacity="0.25"
          />
          <ellipse
            cx="38"
            cy="50"
            rx="16"
            ry="10"
            fill="#bae6fd"
            opacity="0.2"
          />
          <ellipse
            cx="62"
            cy="50"
            rx="18"
            ry="10"
            fill="#bae6fd"
            opacity="0.2"
          />
        </g>
        {/* Rain drops */}
        {[
          [44, 62],
          [52, 66],
          [60, 62],
          [48, 70],
        ].map(([x, y], i) => (
          <motion.line
            key={i}
            x1={x}
            y1={y}
            x2={x - 2}
            y2={y + 7}
            stroke="#7dd3fc"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
            animate={{ opacity: [0.1, 0.5, 0.1], y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Temperature indicator */}
        <g transform="translate(130, 28)">
          <rect width="42" height="18" rx="5" fill="#0d1c30" opacity="0.8" />
          <rect
            width="42"
            height="18"
            rx="5"
            fill="none"
            stroke="#10b981"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <text
            x="5"
            y="6.5"
            fontSize="5"
            fill="#64748b"
            fontFamily="JetBrains Mono, monospace"
          >
            TEMP
          </text>
          <text
            x="5"
            y="14"
            fontSize="8"
            fill="#10b981"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
          >
            28°C
          </text>
        </g>

        {/* Ground */}
        <rect x="0" y="155" width="280" height="45" fill="url(#inp-ground)" />
        <line
          x1="0"
          y1="155"
          x2="280"
          y2="155"
          stroke="#1e3a5f"
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Solar panels */}
        <g transform="translate(82, 118) rotate(-15)" filter="url(#inp-glow)">
          <rect width="70" height="48" rx="2" fill="url(#inp-panel)" />
          {[23.3, 46.6].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="48"
              stroke="#bae6fd"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          ))}
          {[16, 32].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="70"
              y2={y}
              stroke="#bae6fd"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          ))}
          <rect width="70" height="6" rx="2" fill="white" opacity="0.08" />
          <line
            x1="35"
            y1="48"
            x2="35"
            y2="64"
            stroke="#475569"
            strokeWidth="3"
          />
          <line
            x1="20"
            y1="64"
            x2="50"
            y2="64"
            stroke="#475569"
            strokeWidth="2"
          />
        </g>

        <g transform="translate(160, 124) rotate(-15)" opacity="0.7">
          <rect
            width="56"
            height="38"
            rx="2"
            fill="url(#inp-panel)"
            opacity="0.85"
          />
          {[18.6, 37.3].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="38"
              stroke="#bae6fd"
              strokeWidth="0.4"
              strokeOpacity="0.45"
            />
          ))}
          {[12.6, 25.3].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="56"
              y2={y}
              stroke="#bae6fd"
              strokeWidth="0.4"
              strokeOpacity="0.45"
            />
          ))}
          <line
            x1="28"
            y1="38"
            x2="28"
            y2="52"
            stroke="#475569"
            strokeWidth="2.5"
          />
          <line
            x1="16"
            y1="52"
            x2="40"
            y2="52"
            stroke="#475569"
            strokeWidth="1.5"
          />
        </g>

        {/* GHI chip */}
        <g transform="translate(14, 155)">
          <rect width="78" height="20" rx="5" fill="#0d1c30" opacity="0.92" />
          <rect
            width="78"
            height="20"
            rx="5"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="0.5"
            opacity="0.45"
          />
          <text
            x="7"
            y="8"
            fontSize="5"
            fill="#64748b"
            fontFamily="JetBrains Mono, monospace"
          >
            GHI READING
          </text>
          <text
            x="7"
            y="16"
            fontSize="9"
            fill="#fbbf24"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
          >
            820 W/m²
          </text>
        </g>

        {/* Energy arrows */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M ${200 + i * 18} 100 L ${200 + i * 18} 155`}
            stroke="#38bdf8"
            strokeWidth="0.8"
            strokeDasharray="3 5"
            animate={{ opacity: [0.1, 0.4, 0.1], strokeDashoffset: [0, -16] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </g>
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* JOURNEY — How it works */}
      <section className="py-24 bg-slate-50 dark:bg-[#070c15]/80">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            variants={sectionIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="label-eyebrow text-sky-500 mb-3 font-body">
              Your journey
            </p>
            <h2 className="font-display text-display-md text-slate-900 dark:text-white">
              From zero to forecast
              <br />
              in five steps
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-5 gap-3">
            {STEPS.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                variants={sectionIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 group hover:border-sky-200 dark:hover:border-sky-700/40 hover:shadow-sm transition-all duration-300"
              >
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-1/2 -right-1.5 w-3 h-px bg-slate-200 dark:bg-slate-700 z-10" />
                )}
                <span className="text-4xl font-bold text-slate-100 dark:text-slate-800 font-display leading-none mb-3 block">
                  {num}
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-white mb-1.5 font-body">
                  {title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-body">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATIONAL INPUT CARDS */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-5 gap-14 items-start">
            {/* Illustration column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="hidden lg:block lg:col-span-2"
            >
              <div className="sticky top-28 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md shadow-sky-500/5">
                <InputsIllustration />
              </div>
            </motion.div>

            {/* Cards column */}
            <div className="lg:col-span-3">
              <motion.div
                variants={sectionIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-10"
              >
                <p className="label-eyebrow text-sky-500 mb-3 font-body">
                  Understanding the inputs
                </p>
                <h2 className="font-display text-display-md text-slate-900 dark:text-white max-w-lg">
                  What does EnerVision actually measure?
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-5 max-w-xl leading-relaxed font-body">
                  The forecast model uses three weather parameters. Here is what
                  each one means — in plain language, no technical background
                  required.
                </p>
              </motion.div>

              <div className="space-y-5">
                {INPUT_CARDS.map(
                  (
                    {
                      icon: Icon,
                      title,
                      abbr,
                      unit,
                      color,
                      iconColor,
                      bg,
                      border,
                      tagBg,
                      accentBar,
                      body,
                      tip,
                    },
                    i,
                  ) => (
                    <motion.div
                      key={abbr}
                      variants={sectionIn}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`group bg-white dark:bg-slate-900 border ${border} rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300`}
                    >
                      <div className={`h-0.5 w-full ${accentBar} opacity-60`} />
                      <div className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}
                          >
                            <Icon className={`text-xl ${iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-display text-base text-slate-800 dark:text-white leading-snug">
                                {title}
                              </h3>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md mono ${tagBg} shrink-0`}
                              >
                                {abbr} · {unit}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-body">
                              {body}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`${bg} rounded-xl px-4 py-3 border ${border}`}
                        >
                          <p
                            className={`text-[11px] font-semibold ${color} mb-1 font-body uppercase tracking-wide`}
                          >
                            Good to know
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-body">
                            {tip}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>

              <motion.div
                variants={sectionIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-10"
              >
                <NavLink
                  to="/forecast"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-200 hover:shadow-sky-500/35 font-body"
                >
                  Try it now <TbArrowRight className="text-base" />
                </NavLink>
                <p className="text-xs text-slate-400 mt-3 font-body">
                  No account needed · Results in under a second
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="py-24 bg-slate-50 dark:bg-[#070c15]/80">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            variants={sectionIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="label-eyebrow text-sky-500 mb-3 font-body">
              Platform capabilities
            </p>
            <h2 className="font-display text-display-md text-slate-900 dark:text-white max-w-lg">
              Everything you need to forecast renewable energy
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(
              ({ icon: Icon, title, body, accent, bg, border }, i) => (
                <motion.div
                  key={title}
                  variants={sectionIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`group bg-white dark:bg-slate-900 border ${border} border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`text-xl ${accent}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-2 font-body">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-body">
                    {body}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR + Wind turbine */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Copy */}
            <motion.div
              variants={sectionIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="grid sm:grid-cols-2 gap-12 items-start">
                <div>
                  <p className="label-eyebrow text-sky-500 mb-3 font-body">
                    Who it's for
                  </p>
                  <h2 className="font-display text-display-md text-slate-900 dark:text-white mb-5">
                    Built for everyone in the energy ecosystem
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm mb-8 font-body">
                    From grid operators to policy makers, EnerVision delivers
                    actionable intelligence at every level of the renewable
                    energy decision chain.
                  </p>
                  <NavLink
                    to="/forecast"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-500/25 transition-all font-body"
                  >
                    Try the forecast <TbArrowRight />
                  </NavLink>
                </div>

                <div className="space-y-3">
                  {BENEFITS.map(({ label, body }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-100 dark:hover:border-sky-800/40 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white mb-0.5 font-body">
                          {label}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-body">
                          {body}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Wind turbine illustration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex justify-center items-end lg:col-span-2"
            >
              <div className="w-48 h-72 opacity-80">
                <WindTurbineScene />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-slate-50 dark:bg-[#070c15]/80">
        <motion.div
          variants={sectionIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-5 sm:px-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 rounded-2xl p-12 text-center text-white shadow-xl shadow-sky-500/20">
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-52 h-52 bg-white/5 rounded-full pointer-events-none" />
            <div className="relative">
              <p className="label-eyebrow text-sky-200 mb-4 font-body">
                Start now
              </p>
              <h2 className="font-display text-display-md text-white mb-5">
                Ready to run your first forecast?
              </h2>
              <p className="text-sky-100 text-sm mb-10 max-w-md mx-auto leading-relaxed font-body">
                Enter three weather parameters and receive an AI-powered
                generation estimate in seconds. No expertise required.
              </p>
              <NavLink
                to="/forecast"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-sky-600 text-sm font-bold rounded-xl hover:bg-sky-50 transition-colors shadow-lg font-body"
              >
                Open Forecast Tool <TbArrowRight />
              </NavLink>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
