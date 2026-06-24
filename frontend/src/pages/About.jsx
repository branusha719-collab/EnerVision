import { motion } from "framer-motion";

const sectionIn = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const ARCH_STEPS = [
  {
    label: "Weather Data",
    desc: "GHI, temperature, and humidity — the three primary inputs to the system.",
  },
  {
    label: "Preprocessing",
    desc: "Normalisation, outlier filtering, and feature engineering to prepare inputs.",
  },
  {
    label: "ML Model",
    desc: "Trained regression model mapping weather inputs to energy output values.",
  },
  {
    label: "Prediction Engine",
    desc: "Inference pipeline delivering results in under 100 ms per request.",
  },
  {
    label: "Dashboard",
    desc: "Interactive visualisation and explainability layer for end users.",
  },
];

const OBJECTIVES = [
  "Provide accurate short-term renewable energy generation forecasts for Karnataka.",
  "Demonstrate the practical application of machine learning in the energy sector.",
  "Build an accessible, production-quality interface for energy stakeholders.",
  "Offer explainability so users understand which parameters drive predictions.",
  "Create a foundation for future integration with real-time weather APIs.",
];

const TEAM = [
  {
    name: "Prediction Model",
    role: "ML Engineering",
    contrib:
      "Feature selection, model training, validation pipeline, and hyperparameter optimisation.",
  },
  {
    name: "Data Pipeline",
    role: "Data Engineering",
    contrib:
      "Collection, cleaning, and preparation of historical weather and generation datasets.",
  },
  {
    name: "Frontend",
    role: "UI / UX Engineering",
    contrib:
      "React application architecture, component design, animations, and analytics visualisations.",
  },
  {
    name: "Backend API",
    role: "Systems Engineering",
    contrib:
      "REST API, prediction inference endpoint, and deployment configuration.",
  },
];

const FUTURE = [
  {
    title: "Confidence Intervals",
    body: "Display probabilistic forecast bands so operators can assess uncertainty at a glance.",
  },
  {
    title: "Explainable AI (XAI)",
    body: "SHAP value integration for per-prediction feature attribution, surfaced in the UI.",
  },
  {
    title: "Real-time Weather API",
    body: "Connect to IMD or OpenWeatherMap to auto-populate inputs and run live forecasts.",
  },
  {
    title: "Kannada Voice Support",
    body: "Regional-language voice interface to make the tool accessible to field operators.",
  },
  {
    title: "Advanced Forecast Models",
    body: "Explore LSTM and Transformer architectures for sequence-based multi-step prediction.",
  },
];

function KarnatakaEnergyIllustration() {
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ab-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c3050" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#060f1e" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="ab-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#075985" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="ab-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ab-sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <filter id="ab-glow-f">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="ab-clip">
          <rect width="560" height="240" rx="14" />
        </clipPath>
      </defs>

      <g clipPath="url(#ab-clip)">
        <rect width="560" height="240" fill="url(#ab-bg)" />

        <path
          d="M 80 30 L 140 30 L 140 80 L 200 80"
          stroke="#1e4060"
          strokeWidth="1"
        />
        <path
          d="M 200 80 L 260 80 L 260 40 L 320 40"
          stroke="#1e4060"
          strokeWidth="1"
        />
        <path
          d="M 80 130 L 130 100 L 200 80"
          stroke="#1e4060"
          strokeWidth="0.6"
        />
        <path
          d="M 400 50 L 460 50 L 460 100 L 520 100"
          stroke="#1e4060"
          strokeWidth="1"
        />
        <path
          d="M 380 160 L 440 140 L 480 140 L 520 160"
          stroke="#1e4060"
          strokeWidth="0.6"
        />

        {[
          [80, 30],
          [140, 30],
          [140, 80],
          [200, 80],
          [260, 80],
          [260, 40],
          [320, 40],
          [400, 50],
          [460, 50],
          [460, 100],
          [520, 100],
          [80, 130],
          [380, 160],
          [520, 160],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#0ea5e9" opacity="0.35" />
        ))}

        <path
          d="M220 45 Q248 32 278 44 Q308 32 336 52 Q356 75 350 105 Q345 135 325 152 Q300 168 272 162 Q245 156 230 140 Q210 122 210 98 Q210 65 220 45Z"
          fill="#0ea5e9"
          opacity="0.08"
          stroke="#0ea5e9"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
        <ellipse cx="280" cy="110" rx="80" ry="50" fill="url(#ab-glow)" />

        {[
          [260, 72],
          [290, 95],
          [248, 108],
          [310, 80],
          [272, 130],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <motion.circle
              cx={cx}
              cy={cy}
              r={6}
              fill="#0ea5e9"
              opacity={0}
              animate={{ r: [4, 14], opacity: [0.4, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            />
            <circle cx={cx} cy={cy} r="3.5" fill="#38bdf8" opacity="0.85" />
          </g>
        ))}

        <line
          x1="70"
          y1="200"
          x2="70"
          y2="130"
          stroke="#334155"
          strokeWidth="4"
        />
        <circle cx="70" cy="128" r="5" fill="#475569" />
        <motion.g
          style={{ originX: "70px", originY: "128px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <path d="M70 128 Q77 112 74 92 Q70 108 70 128Z" fill="#64748b" />
          <path d="M70 128 Q55 122 40 130 Q55 132 70 128Z" fill="#64748b" />
          <path d="M70 128 Q78 142 74 162 Q68 146 70 128Z" fill="#64748b" />
        </motion.g>

        <line
          x1="490"
          y1="200"
          x2="490"
          y2="140"
          stroke="#334155"
          strokeWidth="3.5"
        />
        <circle cx="490" cy="138" r="4" fill="#475569" />
        <motion.g
          style={{ originX: "490px", originY: "138px" }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.8,
          }}
        >
          <path
            d="M490 138 Q497 124 494 106 Q490 120 490 138Z"
            fill="#4b5e72"
          />
          <path
            d="M490 138 Q477 132 462 140 Q477 142 490 138Z"
            fill="#4b5e72"
          />
          <path
            d="M490 138 Q497 150 493 168 Q488 154 490 138Z"
            fill="#4b5e72"
          />
        </motion.g>

        <g transform="translate(130, 178) rotate(-10)">
          <rect
            width="60"
            height="40"
            rx="2"
            fill="url(#ab-panel)"
            opacity="0.85"
          />
          {[20, 40].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="40"
              stroke="#7dd3fc"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          ))}
          {[13.3, 26.6].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="60"
              y2={y}
              stroke="#7dd3fc"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          ))}
          <rect width="60" height="5" rx="2" fill="white" opacity="0.07" />
          <line
            x1="30"
            y1="40"
            x2="30"
            y2="55"
            stroke="#475569"
            strokeWidth="2.5"
          />
          <line
            x1="18"
            y1="55"
            x2="42"
            y2="55"
            stroke="#475569"
            strokeWidth="1.5"
          />
        </g>

        <g transform="translate(380, 182) rotate(-10)">
          <rect
            width="60"
            height="40"
            rx="2"
            fill="url(#ab-panel)"
            opacity="0.75"
          />
          {[20, 40].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="40"
              stroke="#7dd3fc"
              strokeWidth="0.5"
              strokeOpacity="0.45"
            />
          ))}
          {[13.3, 26.6].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="60"
              y2={y}
              stroke="#7dd3fc"
              strokeWidth="0.5"
              strokeOpacity="0.45"
            />
          ))}
          <line
            x1="30"
            y1="40"
            x2="30"
            y2="52"
            stroke="#475569"
            strokeWidth="2.5"
          />
          <line
            x1="18"
            y1="52"
            x2="42"
            y2="52"
            stroke="#475569"
            strokeWidth="1.5"
          />
        </g>

        <line
          x1="0"
          y1="200"
          x2="560"
          y2="200"
          stroke="#1e3a5f"
          strokeWidth="1"
          opacity="0.4"
        />

        <circle cx="510" cy="42" r="44" fill="url(#ab-sun-halo)" />
        <motion.circle
          cx="510"
          cy="42"
          r="20"
          fill="#fbbf24"
          filter="url(#ab-glow-f)"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <g transform="translate(18, 210)">
          <rect width="88" height="24" rx="6" fill="#0d1c30" opacity="0.95" />
          <rect
            width="88"
            height="24"
            rx="6"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="0.6"
            opacity="0.4"
          />
          <text
            x="8"
            y="9.5"
            fontSize="6.5"
            fill="#64748b"
            fontFamily="JetBrains Mono, monospace"
          >
            SOLAR CAPACITY
          </text>
          <text
            x="8"
            y="20"
            fontSize="11"
            fill="#38bdf8"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
          >
            3.0 GW
          </text>
        </g>

        <g transform="translate(454, 210)">
          <rect width="88" height="24" rx="6" fill="#0d1c30" opacity="0.95" />
          <rect
            width="88"
            height="24"
            rx="6"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="0.6"
            opacity="0.4"
          />
          <text
            x="8"
            y="9.5"
            fontSize="6.5"
            fill="#64748b"
            fontFamily="JetBrains Mono, monospace"
          >
            WIND CAPACITY
          </text>
          <text
            x="8"
            y="20"
            fontSize="11"
            fill="#fbbf24"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
          >
            5.1 GW
          </text>
        </g>

        <text
          x="280"
          y="192"
          textAnchor="middle"
          fontSize="8.5"
          fill="#38bdf8"
          opacity="0.5"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.08em"
        >
          KARNATAKA · RENEWABLE ENERGY OVERVIEW
        </text>
      </g>
    </svg>
  );
}

function Step({ label, desc, i, total }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-500/10 border-2 border-sky-200 dark:border-sky-500/30 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-sky-500 mono">{i + 1}</span>
        </div>
        {i < total - 1 && (
          <div className="w-px flex-1 mt-1.5 bg-gradient-to-b from-sky-200 dark:from-sky-800 to-transparent" />
        )}
      </div>
      <div className="pb-6">
        <p className="text-sm font-semibold text-slate-800 dark:text-white mb-0.5 font-body">
          {label}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-body">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Hero header */}
        <motion.div
          variants={sectionIn}
          initial="hidden"
          animate="show"
          className="mb-16"
        >
          <p className="label-eyebrow text-sky-500 mb-4 font-body">
            About the project
          </p>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="font-display text-display-lg text-slate-900 dark:text-white mb-5">
                EnerVision
              </h1>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-body text-base">
                An AI-powered renewable energy forecasting platform — combining
                machine learning, energy science, and modern frontend
                engineering to deliver actionable solar generation forecasts for
                Karnataka.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 lg:justify-end">
              {[
                {
                  value: "94%",
                  label: "Model accuracy",
                  color: "text-sky-500",
                },
                {
                  value: "3 GW",
                  label: "Solar capacity tracked",
                  color: "text-amber-500",
                },
                {
                  value: "5 GW",
                  label: "Wind capacity tracked",
                  color: "text-emerald-500",
                },
              ].map(({ value, label, color }) => (
                <div key={label} className="text-center lg:text-right">
                  <p className={`text-2xl font-bold mono ${color}`}>{value}</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-body">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Illustration — full width, clear breathing room */}
        <motion.div
          variants={sectionIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg shadow-sky-500/5"
        >
          <KarnatakaEnergyIllustration />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            {/* Objectives */}
            <motion.section
              variants={sectionIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="font-display text-display-md text-slate-900 dark:text-white mb-6">
                Project Objectives
              </h2>
              <div className="space-y-3">
                {OBJECTIVES.map((obj, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3.5 hover:border-sky-100 dark:hover:border-sky-800/40 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-body">
                      {obj}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Architecture */}
            <motion.section
              variants={sectionIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="font-display text-display-md text-slate-900 dark:text-white mb-6">
                Project Architecture
              </h2>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                {ARCH_STEPS.map((step, i) => (
                  <Step
                    key={step.label}
                    {...step}
                    i={i}
                    total={ARCH_STEPS.length}
                  />
                ))}
              </div>
            </motion.section>

            {/* Team */}
            <motion.section
              variants={sectionIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="font-display text-display-md text-slate-900 dark:text-white mb-6">
                Team Contributions
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {TEAM.map(({ name, role, contrib }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-sm transition-shadow"
                  >
                    <p className="text-sm font-semibold text-slate-800 dark:text-white mb-0.5 font-body">
                      {name}
                    </p>
                    <p className="text-xs font-medium text-sky-500 mb-2 font-body">
                      {role}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-body">
                      {contrib}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <motion.div
            variants={sectionIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="sticky top-24">
              <h2 className="font-display text-display-md text-slate-900 dark:text-white mb-6">
                Future Enhancements
              </h2>
              <div className="space-y-3">
                {FUTURE.map(({ title, body }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-sky-100 dark:hover:border-sky-800/40 transition-colors"
                  >
                    <p className="text-sm font-semibold text-slate-800 dark:text-white mb-1 font-body">
                      {title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-body">
                      {body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
                <p className="label-eyebrow text-slate-400 mb-3 font-body">
                  Tech Stack
                </p>
                {[
                  "React + Vite",
                  "Tailwind CSS",
                  "Framer Motion",
                  "Recharts",
                  "React Router",
                  "Python / scikit-learn",
                  "FastAPI",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-block mr-2 mb-2 text-[10px] font-medium px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-500 dark:text-slate-400 mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
