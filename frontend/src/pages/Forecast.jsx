import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeatherForm from "../components/WeatherForm";
import ResultCard from "../components/ResultCard";
import ConfidenceCard from "../components/ConfidenceCard";
import ExplanationCard from "../components/ExplanationCard";
import ForecastChart from "../components/ForecastChart";
import { explanations, forecastSeries } from "../data/mockData";
import {
  TbSun,
  TbInfoCircle,
  TbArrowRight,
  TbDroplet,
  TbThermometer,
} from "react-icons/tb";
import axios from "axios";

function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-1.5 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-sky-400"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function EmptyStateIllustration() {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-40 h-24 mx-auto"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="es-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id="es-sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="es-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#075985" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#es-sky)" />
      {/* Sun halo */}
      <circle cx="160" cy="28" r="28" fill="url(#es-sun-halo)" />
      {/* Sun */}
      <motion.circle
        cx="160"
        cy="28"
        r="12"
        fill="#fbbf24"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line
          key={i}
          x1={160 + Math.cos((angle * Math.PI) / 180) * 15}
          y1={28 + Math.sin((angle * Math.PI) / 180) * 15}
          x2={160 + Math.cos((angle * Math.PI) / 180) * 22}
          y2={28 + Math.sin((angle * Math.PI) / 180) * 22}
          stroke="#fbbf24"
          strokeWidth="1.2"
          strokeLinecap="round"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
      {/* Ground */}
      <rect x="0" y="95" width="200" height="25" fill="#0f2744" opacity="0.3" />
      <line
        x1="0"
        y1="95"
        x2="200"
        y2="95"
        stroke="#1e3a5f"
        strokeWidth="0.5"
        opacity="0.5"
      />
      {/* Panel */}
      <g transform="translate(28, 68) rotate(-15)">
        <rect width="50" height="34" rx="2" fill="url(#es-panel)" />
        {[16.6, 33.3].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="34"
            stroke="#bae6fd"
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        ))}
        {[11.3, 22.6].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="50"
            y2={y}
            stroke="#bae6fd"
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        ))}
        <line
          x1="25"
          y1="34"
          x2="25"
          y2="46"
          stroke="#334155"
          strokeWidth="2"
        />
        <line
          x1="14"
          y1="46"
          x2="36"
          y2="46"
          stroke="#334155"
          strokeWidth="1.5"
        />
      </g>
      {/* Dashed arrow / prompt */}
      <motion.path
        d="M 96 60 Q 110 50 124 60"
        stroke="#38bdf8"
        strokeWidth="1"
        strokeDasharray="3 4"
        fill="none"
        strokeLinecap="round"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </svg>
  );
}

const QUICK_TIPS = [
  {
    Icon: TbSun,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    tip: "Try GHI around 800 W/m² to simulate a clear midday in Karnataka.",
  },
  {
    Icon: TbThermometer,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    tip: "Temperatures between 25–32°C are typical across most Karnataka districts.",
  },
  {
    Icon: TbDroplet,
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-500/10",
    tip: "Summer months average 40–60% humidity; monsoon season can reach 90%.",
  },
];

export default function Forecast() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ts, setTs] = useState(null);

  const handlePredict = async (params) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post("http://localhost:5000/api/predict", {
        ghi: params.ghi,
        temperature: params.temp,
        humidity: params.humidity,
      });

      const now = new Date();

      const formatted = now.toLocaleString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      setTs(formatted);

      setResult({
        energy: Number(response.data.prediction),
        confidence: response.data.confidence,
      });
    } catch (err) {
      console.error("Prediction failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <p className="label-eyebrow text-sky-500 mb-3 font-body">
            Prediction Engine
          </p>
          <h1 className="font-display text-display-md text-slate-900 dark:text-white mb-4">
            Energy Forecast
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-body">
            Set current weather conditions below to generate a machine-learning
            prediction of solar energy output for a typical Karnataka
            installation.
          </p>
        </motion.div>

        {/* Beginner guide bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center gap-3 mb-9 bg-sky-50 dark:bg-sky-500/8 border border-sky-100 dark:border-sky-500/15 rounded-xl px-5 py-4"
        >
          <TbInfoCircle className="text-sky-500 shrink-0 text-lg" />
          <p className="text-xs text-sky-700 dark:text-sky-300 font-body">
            <strong className="font-semibold">New here?</strong> Adjust the
            three sliders on the left to match your conditions, then click
            "Generate Forecast" to receive a prediction.
          </p>
          <span className="ml-auto text-xs text-sky-500 flex items-center gap-1 font-body font-medium cursor-default">
            3 inputs needed <TbArrowRight className="text-sm" />
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-7">
          {/* Left — input */}
          <div className="lg:col-span-2 space-y-5">
            <WeatherForm onPredict={handlePredict} />

            {/* Contextual insight */}
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4">
              <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mb-1.5 font-body uppercase tracking-wide">
                Quick insight
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed font-body">
                GHI above 600 W/m² typically corresponds to clear-sky conditions
                in Karnataka between 10 AM and 2 PM.
              </p>
            </div>
          </div>

          {/* Right — output */}
          <div className="lg:col-span-3 space-y-5">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center gap-4 min-h-[220px]"
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <TbSun className="text-2xl text-sky-400" />
                  </motion.div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-body">
                    Running prediction model…
                  </p>
                  <LoadingDots />
                </motion.div>
              )}

              {!loading && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <ResultCard energy={result.energy} generatedAt={ts} />
                    <ConfidenceCard confidence={result.confidence} />
                  </div>
                  <ExplanationCard explanations={explanations} />
                  <ForecastChart
                    data={forecastSeries}
                    title="Typical Daily Generation Profile"
                    subtitle="Hourly pattern for a clear-sky day in Karnataka (reference)"
                  />
                </motion.div>
              )}

              {!loading && !result && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Empty state with illustration */}
                  <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/80 dark:to-slate-900 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4">
                    <EmptyStateIllustration />
                    <div>
                      <p className="font-display text-lg text-slate-700 dark:text-slate-200 mb-2">
                        Your forecast will appear here
                      </p>
                      <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-body">
                        Adjust the weather parameters on the left, then click
                        "Generate Forecast" to receive a prediction.
                      </p>
                    </div>
                  </div>

                  {/* Beginner tips */}
                  <div className="grid grid-cols-3 gap-3">
                    {QUICK_TIPS.map(({ Icon, color, bg, tip }) => (
                      <div
                        key={tip}
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-4 text-center"
                      >
                        <div
                          className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mx-auto mb-2.5`}
                        >
                          <Icon className={`text-lg ${color}`} />
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-body">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
