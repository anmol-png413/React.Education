import React, { useState } from "react";
import {
  Globe2,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";

/* ---------------------- DATA ---------------------- */

const countryColors = {
  China: "#10b981",
  Bangladesh: "#ef4444",
  Indonesia: "#3b82f6",
  India: "#f59e0b",
  Pakistan: "#8b5cf6",
  Yemen: "#84cc16",
  Nigeria: "#f97316",
  Sudan: "#ec4899",
  Japan: "#06b6d4",
  Egypt: "#f87171",
};

const applicationData = [
  {
    year: "2020",
    China: 19202,
    Bangladesh: 3992,
    Indonesia: 3618,
    India: 1500,
    Pakistan: 1200,
    Yemen: 1100,
    Nigeria: 950,
    Sudan: 800,
    Japan: 750,
    Egypt: 650,
  },
  {
    year: "2021",
    China: 19202,
    Bangladesh: 3300,
    Indonesia: 3100,
    India: 2800,
    Pakistan: 2200,
    Yemen: 1900,
    Nigeria: 1500,
    Sudan: 1300,
    Japan: 1100,
    Egypt: 900,
  },
  {
    year: "2022",
    China: 21975,
    Bangladesh: 3992,
    Indonesia: 3618,
    India: 3200,
    Pakistan: 2600,
    Yemen: 2100,
    Nigeria: 1700,
    Sudan: 1400,
    Japan: 1200,
    Egypt: 1000,
  },
  {
    year: "2023",
    China: 26627,
    Bangladesh: 6574,
    Indonesia: 4309,
    India: 4200,
    Pakistan: 3400,
    Yemen: 2700,
    Nigeria: 2200,
    Sudan: 1850,
    Japan: 1500,
    Egypt: 1200,
  },
  {
    year: "2024",
    China: 33216,
    Bangladesh: 6917,
    Indonesia: 5556,
    India: 5200,
    Pakistan: 4300,
    Yemen: 3500,
    Nigeria: 2900,
    Sudan: 2400,
    Japan: 2000,
    Egypt: 1600,
  },
];

/* ---------------------- SUB-COMPONENTS ---------------------- */

function CountryLegend({ selectedCountries, onToggleCountry }) {
  const countries = Object.keys(countryColors);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter series to show"
          className="w-full px-4 py-2 text-sm sm:text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/80"
        />
      </div>
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {countries.map((country) => (
          <button
            key={country}
            onClick={() => onToggleCountry(country)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:bg-slate-50 shadow-sm ${
              selectedCountries.includes(country)
                ? "opacity-100 bg-slate-50"
                : "opacity-40"
            }`}
          >
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow"
              style={{ backgroundColor: countryColors[country] }}
            />
            <span className="text-slate-700">{country}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StackedBarChart({ data, selectedCountries }) {
  const [hoverInfo, setHoverInfo] = useState(null);

  const maxTotal = Math.max(
    ...data.map((yearData) => {
      return selectedCountries.reduce((sum, country) => {
        const value = yearData[country];
        return sum + (typeof value === "number" ? value : 0);
      }, 0);
    })
  );

  const yAxisMax = Math.ceil(maxTotal / 10000) * 10000;
  const yAxisSteps = 6;
  const yAxisInterval = yAxisMax / (yAxisSteps - 1);
  const chartHeight = 320; // chart box (bars) height
  const xAxisLabelHeight = 36; // space for year labels

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] flex gap-4">
        {/* Y-Axis Labels */}
        <div
          style={{ width: "60px" }}
          className="flex flex-col justify-between pt-0 pb-6 text-[10px] sm:text-xs text-slate-600 font-medium"
        >
          {Array.from({ length: yAxisSteps }).map((_, i) => {
            const value = yAxisMax - i * yAxisInterval;
            return (
              <div key={i} className="text-right h-0">
                {Math.round(value / 1000)}k
              </div>
            );
          })}
        </div>

        {/* Chart + X axis labels */}
        <div className="flex-1">
          <div
            className="relative"
            style={{ height: chartHeight + xAxisLabelHeight }}
          >
            {/* Chart box with axis & grid */}
            <div
              className="absolute inset-x-0 top-0 border-l-2 border-b-2 border-slate-200 bg-white/40 rounded-xl rounded-b-none"
              style={{ height: chartHeight }}
            >
              {/* Horizontal Grid Lines */}
              {Array.from({ length: yAxisSteps - 1 }).map((_, i) => (
                <div
                  key={`grid-${i}`}
                  className="absolute w-full border-t border-slate-100"
                  style={{
                    top: `${(i / (yAxisSteps - 1)) * 100}%`,
                  }}
                />
              ))}

              {/* Tooltip (global) */}
              {hoverInfo && (
                <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-xs sm:text-sm rounded-lg px-3 py-2 shadow-lg z-20">
                  <div className="font-semibold flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: countryColors[hoverInfo.country] }}
                    />
                    {hoverInfo.country}
                  </div>
                  <div className="text-[11px] opacity-80">
                    Year: {hoverInfo.year}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm">
                    {hoverInfo.value.toLocaleString()} applications
                  </div>
                </div>
              )}

              {/* Bars */}
              <div className="absolute inset-0 flex items-end px-2 pb-6 gap-3">
                {data.map((yearData) => {
                  const total = selectedCountries.reduce((sum, country) => {
                    const value = yearData[country];
                    return sum + (typeof value === "number" ? value : 0);
                  }, 0);

                  const heightPercent = (total / yAxisMax) * 100;

                  return (
                    <div
                      key={yearData.year}
                      className="flex-1 h-full flex flex-col items-center justify-end"
                    >
                      <div
                        className="w-full relative rounded-t-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-slate-100/60"
                        style={{
                          height: `${heightPercent}%`,
                          minHeight: "30px",
                        }}
                      >
                        {selectedCountries.map((country, idx) => {
                          const value = yearData[country];
                          const numValue =
                            typeof value === "number" ? value : 0;
                          const segmentHeight = total
                            ? (numValue / total) * 100
                            : 0;

                          return (
                            <div
                              key={`${yearData.year}-${country}-${idx}`}
                              className="w-full relative transition-all hover:brightness-110 cursor-pointer"
                              style={{
                                height: `${segmentHeight}%`,
                                backgroundColor: countryColors[country],
                                minHeight: segmentHeight > 5 ? "4px" : "0px",
                              }}
                              title={`${country}: ${numValue.toLocaleString()}`}
                              onMouseEnter={() =>
                                setHoverInfo({
                                  country,
                                  year: yearData.year,
                                  value: numValue,
                                })
                              }
                              onMouseLeave={() => setHoverInfo(null)}
                            >
                              {segmentHeight > 14 && numValue > 1500 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-white font-bold text-[10px] sm:text-xs drop-shadow">
                                    {numValue.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-Axis Year Labels */}
            <div className="absolute inset-x-0 bottom-0 h-[36px] flex items-center px-2 gap-3">
              <div className="flex-1 flex gap-3">
                {data.map((yearData) => (
                  <div
                    key={yearData.year}
                    className="flex-1 text-center text-[11px] sm:text-xs font-semibold text-slate-700"
                  >
                    {yearData.year}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartSection({ selectedCountries }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 sm:p-8 mb-6 sm:mb-10">
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 text-center">
        Application Volume by Year & Country
      </h3>
      <StackedBarChart data={applicationData} selectedCountries={selectedCountries} />
    </div>
  );
}

function StatsGrid() {
  const stats = [
    {
      icon: Users,
      label: "Total Applications",
      value: "175,000+",
      change: "+24% from 2020",
      color: "emerald",
    },
    {
      icon: Globe2,
      label: "Countries",
      value: "10",
      change: "Top source countries",
      color: "blue",
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: "173%",
      change: "2020–2024 period",
      color: "amber",
    },
    {
      icon: Award,
      label: "Leading Source Country",
      value: "China",
      change: "33,216 in 2024",
      color: "rose",
    },
  ];

  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    amber: "bg-amber-100 text-amber-600",
    rose: "bg-rose-100 text-rose-600",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 sm:p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl shadow-inner ${
                  colorClasses[stat.color]
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-600 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {stat.change}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------- MAIN EXPORTED COMPONENT ---------------------- */

export default function TopCountriesApplicationsSection() {
  const [selectedCountries, setSelectedCountries] = useState([
    "China",
    "Bangladesh",
    "Indonesia",
    "India",
    "Pakistan",
    "Yemen",
    "Nigeria",
    "Sudan",
    "Japan",
    "Egypt",
  ]);

  // Calculate total applications for subtitle
  const totalApplications = applicationData.reduce((sum, year) => {
    const yearTotal = Object.keys(countryColors).reduce((acc, country) => {
      const value = year[country];
      return acc + (typeof value === "number" ? value : 0);
    }, 0);
    return sum + yearTotal;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header / Hero Section */}
      <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl mb-3 sm:mb-4 shadow-lg">
              <Globe2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-3 px-4">
              Where do these students{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                come from?
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto px-4">
              Top 10 Highest Application Countries for New Applications Received
              (2020 – 2024)
            </p>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              {totalApplications.toLocaleString()} total applications across{" "}
              {applicationData[0] ? Object.keys(countryColors).length : 0}{" "}
              source countries
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Filters */}
        <CountryLegend
          selectedCountries={selectedCountries}
          onToggleCountry={(country) => {
            setSelectedCountries((prev) =>
              prev.includes(country)
                ? prev.filter((c) => c !== country)
                : [...prev, country]
            );
          }}
        />

        {/* Chart */}
        <ChartSection selectedCountries={selectedCountries} />

        {/* Stats / Summary */}
        <StatsGrid />
      </main>
    </div>
  );
}