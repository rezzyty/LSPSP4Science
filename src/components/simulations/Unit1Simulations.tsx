import React, { useState } from 'react';
import { DeepDrillGame } from '../DeepDrillGame/DeepDrillGame';
import { LabSorterGame } from '../LabSorterGame/LabSorterGame';
import { sound } from '../../utils/soundManager';
import { Sun, Compass, Globe, CloudRain, Flame, Trees, Sparkles, AlertTriangle } from 'lucide-react';

export const Unit1Simulations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'drill' | 'ch1lab' | 'ch2orbit' | 'ch3climate'>('drill');

  // Chapter 2 Interactive Simulation State: Torch & Globe
  const [earthRotationAngle, setEarthRotationAngle] = useState<number>(0); // 0 to 360 deg
  const [timeOfDay, setTimeOfDay] = useState<number>(12); // hour 0 to 24

  // Chapter 3 Interactive Simulation State: Greenhouse Gas & Global Warming
  const [fuelUsage, setFuelUsage] = useState<number>(65); // 0 to 100
  const [hasTreePlanting, setHasTreePlanting] = useState<boolean>(true);
  const [publicTransportRatio, setPublicTransportRatio] = useState<number>(70);

  // Computed climate temperature rise
  const computedTempRise = Math.max(0.5, (fuelUsage * 0.04 - (hasTreePlanting ? 0.8 : 0) - publicTransportRatio * 0.015)).toFixed(1);
  const seaLevelRiseMm = Math.round(Number(computedTempRise) * 120);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Simulation Selector Subnav */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-md">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('drill');
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'drill'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Ch 1: Sub-Terra Core Drill (60fps)</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('ch1lab');
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'ch1lab'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Ch 1: Rock & Soil Lab (5 Stations)</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('ch2orbit');
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'ch2orbit'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>Ch 2: Torch & Globe Day/Night Simulator</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('ch3climate');
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'ch3climate'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <CloudRain className="w-4 h-4" />
          <span>Ch 3: Greenhouse Warming Simulator</span>
        </button>
      </div>

      {/* Render Active Lab */}
      <div>
        {activeTab === 'drill' && <DeepDrillGame language="en" />}
        {activeTab === 'ch1lab' && <LabSorterGame language="en" />}

        {/* Chapter 2 Simulator: Torch & Globe Rotation & Sundial */}
        {activeTab === 'ch2orbit' && (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-400" />
                <span>Chapter 2: Earth Rotation & Sundial Shadow Simulation</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Rotate the globe to observe how Earth’s 24-hour rotation causes day and night in Hong Kong and changes shadow lengths from morning to noon!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Visual Simulation Display */}
              <div className="h-72 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-col items-center justify-between relative overflow-hidden">
                {/* Sun Torch on Left */}
                <div className="absolute top-1/2 -translate-y-1/2 left-3 flex flex-col items-center z-10">
                  <div className="w-12 h-12 rounded-full bg-amber-400 shadow-amber-400/50 shadow-2xl flex items-center justify-center text-xl animate-pulse">
                    ☀️
                  </div>
                  <span className="text-[10px] font-bold text-amber-300 mt-1">Sun Torch</span>
                </div>

                {/* Light Rays */}
                <div className="absolute top-1/2 -translate-y-1/2 left-16 right-48 h-28 bg-gradient-to-r from-amber-400/25 to-transparent pointer-events-none" />

                {/* Rotating Globe Center */}
                <div className="relative flex items-center justify-center my-auto">
                  <div
                    className="w-40 h-40 rounded-full border-2 border-cyan-500/40 shadow-2xl bg-gradient-to-tr from-blue-900 via-emerald-800 to-cyan-600 relative overflow-hidden transition-transform duration-150"
                    style={{ transform: `rotate(${earthRotationAngle}deg)` }}
                  >
                    {/* Shadow overlay on dark side */}
                    <div className="absolute inset-y-0 right-0 w-1/2 bg-slate-950/75 pointer-events-none" />

                    {/* Hong Kong marker */}
                    <div className="absolute top-10 left-10 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-rose-500 border-2 border-white shadow animate-ping" />
                      <span className="text-[10px] font-black text-white bg-slate-900/80 px-1 rounded shadow">
                        Hong Kong
                      </span>
                    </div>

                    {/* Axis line */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-yellow-300/40 rotate-[23.5deg]" />
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="w-full flex items-center justify-between text-xs px-2 z-10 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-300">
                    Status in Hong Kong:{' '}
                    <strong className={earthRotationAngle % 360 < 180 ? 'text-amber-300' : 'text-cyan-400'}>
                      {earthRotationAngle % 360 < 180 ? '☀️ Daytime (Faces Sun)' : '🌙 Night-time (Away from Sun)'}
                    </strong>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">
                    Hour: {Math.floor((earthRotationAngle / 360) * 24)}:00
                  </span>
                </div>
              </div>

              {/* Controls and Shadow Observations */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <label className="text-xs font-bold text-white block">
                    Rotate Earth (0° to 360°):
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={earthRotationAngle}
                    onChange={(e) => setEarthRotationAngle(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Sunrise (East)</span>
                    <span>Noon (Overhead)</span>
                    <span>Sunset (West)</span>
                    <span>Midnight</span>
                  </div>
                </div>

                {/* Sundial & Shadow Inspector */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-amber-300 block">
                    Sundial Shadow Analysis:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    • <strong>Morning:</strong> Sun is low in the east; shadows are long and point WEST.
                    <br />
                    • <strong>Noon:</strong> Sun reaches highest point; shadows become the SHORTEST.
                    <br />
                    • <strong>Afternoon:</strong> Sun sets towards the west; shadows lengthen and point EAST.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chapter 3 Simulator: Greenhouse Gases & Climate Action */}
        {activeTab === 'ch3climate' && (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-400" />
                <span>Chapter 3: Greenhouse Effect & Carbon Footprint Simulation</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Adjust human fuel consumption and green actions to observe global temperature and sea level consequences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Climate Thermometer & Sea Level Display */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Global Temperature Rise:</span>
                  <span className="text-xl font-black text-rose-400 font-mono">
                    +{computedTempRise} °C
                  </span>
                </div>

                {/* Visual Thermometer Bar */}
                <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600 transition-all duration-300"
                    style={{ width: `${Math.min(100, Number(computedTempRise) * 25)}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Sea Level Rise:</span>
                    <span className="text-base font-bold text-cyan-400 font-mono">
                      +{seaLevelRiseMm} mm
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Extreme Heat Days:</span>
                    <span className="text-base font-bold text-amber-400 font-mono">
                      +{Math.round(Number(computedTempRise) * 9)} days/yr
                    </span>
                  </div>
                </div>

                {Number(computedTempRise) > 2.0 && (
                  <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-700 text-rose-200 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>Warning: Severe threat of melting glaciers, storm surges, and coastal flooding!</span>
                  </div>
                )}
              </div>

              {/* Climate Action Sliders */}
              <div className="space-y-4 text-xs">
                {/* Fossil Fuel usage */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-200">Fossil Fuel Usage (Gas, Coal & Oil):</span>
                    <span className="font-mono text-amber-400 font-bold">{fuelUsage}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={fuelUsage}
                    onChange={(e) => setFuelUsage(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                {/* Public Transport */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-200">Public Transport & Walking Ratio:</span>
                    <span className="font-mono text-emerald-400 font-bold">{publicTransportRatio}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={publicTransportRatio}
                    onChange={(e) => setPublicTransportRatio(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Tree planting toggle */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trees className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-slate-200">Protect Forests & Plant Trees</span>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setHasTreePlanting(!hasTreePlanting);
                    }}
                    className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                      hasTreePlanting ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {hasTreePlanting ? 'Active (Absorbs CO2)' : 'Disabled'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
