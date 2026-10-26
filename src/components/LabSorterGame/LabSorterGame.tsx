import React, { useState } from 'react';
import { Language, RockType, SoilType } from '../../types/game';
import { EARTH_LAYERS, ROCKS_DATA, SOIL_DATA } from '../../data/chapter1Data';
import { sound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import {
  Layers,
  Activity,
  Flame,
  Droplet,
  Mountain,
  Sprout,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface LabSorterGameProps {
  language: Language;
}

export const LabSorterGame: React.FC<LabSorterGameProps> = ({ language }) => {
  const isEn = language === 'en';
  const [activeStation, setActiveStation] = useState<'layers' | 'tectonics' | 'rocks' | 'soil' | 'geopark'>('layers');

  // Station 1: Layers Sorter State
  const [selectedDirection, setSelectedDirection] = useState<'outside-in' | 'inside-out'>('outside-in');
  const [layerSlots, setLayerSlots] = useState<(string | null)[]>([null, null, null]);
  const [layerFeedback, setLayerFeedback] = useState<string | null>(null);

  // Station 2: Tectonic & Volcano State
  const [plateDistance, setPlateDistance] = useState<number>(100); // 100 = apart, 0 = collided
  const [isCollided, setIsCollided] = useState<boolean>(false);

  // Station 3: Rock Forge State
  const [activeRockId, setActiveRockId] = useState<string>('granite');
  const [rockQuizSubmitted, setRockQuizSubmitted] = useState<boolean>(false);
  const [rockSelectedType, setRockSelectedType] = useState<RockType | null>(null);

  // Station 4: Soil Drainage Lab State
  const [isWaterPouring, setIsWaterPouring] = useState<boolean>(false);
  const [waterLevels, setWaterLevels] = useState<{ sandy: number; loam: number; clay: number }>({
    sandy: 0,
    loam: 0,
    clay: 0
  });
  const [plantMatches, setPlantMatches] = useState<{ cactus: SoilType | null; rose: SoilType | null }>({
    cactus: null,
    rose: null
  });

  // Station 5: Geopark Patrol State
  const [geoparkDecisions, setGeoparkDecisions] = useState<Record<number, boolean | null>>({});

  // Reset Station 1
  const handleLayerDrop = (slotIdx: number, layerId: string) => {
    sound.playClick();
    const next = [...layerSlots];
    next[slotIdx] = layerId;
    setLayerSlots(next);

    if (next.every((x) => x !== null)) {
      checkLayerAnswer(next, selectedDirection);
    }
  };

  const checkLayerAnswer = (slots: (string | null)[], dir: 'outside-in' | 'inside-out') => {
    const correctOrder = dir === 'outside-in' ? ['crust', 'mantle', 'core'] : ['core', 'mantle', 'crust'];
    const isCorrect = slots.every((s, i) => s === correctOrder[i]);

    if (isCorrect) {
      sound.playCorrect();
      confetti({ particleCount: 80, spread: 60 });
      setLayerFeedback(
        isEn
          ? `Correct! ${dir === 'outside-in' ? 'Crust → Mantle → Core' : 'Core → Mantle → Crust'}`
          : `排列完全正確！${dir === 'outside-in' ? '由外至內：地殼 → 地幔 → 地核' : '由內至外：地核 → 地幔 → 地殼'}`
      );
    } else {
      sound.playWrong();
      setLayerFeedback(
        isEn
          ? `Not quite right! Remember: ${dir === 'outside-in' ? 'Outermost is Crust, innermost is Core' : 'Innermost is Core, outermost is Crust'}`
          : `順序有誤！請記住：${dir === 'outside-in' ? '最外層是地殼，中心是地核' : '最中心是地核，最外層是地殼'}`
      );
    }
  };

  // Station 2 Collision trigger
  const handlePlateSlider = (val: number) => {
    setPlateDistance(val);
    if (val <= 10 && !isCollided) {
      setIsCollided(true);
      sound.playRumble();
    } else if (val > 10 && isCollided) {
      setIsCollided(false);
    }
  };

  // Station 4 Water Pour simulation
  const startWaterExperiment = () => {
    sound.playWaterDrip();
    setIsWaterPouring(true);
    setWaterLevels({ sandy: 0, loam: 0, clay: 0 });

    // Simulate Sandy filling fast (best drainage)
    setTimeout(() => {
      setWaterLevels((prev) => ({ ...prev, sandy: 95 }));
      sound.playWaterDrip();
    }, 1200);

    // Simulate Loam filling moderately
    setTimeout(() => {
      setWaterLevels((prev) => ({ ...prev, loam: 55 }));
      sound.playWaterDrip();
    }, 2400);

    // Simulate Clay filling slowest / lowest drainage
    setTimeout(() => {
      setWaterLevels((prev) => ({ ...prev, clay: 18 }));
      setIsWaterPouring(false);
      sound.playCorrect();
    }, 3600);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-slate-100 min-h-[620px]">
      {/* Station Tabs */}
      <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'layers', icon: <Layers className="w-4 h-4" />, labelEn: '1. Earth Layers', labelZh: '1. 地球圈層拼圖' },
            { id: 'tectonics', icon: <Activity className="w-4 h-4" />, labelEn: '2. Tectonic & Volcano', labelZh: '2. 板塊與火山' },
            { id: 'rocks', icon: <Mountain className="w-4 h-4" />, labelEn: '3. Rock Forge Lab', labelZh: '3. 三大類岩石熔爐' },
            { id: 'soil', icon: <Droplet className="w-4 h-4" />, labelEn: '4. Soil Drainage Tower', labelZh: '4. 土壤透水實驗' },
            { id: 'geopark', icon: <Sprout className="w-4 h-4" />, labelEn: '5. HK Geopark Ranger', labelZh: '5. 香港地質公園守護員' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => {
                sound.playClick();
                setActiveStation(st.id as typeof activeStation);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeStation === st.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {st.icon}
              <span>{isEn ? st.labelEn : st.labelZh}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Station Body */}
      <div className="p-6 flex-1 flex flex-col justify-center">
        {/* ========================================================== */}
        {/* STATION 1: EARTH LAYERS CUTAWAY & ORDERING PUZZLE */}
        {/* ========================================================== */}
        {activeStation === 'layers' && (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>{isEn ? 'Earth Layer Concentric Cutaway' : '地球圈層結構與排列'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {isEn
                    ? 'Learn the 3 layers and practice ordering them from Outside-In and Inside-Out!'
                    : '掌握地球三大圈層（地殼、地幔、地核），練習由外至內及由內至外的正確排序！'}
                </p>
              </div>

              {/* Direction Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedDirection('outside-in');
                    setLayerSlots([null, null, null]);
                    setLayerFeedback(null);
                  }}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    selectedDirection === 'outside-in' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  {isEn ? 'Outside → Inside' : '由外至內 (Outside-In)'}
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedDirection('inside-out');
                    setLayerSlots([null, null, null]);
                    setLayerFeedback(null);
                  }}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    selectedDirection === 'inside-out' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  {isEn ? 'Inside → Outside' : '由內至外 (Inside-Out)'}
                </button>
              </div>
            </div>

            {/* Interactive Cutaway Visualizer & Drop Slots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Visual Globe Diagram */}
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[300px]">
                <div className="relative w-56 h-56 rounded-full border-4 border-emerald-500 flex items-center justify-center shadow-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 overflow-hidden">
                  {/* Crust Rim */}
                  <div className="absolute inset-0 rounded-full border-[10px] border-emerald-500/70 pointer-events-none" />

                  {/* Mantle Middle Ring */}
                  <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-orange-600 to-amber-600 border-4 border-orange-400 flex items-center justify-center shadow-inner">
                    {/* Core Center */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-500 border-2 border-yellow-200 flex flex-col items-center justify-center text-center shadow-lg animate-pulse">
                      <span className="text-[11px] font-black text-amber-950">
                        {isEn ? 'CORE' : '地核'}
                      </span>
                      <span className="text-[9px] text-amber-900 font-bold">~6000°C</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span>{isEn ? 'Crust (Outer)' : '地殼（最外）'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
                    <span>{isEn ? 'Mantle (Middle)' : '地幔（中間）'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
                    <span>{isEn ? 'Core (Centre)' : '地核（中心）'}</span>
                  </span>
                </div>
              </div>

              {/* Drop Slots & Palette */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-amber-400">
                  {isEn
                    ? `Drop into positions (${selectedDirection === 'outside-in' ? '1: Outermost → 3: Innermost' : '1: Innermost → 3: Outermost'}):`
                    : `按順序點選填入（${selectedDirection === 'outside-in' ? '1: 最外層 → 3: 最中心' : '1: 最中心 → 3: 最外層'}）：`}
                </div>

                <div className="space-y-3">
                  {[0, 1, 2].map((slotIdx) => {
                    const currentFilled = layerSlots[slotIdx];
                    const layerObj = EARTH_LAYERS.find((l) => l.id === currentFilled);

                    return (
                      <div
                        key={slotIdx}
                        className={`p-3.5 rounded-xl border-2 border-dashed flex items-center justify-between transition-colors ${
                          layerObj
                            ? 'bg-slate-800/90 border-amber-500 text-white'
                            : 'bg-slate-950/60 border-slate-700 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-xs">
                            {slotIdx + 1}
                          </span>
                          <div>
                            <span className="font-bold text-sm block">
                              {layerObj ? (isEn ? layerObj.nameEn : layerObj.nameZh) : isEn ? 'Empty Slot' : '點選下方標籤填入'}
                            </span>
                            {layerObj && (
                              <span className="text-[11px] text-slate-400">
                                {isEn ? layerObj.compositionEn : layerObj.compositionZh}
                              </span>
                            )}
                          </div>
                        </div>

                        {currentFilled && (
                          <button
                            onClick={() => {
                              sound.playClick();
                              const next = [...layerSlots];
                              next[slotIdx] = null;
                              setLayerSlots(next);
                              setLayerFeedback(null);
                            }}
                            className="text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                          >
                            {isEn ? 'Clear' : '清除'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Candidate Tiles to Click/Drop */}
                <div className="pt-2">
                  <div className="text-xs text-slate-400 mb-2">{isEn ? 'Select Layer Tile:' : '點選圈層放入空格：'}</div>
                  <div className="grid grid-cols-3 gap-2">
                    {EARTH_LAYERS.map((layer) => {
                      const alreadyUsed = layerSlots.includes(layer.id);
                      return (
                        <button
                          key={layer.id}
                          disabled={alreadyUsed}
                          onClick={() => {
                            const firstEmpty = layerSlots.indexOf(null);
                            if (firstEmpty !== -1) {
                              handleLayerDrop(firstEmpty, layer.id);
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                            alreadyUsed
                              ? 'opacity-40 bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-amber-300 hover:border-amber-400 shadow-sm'
                          }`}
                        >
                          <div>{isEn ? layer.nameEn : layer.nameZh}</div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            {isEn ? layer.depthEn : layer.depthZh}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback */}
                {layerFeedback && (
                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300 flex items-center justify-between">
                    <span>{layerFeedback}</span>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setLayerSlots([null, null, null]);
                        setLayerFeedback(null);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-700 text-slate-200 hover:bg-slate-600 text-xs cursor-pointer"
                    >
                      {isEn ? 'Reset' : '重設'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STATION 2: TECTONIC COLLISION & VOLCANO SANDBOX */}
        {/* ========================================================== */}
        {activeStation === 'tectonics' && (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-400" />
                <span>{isEn ? 'Tectonic Plate Movement & Hazards Simulator' : '地殼板塊運動與天然災害模擬器'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Drag the slider to move the tectonic plates together. Observe how plate collisions trigger earthquakes and volcanic eruptions!'
                  : '拖動滑桿推動板塊相互靠近。觀察板塊碰撞時如何引發地面劇烈震動（地震）以及熔岩湧出（火山爆發）！'}
              </p>
            </div>

            {/* Interactive Sandbox Canvas Simulation View */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
              {/* Sky and Surface */}
              <div className="relative w-full h-44 border-b-4 border-amber-800 flex items-end justify-center overflow-hidden">
                {/* Left Continental Plate */}
                <div
                  className="absolute bottom-0 w-48 h-32 bg-emerald-800 border-r-4 border-emerald-950 rounded-tl-xl transition-all duration-100 flex flex-col items-center justify-start p-2 shadow-xl"
                  style={{ left: `${20 - (100 - plateDistance) * 0.15}%` }}
                >
                  <div className="text-xs font-bold text-emerald-200">
                    {isEn ? 'Plate A (Crust)' : '板塊 A (地殼)'}
                  </div>
                  <div className="text-xl mt-1">🏙️ 🌲</div>
                </div>

                {/* Right Continental Plate */}
                <div
                  className="absolute bottom-0 w-48 h-32 bg-emerald-700 border-l-4 border-emerald-950 rounded-tr-xl transition-all duration-100 flex flex-col items-center justify-start p-2 shadow-xl"
                  style={{ right: `${20 - (100 - plateDistance) * 0.15}%` }}
                >
                  <div className="text-xs font-bold text-emerald-200">
                    {isEn ? 'Plate B (Crust)' : '板塊 B (地殼)'}
                  </div>
                  <div className="text-xl mt-1">⛰️ 🏡</div>
                </div>

                {/* Volcano in the Middle Collision Zone */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Magma eruption effect if collided */}
                  {isCollided && (
                    <div className="absolute -top-16 flex flex-col items-center animate-bounce">
                      <div className="text-3xl">🌋 🔥 💥</div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white shadow-lg animate-pulse">
                        {isEn ? 'MAGMA GUSHING OUT!' : '岩漿噴發！火山爆發！'}
                      </span>
                    </div>
                  )}

                  {/* Volcano mountain shape */}
                  <div
                    className={`w-28 h-24 bg-stone-700 clip-triangle flex items-center justify-center transition-all ${
                      isCollided ? 'scale-110 shadow-rose-600/50 shadow-2xl' : ''
                    }`}
                    style={{
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                    }}
                  />
                </div>
              </div>

              {/* Underground Mantle with Flowing Magma */}
              <div className="w-full h-24 bg-gradient-to-b from-orange-600 to-red-700 p-3 flex flex-col justify-between text-center relative overflow-hidden">
                <div className="text-xs font-bold text-yellow-200 flex items-center justify-center gap-2">
                  <Flame className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <span>
                    {isEn
                      ? 'Mantle: Hot Flowing Magma (Drives Plate Movement)'
                      : '地幔：高溫流動的岩漿（帶動板塊緩慢移動）'}
                  </span>
                </div>
                <div className="text-[11px] text-amber-100">
                  {isCollided
                    ? isEn
                      ? '⚠️ Collision Detected! The ground shakes violently (Earthquake) & magma breaches (Volcanic Eruption)!'
                      : '⚠️ 板塊劇烈碰撞！地面強烈震動（引發地震），深層岩漿噴出（引發火山爆發）！'
                    : isEn
                      ? 'Plates floating on slow convection magma currents.'
                      : '板塊漂浮在緩慢流動的地幔岩漿之上。'}
                </div>
              </div>

              {/* Collision Slider Control */}
              <div className="pt-4 flex items-center gap-4">
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {isEn ? 'Separate Plates' : '分開板塊'}
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={plateDistance}
                  onChange={(e) => handlePlateSlider(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-xs text-rose-400 font-bold whitespace-nowrap">
                  {isEn ? 'Collide Plates!' : '推進碰撞！'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STATION 3: ROCK FORGE & HARDNESS TEST BENCH */}
        {/* ========================================================== */}
        {activeStation === 'rocks' && (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Mountain className="w-5 h-5 text-amber-400" />
                <span>{isEn ? 'Rock Classification Forge & Hardness Test Bench' : '三大類岩石熔爐與硬度檢測台'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Examine 6 iconic rock specimens, classify their formation process (Igneous, Sedimentary, Metamorphic), test hardness, and discover their daily uses!'
                  : '檢驗六種代表性岩石樣本，辨識其形成過程（火成岩、沉積岩、變質岩），測試硬度星級與日常用途！'}
              </p>
            </div>

            {/* Rock Selector Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {ROCKS_DATA.map((rock) => (
                <button
                  key={rock.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveRockId(rock.id);
                    setRockQuizSubmitted(false);
                    setRockSelectedType(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeRockId === rock.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? rock.nameEn : rock.nameZh}
                </button>
              ))}
            </div>

            {/* Active Rock Inspector Card */}
            {(() => {
              const r = ROCKS_DATA.find((x) => x.id === activeRockId) || ROCKS_DATA[0];

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-950 rounded-2xl border border-slate-800">
                  {/* Left: Specimen Visualizer & Microscope */}
                  <div className="space-y-4">
                    <div className="h-44 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                      {/* Stylized Rock Visual */}
                      <div
                        className="w-28 h-24 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20 relative"
                        style={{ backgroundColor: r.visualColor }}
                      >
                        <span className="text-3xl drop-shadow">🪨</span>
                      </div>
                      <span className="font-bold text-white text-base mt-2">
                        {isEn ? r.nameEn : r.nameZh}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {isEn ? r.colorEn : r.colorZh}
                      </span>
                    </div>

                    {/* Hardness & Grain Size Readouts */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[11px] mb-1">
                          {isEn ? 'Hardness Rating' : '硬度星級'}
                        </span>
                        <div className="text-amber-400 font-bold text-sm">
                          {'★'.repeat(r.hardness)}{'☆'.repeat(3 - r.hardness)}
                          <span className="text-xs text-slate-400 ml-1">
                            ({r.hardness === 3 ? (isEn ? 'Very Hard' : '堅硬') : (isEn ? 'Moderate' : '適中')})
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[11px] mb-1">
                          {isEn ? 'Grain Size' : '顆粒大小'}
                        </span>
                        <span className="font-bold text-emerald-400 text-xs">
                          {isEn ? r.grainSizeEn : r.grainSizeZh}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Formation Quiz & Real-World Use */}
                  <div className="space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-amber-400 mb-2">
                        {isEn ? 'Classify Formation Process:' : '請分類此岩石的形成過程：'}
                      </div>

                      <div className="space-y-2">
                        {[
                          { type: 'igneous' as RockType, labelEn: 'Igneous (Magma cools & hardens)', labelZh: '火成岩 (岩漿冷卻凝固)' },
                          { type: 'sedimentary' as RockType, labelEn: 'Sedimentary (Water sedimentation & layers)', labelZh: '沉積岩 (流水搬運沉積膠結)' },
                          { type: 'metamorphic' as RockType, labelEn: 'Metamorphic (High pressure & temperature)', labelZh: '變質岩 (高溫高壓改變結構)' },
                        ].map((choice) => {
                          const isCorrect = choice.type === r.type;
                          let btnStyle = 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300';

                          if (rockQuizSubmitted) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                            } else if (rockSelectedType === choice.type) {
                              btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                            }
                          }

                          return (
                            <button
                              key={choice.type}
                              onClick={() => {
                                sound.playClick();
                                setRockSelectedType(choice.type);
                                setRockQuizSubmitted(true);
                                if (isCorrect) {
                                  sound.playCorrect();
                                } else {
                                  sound.playWrong();
                                }
                              }}
                              className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                            >
                              <span>{isEn ? choice.labelEn : choice.labelZh}</span>
                              {rockQuizSubmitted && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Formation description & Daily use */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                      <div>
                        <span className="font-bold text-amber-400">
                          {isEn ? 'Formation Science:' : '科學成因：'}
                        </span>{' '}
                        <span className="text-slate-300">{isEn ? r.formationEn : r.formationZh}</span>
                      </div>
                      <div className="pt-1 border-t border-slate-800">
                        <span className="font-bold text-cyan-400">
                          {isEn ? 'Daily / HK Uses:' : '日常與香港生活用途：'}
                        </span>{' '}
                        <span className="text-slate-300">{isEn ? r.usesEn : r.usesZh}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================== */}
        {/* STATION 4: SOIL DRAINAGE PERCOLATION & GARDEN NURSERY */}
        {/* ========================================================== */}
        {activeStation === 'soil' && (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-cyan-400" />
                  <span>{isEn ? 'Soil Drainage Capacity & Plant Nursery' : '土壤排水透水能力與種植實驗'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {isEn
                    ? 'Pour 100mL of water into Sandy Soil, Loam, and Clay Soil. Observe the drainage rate, then plant the cactus and rose!'
                    : '將 100 毫升水注入沙土、壤土與黏土中。觀察排水流速，並將仙人掌與玫瑰花種植到最適宜的土壤！'}
                </p>
              </div>

              <button
                disabled={isWaterPouring}
                onClick={startWaterExperiment}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Droplet className="w-4 h-4 fill-slate-950" />
                <span>{isEn ? 'Pour 100mL Water' : '注入 100mL 清水實驗'}</span>
              </button>
            </div>

            {/* 3 Soil Cylinders Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SOIL_DATA.map((soil) => {
                const currentWater = waterLevels[soil.id];

                return (
                  <div
                    key={soil.id}
                    className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-sm">
                          {isEn ? soil.nameEn : soil.nameZh}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 font-mono text-amber-300">
                          {isEn ? `Particle: ${soil.particleSize}` : `顆粒: ${soil.particleSize === 'largest' ? '最大' : soil.particleSize === 'smallest' ? '最小' : '適中'}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {isEn ? soil.descriptionEn : soil.descriptionZh}
                      </p>
                    </div>

                    {/* Glass Cylinder Animation */}
                    <div className="h-44 w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-2 flex flex-col justify-between relative overflow-hidden">
                      {/* Soil Bed */}
                      <div
                        className="w-full h-16 rounded-md opacity-90 border border-black/30 flex items-center justify-center text-xs font-bold text-white shadow-inner"
                        style={{ backgroundColor: soil.color }}
                      >
                        {isEn ? soil.nameEn : soil.nameZh}
                      </div>

                      {/* Water Percolating Drops */}
                      {isWaterPouring && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-cyan-400 animate-bounce">💧</span>
                        </div>
                      )}

                      {/* Beaker Drainage Output */}
                      <div className="w-full h-20 bg-slate-950/80 rounded border border-slate-800 flex flex-col justify-end p-1 relative">
                        <div
                          className="w-full bg-cyan-500/60 rounded transition-all duration-700"
                          style={{ height: `${currentWater}%` }}
                        />
                        <span className="absolute top-1 right-1 text-[10px] font-mono text-cyan-300 font-bold">
                          {currentWater > 0 ? `${currentWater} mL` : '0 mL'}
                        </span>
                      </div>
                    </div>

                    {/* Drainage Rank Pill */}
                    <div className="text-xs p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">{isEn ? 'Drainage:' : '排水能力:'}</span>
                      <span
                        className={`font-bold ${
                          soil.drainageCapacity === 'highest'
                            ? 'text-emerald-400'
                            : soil.drainageCapacity === 'moderate'
                              ? 'text-amber-400'
                              : 'text-rose-400'
                        }`}
                      >
                        {soil.drainageCapacity === 'highest'
                          ? isEn ? 'Highest (Best)' : '最高（最快）'
                          : soil.drainageCapacity === 'moderate'
                            ? isEn ? 'Moderate' : '適中'
                            : isEn ? 'Lowest (Worst)' : '最低（最慢）'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Plant Matching Mini Challenge */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-amber-400">
                🌱 {isEn ? 'P.4 Gardening Challenge: Where should Carson plant these?' : '小四常識種植挑戰：家俊應把植物種在哪種土壤？'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Cactus */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌵</span>
                    <div>
                      <span className="font-bold text-white block">{isEn ? 'Cactus' : '仙人掌'}</span>
                      <span className="text-[11px] text-slate-400">
                        {isEn ? 'Needs dry soil, roots rot in water' : '喜乾爽、怕積水爛根'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {(['sandy', 'loam', 'clay'] as SoilType[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => {
                          sound.playClick();
                          setPlantMatches((p) => ({ ...p, cactus: st }));
                          if (st === 'sandy') sound.playCorrect();
                          else sound.playWrong();
                        }}
                        className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                          plantMatches.cactus === st
                            ? st === 'sandy'
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-rose-500 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {st === 'sandy' ? (isEn ? 'Sand' : '沙土') : st === 'loam' ? (isEn ? 'Loam' : '壤土') : (isEn ? 'Clay' : '黏土')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rose */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌹</span>
                    <div>
                      <span className="font-bold text-white block">{isEn ? 'Rose Flower' : '玫瑰花'}</span>
                      <span className="text-[11px] text-slate-400">
                        {isEn ? 'Needs balanced moisture & nutrients' : '需要水分與養分均衡'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {(['sandy', 'loam', 'clay'] as SoilType[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => {
                          sound.playClick();
                          setPlantMatches((p) => ({ ...p, rose: st }));
                          if (st === 'loam') sound.playCorrect();
                          else sound.playWrong();
                        }}
                        className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                          plantMatches.rose === st
                            ? st === 'loam'
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-rose-500 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {st === 'sandy' ? (isEn ? 'Sand' : '沙土') : st === 'loam' ? (isEn ? 'Loam' : '壤土') : (isEn ? 'Clay' : '黏土')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STATION 5: HONG KONG GEOPARK RANGER (VALUES & ATTITUDES) */}
        {/* ========================================================== */}
        {activeStation === 'geopark' && (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <span>{isEn ? 'Hong Kong Geopark Ranger: Conservation Patrol' : '香港地質公園護理員：資源珍惜巡邏'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Rocks and soil are precious resources that take thousands of years to form! Judge each visitor’s action as Right (✓) or Wrong (✗).'
                  : '岩石和土壤是珍貴的自然資源，需歷經數千年才能形成！請評判每位遊客的行為是「正確 (✓)」還是「錯誤 (✗)」。'}
              </p>
            </div>

            {/* Scenarios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: 1,
                  descEn: 'A visitor finds a shiny rock at High Island Geopark and puts it into his backpack to bring home.',
                  descZh: '遊客在萬宜水庫東壩看到美麗的六角柱石塊，把它裝進背包打算帶回家做紀念。',
                  correctIsRight: false,
                  reasonEn: 'WRONG! Never take rocks away from geoparks. Rocks are protected natural treasures.',
                  reasonZh: '錯誤！絕不可私自帶走地質公園的岩石，我們必須珍惜與保護自然地貌。'
                },
                {
                  id: 2,
                  descEn: 'A child finishes a soda and throws the empty can and plastic into the soil bushes.',
                  descZh: '小朋友喝完汽水後，隨手把鋁罐和塑料袋扔進草叢泥土中。',
                  correctIsRight: false,
                  reasonEn: 'WRONG! Littering pollutes and damages the soil and harms wildlife.',
                  reasonZh: '錯誤！亂拋垃圾會污染土壤，破壞生態環境與動植物家園。'
                },
                {
                  id: 3,
                  descEn: 'Students walk on designated wooden boardwalks to observe rock formations with magnifying glasses.',
                  descZh: '同學沿著指定木棧道行走，用放大鏡仔細觀察岩石晶體，不踐踏植被。',
                  correctIsRight: true,
                  reasonEn: 'RIGHT! Respecting nature by observing responsibly without causing damage.',
                  reasonZh: '正確！在步道上守秩序觀察學習，不破壞自然環境。'
                },
                {
                  id: 4,
                  descEn: 'A visitor takes photos of the hexagonal rock columns and takes all trash away upon leaving.',
                  descZh: '遊客拍攝壯麗的六角形岩柱留念，離開時把自己產生的所有垃圾帶走。',
                  correctIsRight: true,
                  reasonEn: 'RIGHT! Leave nothing but footprints, take nothing but photos.',
                  reasonZh: '正確！「除了足跡什麼都不留，除了回憶什麼都不帶走」，愛護大自然！'
                }
              ].map((sc) => {
                const userChoice = geoparkDecisions[sc.id];
                const isAnswered = userChoice !== undefined && userChoice !== null;
                const isCorrect = isAnswered && userChoice === sc.correctIsRight;

                return (
                  <div
                    key={sc.id}
                    className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3"
                  >
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {isEn ? sc.descEn : sc.descZh}
                    </p>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setGeoparkDecisions((prev) => ({ ...prev, [sc.id]: true }));
                          if (sc.correctIsRight) sound.playCorrect();
                          else sound.playWrong();
                        }}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                          userChoice === true
                            ? sc.correctIsRight
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-rose-600 border-rose-500 text-white'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        ✓ {isEn ? 'Right (做得對)' : '正確 (做得對)'}
                      </button>

                      <button
                        onClick={() => {
                          sound.playClick();
                          setGeoparkDecisions((prev) => ({ ...prev, [sc.id]: false }));
                          if (!sc.correctIsRight) sound.playCorrect();
                          else sound.playWrong();
                        }}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                          userChoice === false
                            ? !sc.correctIsRight
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-rose-600 border-rose-500 text-white'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        ✗ {isEn ? 'Wrong (做得不對)' : '不對 (做得不對)'}
                      </button>
                    </div>

                    {isAnswered && (
                      <div
                        className={`p-2 rounded-lg text-[11px] leading-snug border ${
                          isCorrect
                            ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                            : 'bg-rose-950/60 border-rose-700 text-rose-200'
                        }`}
                      >
                        {isEn ? sc.reasonEn : sc.reasonZh}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
