import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../context/ThemeContext";
import {
  dailySeries,
  confidenceDistribution,
  sourceBreakdown,
  kpiCards,
  forecastSeries,
} from "../data/mockData";
import { TbSun, TbWind, TbDroplet, TbBolt, TbTrendingUp } from "react-icons/tb";

const COLORS = ["#0ea5e9", "#f59e0b", "#10b981", "#8b5cf6"];

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-5">
        <p className="text-sm font-bold text-slate-900 dark:text-white font-display">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-0.5 font-body">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

const KPI_ICONS = [TbBolt, TbSun, TbTrendingUp, TbWind];
const KPI_COLORS = [
  {
    bg: "bg-sky-50 dark:bg-sky-500/10",
    icon: "text-sky-500",
    border: "border-sky-100 dark:border-sky-500/20",
  },
  {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    icon: "text-amber-500",
    border: "border-amber-100 dark:border-amber-500/20",
  },
  {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    icon: "text-emerald-500",
    border: "border-emerald-100 dark:border-emerald-500/20",
  },
  {
    bg: "bg-violet-50 dark:bg-violet-500/10",
    icon: "text-violet-500",
    border: "border-violet-100 dark:border-violet-500/20",
  },
];

function KpiCard({ label, value, delta, up, index }) {
  const Icon = KPI_ICONS[index % KPI_ICONS.length];
  const c = KPI_COLORS[index % KPI_COLORS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className={`bg-white dark:bg-slate-900 border ${c.border} border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
    >
      <div
        className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center mb-4`}
      >
        <Icon className={`text-lg ${c.icon}`} />
      </div>
      <p className="text-xs text-slate-400 mb-1.5 font-body">{label}</p>
      <p className="text-2xl font-bold mono text-slate-900 dark:text-white mb-1 font-display">
        {value}
      </p>
      {delta && (
        <p
          className={`text-xs font-medium font-body ${up === true ? "text-emerald-500" : up === false ? "text-red-400" : "text-slate-400"}`}
        >
          {up !== null && (up ? "↑ " : "↓ ")}
          {delta}
        </p>
      )}
    </motion.div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-slate-600 dark:text-slate-300 mb-1.5 font-display">
        {label}
      </p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="text-slate-500 font-body">{p.name}:</span>
          <span className="font-medium text-slate-700 dark:text-slate-200 mono">
            {p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function AnalyticsBanner() {
  return (
    <svg
      viewBox="0 0 900 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="an-bg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0c3050" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#0a2440" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#0c3050" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="an-line1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
          <stop offset="30%" stopColor="#0ea5e9" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="an-line2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
          <stop offset="20%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>
        <clipPath id="an-clip">
          <rect width="900" height="120" />
        </clipPath>
      </defs>
      <g clipPath="url(#an-clip)">
        <rect width="900" height="120" fill="url(#an-bg)" />

        {/* Generation sparkline */}
        <motion.path
          d="M 0 90 Q 60 85 100 70 Q 140 55 180 40 Q 220 28 260 32 Q 300 36 340 50 Q 380 64 420 75 Q 460 85 500 68 Q 540 50 580 35 Q 620 22 660 30 Q 700 38 740 55 Q 780 70 820 60 Q 860 50 900 45"
          stroke="url(#an-line1)"
          strokeWidth="2"
          fill="none"
          animate={{ strokeDashoffset: [0, -80] }}
          style={{ strokeDasharray: "6 4" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* GHI sparkline */}
        <motion.path
          d="M 0 100 Q 80 95 120 80 Q 160 65 200 48 Q 240 33 280 38 Q 320 44 360 58 Q 400 72 440 82 Q 480 90 520 72 Q 560 54 600 38 Q 640 25 680 34 Q 720 44 760 62 Q 800 78 840 66 Q 870 55 900 50"
          stroke="url(#an-line2)"
          strokeWidth="1.5"
          fill="none"
          animate={{ strokeDashoffset: [0, -80] }}
          style={{ strokeDasharray: "4 6" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Data points */}
        {[
          [180, 40],
          [380, 50],
          [580, 35],
          [780, 60],
        ].map(([x, y], i) => (
          <g key={i}>
            <motion.circle
              cx={x}
              cy={y}
              r="4"
              fill="#0ea5e9"
              opacity="0"
              animate={{ r: [3, 9], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
            <circle cx={x} cy={y} r="3" fill="#0ea5e9" opacity="0.85" />
          </g>
        ))}

        {/* Mini bar chart — right section */}
        {[72, 85, 60, 92, 78, 88, 65].map((h, i) => (
          <rect
            key={i}
            x={680 + i * 22}
            y={110 - h * 0.8}
            width="14"
            height={h * 0.8}
            rx="2"
            fill="#0ea5e9"
            opacity={0.15 + (i / 7) * 0.35}
          />
        ))}

        {/* Stats */}
        <text
          x="40"
          y="32"
          fontSize="9"
          fill="#64748b"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.06em"
        >
          GENERATION TREND
        </text>
        <text
          x="40"
          y="52"
          fontSize="18"
          fill="#38bdf8"
          fontWeight="600"
          fontFamily="JetBrains Mono, monospace"
        >
          248 kWh
        </text>
        <text
          x="40"
          y="66"
          fontSize="8"
          fill="#22c55e"
          fontFamily="JetBrains Mono, monospace"
        >
          ↑ 12% vs last week
        </text>

        <text
          x="310"
          y="32"
          fontSize="9"
          fill="#64748b"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.06em"
        >
          AVG GHI
        </text>
        <text
          x="310"
          y="52"
          fontSize="18"
          fill="#fbbf24"
          fontWeight="600"
          fontFamily="JetBrains Mono, monospace"
        >
          724 W/m²
        </text>

        <text
          x="510"
          y="32"
          fontSize="9"
          fill="#64748b"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.06em"
        >
          MODEL ACCURACY
        </text>
        <text
          x="510"
          y="52"
          fontSize="18"
          fill="#a78bfa"
          fontWeight="600"
          fontFamily="JetBrains Mono, monospace"
        >
          94.2%
        </text>
      </g>
    </svg>
  );
}

const TABS = ["Overview", "Parameters", "Distribution"];

export default function Analytics() {
  const { isDark } = useTheme();
  const [tab, setTab] = useState("Overview");

  const gridColor = isDark ? "#1a2540" : "#f1f5f9";
  const axisColor = isDark ? "#475569" : "#94a3b8";

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="label-eyebrow text-sky-500 mb-3 font-body">Dashboard</p>
          <h1 className="font-display text-display-md text-slate-900 dark:text-white mb-3">
            Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-body">
            Explore renewable energy forecast trends, parameter behaviour, and
            generation distributions.
          </p>
        </motion.div>

        {/* Banner illustration */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <AnalyticsBanner />
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-slate-100 dark:bg-slate-900 rounded-xl p-1 w-fit border border-slate-200 dark:border-slate-800">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all font-body ${
                tab === t
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {kpiCards.map((k, i) => (
            <KpiCard key={k.label} {...k} index={i} />
          ))}
        </div>

        {tab === "Overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-7"
          >
            <ChartCard
              title="30-Day Generation Trend"
              subtitle="Daily solar energy generation (kWh)"
            >
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart
                  data={dailySeries}
                  margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
                >
                  <defs>
                    <linearGradient id="dayGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColor}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 10, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                    interval={4}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                    unit=" kWh"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="generation"
                    name="Generation"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    fill="url(#dayGrad)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="grid lg:grid-cols-2 gap-7">
              <ChartCard
                title="Generation Mix"
                subtitle="Estimated contribution by renewable source"
              >
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie
                        data={sourceBreakdown}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={44}
                        outerRadius={72}
                        paddingAngle={3}
                      >
                        {sourceBreakdown.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2 text-xs">
                    {sourceBreakdown.map((s, i) => (
                      <div key={s.name} className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-sm shrink-0"
                          style={{ background: COLORS[i] }}
                        />
                        <span className="text-slate-500 dark:text-slate-400 font-body">
                          {s.name}
                        </span>
                        <span className="ml-auto font-semibold text-slate-700 dark:text-slate-300 mono">
                          {s.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ChartCard>

              <ChartCard
                title="Today's Generation Profile"
                subtitle="Hour-by-hour forecast (Wh)"
              >
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart
                    data={forecastSeries.slice(0, 10)}
                    margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={gridColor}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 9, fill: axisColor }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 9, fill: axisColor }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="generation"
                      name="Output (Wh)"
                      fill="#0ea5e9"
                      radius={[3, 3, 0, 0]}
                      maxBarSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </motion.div>
        )}

        {tab === "Parameters" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-7"
          >
            <ChartCard
              title="GHI Trend (30 days)"
              subtitle="Daily peak Global Horizontal Irradiance (W/m²)"
            >
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={dailySeries}
                  margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColor}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 10, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                    interval={4}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="ghi"
                    name="GHI (W/m²)"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="grid lg:grid-cols-2 gap-7">
              <ChartCard
                title="Temperature Trend"
                subtitle="Daily ambient temperature (°C)"
              >
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart
                    data={dailySeries}
                    margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
                  >
                    <defs>
                      <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.18}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={gridColor}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 9, fill: axisColor }}
                      axisLine={false}
                      tickLine={false}
                      interval={5}
                    />
                    <YAxis
                      tick={{ fontSize: 9, fill: axisColor }}
                      axisLine={false}
                      tickLine={false}
                      unit="°"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="temp"
                      name="Temp (°C)"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#tempGrad)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard
                title="Humidity Trend"
                subtitle="Daily relative humidity (%)"
              >
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart
                    data={dailySeries}
                    margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
                  >
                    <defs>
                      <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.18}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={gridColor}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 9, fill: axisColor }}
                      axisLine={false}
                      tickLine={false}
                      interval={5}
                    />
                    <YAxis
                      tick={{ fontSize: 9, fill: axisColor }}
                      axisLine={false}
                      tickLine={false}
                      unit="%"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="humidity"
                      name="Humidity (%)"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fill="url(#humGrad)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </motion.div>
        )}

        {tab === "Distribution" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-7"
          >
            <ChartCard
              title="Forecast Confidence Distribution"
              subtitle="Number of forecasts by confidence range"
            >
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={confidenceDistribution}
                  margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColor}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 11, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="count"
                    name="Forecasts"
                    fill="#0ea5e9"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard
              title="GHI vs. Generation Correlation"
              subtitle="Shows how irradiance drives generation output"
            >
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={forecastSeries}
                  margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColor}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 10, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="ghi"
                    name="GHI (W/m²)"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="generation"
                    name="Generation (Wh)"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}
