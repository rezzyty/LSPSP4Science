import React, { useState } from 'react';
import { Language } from '../types/game';
import { EARTH_LAYERS, ROCKS_DATA, SOIL_DATA, SOIL_COMPONENTS } from '../data/chapter1Data';
import { sound } from '../utils/soundManager';
import { X, Layers, Mountain, Sparkles, Sprout, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface KnowledgeBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const KnowledgeBookModal: React.FC<KnowledgeBookModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'layers' | 'rocks' | 'soil' | 'conservation'>('layers');
  const isEn = language === 'en';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold">
              📖
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isEn ? 'P.4 Science Revision Handbook' : '小四科學科 溫習筆記手冊'}
              </h2>
              <p className="text-xs text-amber-400">
                {isEn ? 'Unit 1 · Chapter 1: Structure of the Earth' : '第一單元 · 第一課：地球的結構'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 p-2 gap-2 overflow-x-auto">
          {[
            { id: 'layers', icon: <Layers className="w-4 h-4" />, labelEn: 'Earth Layers & Plates', labelZh: '地球圈層與板塊' },
            { id: 'rocks', icon: <Mountain className="w-4 h-4" />, labelEn: '3 Types of Rocks', labelZh: '三大類岩石' },
            { id: 'soil', icon: <Sprout className="w-4 h-4" />, labelEn: 'Soil Types & Lab', labelZh: '土壤種類與實驗' },
            { id: 'conservation', icon: <ShieldAlert className="w-4 h-4" />, labelEn: 'Geopark & Values', labelZh: '地質公園與環保守則' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{isEn ? tab.labelEn : tab.labelZh}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
          {/* TAB 1: EARTH LAYERS */}
          {activeTab === 'layers' && (
            <div className="space-y-6">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
                <h3 className="text-base font-bold text-amber-400 mb-2">
                  {isEn ? 'Earth’s Concentric Shells' : '地球的三個同心圈層'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {EARTH_LAYERS.map((layer, idx) => (
                    <div key={layer.id} className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-base">
                          {idx + 1}. {isEn ? layer.nameEn : layer.nameZh}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 font-mono text-amber-400">
                          {isEn ? layer.depthEn : layer.depthZh}
                        </span>
                      </div>
                      <p className="text-xs text-rose-300 mb-2">
                        🔥 {isEn ? `Temp: ${layer.tempEn}` : `溫度：${layer.tempZh}`}
                      </p>
                      <p className="text-xs text-slate-400 mb-3">
                        🧱 {isEn ? layer.compositionEn : layer.compositionZh}
                      </p>
                      <ul className="text-xs space-y-1 text-slate-300">
                        {(isEn ? layer.featuresEn : layer.featuresZh).map((feat, fidx) => (
                          <li key={fidx} className="flex items-start gap-1.5">
                            <span className="text-amber-500">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tectonic Plates Section */}
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-3">
                <h3 className="text-base font-bold text-amber-400">
                  {isEn ? 'Tectonic Plates & Geological Activity' : '地殼板塊與地質運動'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/70">
                    <span className="font-bold text-emerald-400 text-sm block mb-1">
                      {isEn ? '1. The Crust is NOT a single piece' : '1. 地殼並非完整一整塊'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {isEn
                        ? 'The Earth crust is broken into many tectonic plates of different sizes. Magma in the mantle flows slowly, driving the plates to move with it.'
                        : '地殼分裂成許多大小不同的「板塊」。地幔中高溫流動的岩漿會帶動上方的板塊緩慢移動。'}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/70">
                    <span className="font-bold text-rose-400 text-sm block mb-1">
                      {isEn ? '2. Earthquakes & Volcanic Eruptions' : '2. 地震與火山爆發'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {isEn
                        ? 'When plates collide or slide against each other, the ground shakes violently causing earthquakes. Deep magma can also gush out of fractures causing volcanic eruptions.'
                        : '當板塊相互碰撞或滑動時，地面發生劇烈震動便形成「地震」；地下岩漿從裂縫噴出地表便形成「火山爆發」。'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 3 TYPES OF ROCKS */}
          {activeTab === 'rocks' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80">
                <h3 className="text-base font-bold text-amber-400 mb-2">
                  {isEn ? 'Classification by Formation Process' : '按形成過程分類的三大類岩石'}
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  {isEn
                    ? 'The Earth’s crust is mainly made up of rocks. Rocks have different colours, grain sizes, and hardness, and they are formed in three distinct ways:'
                    : '地殼主要由岩石組成。岩石具有不同的顏色、顆粒大小和硬度，按形成過程主要分為三大類：'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Igneous */}
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-orange-500/40">
                    <span className="px-2 py-0.5 text-xs font-bold bg-orange-950 text-orange-400 rounded border border-orange-700/60 inline-block mb-2">
                      {isEn ? 'A. Igneous Rocks (火成岩)' : 'A. 火成岩 (Igneous)'}
                    </span>
                    <p className="text-xs text-slate-300 mb-2 font-medium">
                      🌋 {isEn ? 'Formed when magma cools and hardens.' : '岩漿冷卻並凝固硬化而成。'}
                    </p>
                    <div className="space-y-2 mt-3 pt-2 border-t border-slate-800 text-xs">
                      <div>
                        <span className="font-bold text-amber-300">
                          {isEn ? '• Granite (花崗岩)' : '• 花崗岩 (Granite)'}
                        </span>
                        <p className="text-slate-400 text-[11px]">
                          {isEn ? 'Largest visible grains! Very hard (3★). Used for stairs and pillars.' : '顆粒最大！極堅硬（3星），常用作石階與建築石柱。'}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-amber-300">
                          {isEn ? '• Basalt (玄武岩)' : '• 玄武岩 (Basalt)'}
                        </span>
                        <p className="text-slate-400 text-[11px]">
                          {isEn ? 'Dark, fine grains. Cooled quickly from surface lava. Hard (3★).' : '深黑色，快速冷凝顆粒細，質地堅硬（3星）。'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sedimentary */}
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-amber-500/40">
                    <span className="px-2 py-0.5 text-xs font-bold bg-amber-950 text-amber-400 rounded border border-amber-700/60 inline-block mb-2">
                      {isEn ? 'B. Sedimentary Rocks (沉積岩)' : 'B. 沉積岩 (Sedimentary)'}
                    </span>
                    <p className="text-xs text-slate-300 mb-2 font-medium">
                      🌊 {isEn ? 'Formed by sedimentation of rock pieces & soil transported by water.' : '水流搬運岩石碎屑與泥沙沉積壓實固化而成。'}
                    </p>
                    <div className="space-y-2 mt-3 pt-2 border-t border-slate-800 text-xs">
                      <div>
                        <span className="font-bold text-amber-300">
                          {isEn ? '• Sandstone (砂岩)' : '• 砂岩 (Sandstone)'}
                        </span>
                        <p className="text-slate-400 text-[11px]">
                          {isEn ? 'Medium sand grains. Used for building exterior walls and tiles.' : '中等粗糙沙粒，常用作建築外牆與石材。'}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-amber-300">
                          {isEn ? '• Shale (頁岩)' : '• 頁岩 (Shale)'}
                        </span>
                        <p className="text-slate-400 text-[11px]">
                          {isEn ? 'Very fine mud layers in sheets. Used for bricks and ceramics.' : '極細泥層壓成片狀，可用於燒製磚塊及水泥。'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metamorphic */}
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-purple-500/40">
                    <span className="px-2 py-0.5 text-xs font-bold bg-purple-950 text-purple-400 rounded border border-purple-700/60 inline-block mb-2">
                      {isEn ? 'C. Metamorphic Rocks (變質岩)' : 'C. 變質岩 (Metamorphic)'}
                    </span>
                    <p className="text-xs text-slate-300 mb-2 font-medium">
                      ⚡ {isEn ? 'Formed under high temperature & high pressure altering structure.' : '在高溫與高壓環境下改變內部晶體結構變質而成。'}
                    </p>
                    <div className="space-y-2 mt-3 pt-2 border-t border-slate-800 text-xs">
                      <div>
                        <span className="font-bold text-amber-300">
                          {isEn ? '• Marble (大理岩)' : '• 大理岩 (Marble)'}
                        </span>
                        <p className="text-slate-400 text-[11px]">
                          {isEn ? 'Moderate hardness (2★). Smooth & lustrous; world-famous for sculptures!' : '硬度適中（2星），打磨後光滑具光澤，常用作雕塑及地板。'}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-amber-300">
                          {isEn ? '• Gneiss (片麻岩)' : '• 片麻岩 (Gneiss)'}
                        </span>
                        <p className="text-slate-400 text-[11px]">
                          {isEn ? 'Banded alternating stripes from altered granite minerals.' : '深淺交替的明顯條紋，常用作裝飾石材。'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOIL TYPES & EXPERIMENTS */}
          {activeTab === 'soil' && (
            <div className="space-y-6">
              {/* Formation & Components */}
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80">
                <h3 className="text-base font-bold text-amber-400 mb-2">
                  {isEn ? 'How Soil is Formed & Its 4 Components' : '土壤的形成與四大成分'}
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  {isEn
                    ? 'Some rocks break into pieces after many years of exposure to wind and rain, forming soil. Soil consists of:'
                    : '岩石長年累月受風吹雨打分解破裂，形成土壤。土壤包含四大主要成分：'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {SOIL_COMPONENTS.map((comp) => (
                    <div key={comp.id} className="p-3 bg-slate-900/80 rounded-lg border border-slate-700 text-center">
                      <span className="font-bold text-amber-300 block mb-1">
                        {isEn ? comp.nameEn : comp.nameZh}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        🔬 {isEn ? comp.evidenceEn : comp.evidenceZh}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 Soils Comparison Table */}
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 overflow-x-auto">
                <h3 className="text-base font-bold text-amber-400 mb-3">
                  {isEn ? 'Classification of Soil by Particle Size' : '按顆粒大小分類的三種土壤特性對比'}
                </h3>
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-amber-300">
                      <th className="py-2 px-3">{isEn ? 'Property' : '特性'}</th>
                      <th className="py-2 px-3">{isEn ? 'Sandy Soil (沙土)' : '沙土 (Sandy)'}</th>
                      <th className="py-2 px-3">{isEn ? 'Loam (壤土)' : '壤土 (Loam)'}</th>
                      <th className="py-2 px-3">{isEn ? 'Clay Soil (黏土)' : '黏土 (Clay)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-200">
                        {isEn ? 'Particle Size' : '顆粒大小'}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">{isEn ? 'Largest' : '最大'}</td>
                      <td className="py-2.5 px-3 text-amber-400 font-bold">{isEn ? 'Medium-sized' : '適中 / 粗幼適中'}</td>
                      <td className="py-2.5 px-3 text-cyan-400 font-bold">{isEn ? 'Smallest' : '最小'}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-200">
                        {isEn ? 'Drainage Capacity' : '排水能力'}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">{isEn ? 'Highest (Best)' : '最高（去水最快）'}</td>
                      <td className="py-2.5 px-3 text-amber-400 font-bold">{isEn ? 'Moderate' : '適中'}</td>
                      <td className="py-2.5 px-3 text-rose-400 font-bold">{isEn ? 'Lowest (Worst)' : '最低（去水最慢易積水）'}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-200">
                        {isEn ? 'Ability to Retain Nutrients' : '保肥能力'}
                      </td>
                      <td className="py-2.5 px-3 text-rose-400 font-bold">{isEn ? 'Lower' : '較低'}</td>
                      <td className="py-2.5 px-3 text-amber-400 font-bold">{isEn ? 'Moderate' : '適中'}</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">{isEn ? 'Higher' : '較高'}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-200">
                        {isEn ? 'Best Suitable Plant' : '最適合植物'}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-amber-200">🌵 {isEn ? 'Cactus' : '仙人掌'}</td>
                      <td className="py-2.5 px-3 font-semibold text-rose-300">🌹 {isEn ? 'Rose & Flowers' : '玫瑰花及一般花卉'}</td>
                      <td className="py-2.5 px-3 font-semibold text-teal-300">🪷 {isEn ? 'Lotus / Water plants' : '荷花／水生植物'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CONSERVATION & VALUES */}
          {activeTab === 'conservation' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/30 border border-emerald-700/60 rounded-xl space-y-3">
                <h3 className="text-base font-bold text-emerald-400">
                  {isEn ? 'Rocks and Soil are Precious Natural Resources!' : '岩石和土壤是寶貴的自然資源！'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isEn
                    ? 'Soil takes thousands of years to form through gradual weathering of solid rocks. We must cherish and protect these natural treasures for future generations.'
                    : '岩石受長年累月風化侵蝕分解才能形成薄薄的土壤，需時數千年。我們必須好好珍惜並保護大自然的寶貴資源。'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-100 text-xs block">
                        {isEn ? 'Visiting the Geopark' : '參觀香港地質公園'}
                      </span>
                      <p className="text-[11px] text-slate-300">
                        {isEn
                          ? 'NEVER take away rocks from the geopark! Enjoy the natural sights without removing or carving them.'
                          : '絕不可私自把地質公園的岩石帶回家或在岩石上刻字！'}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-100 text-xs block">
                        {isEn ? 'Protecting Soil' : '保護土壤'}
                      </span>
                      <p className="text-[11px] text-slate-300">
                        {isEn
                          ? 'Do NOT litter or dump toxic chemicals that pollute the soil. Plant trees and greenery to prevent erosion.'
                          : '切勿亂拋垃圾或傾倒有害廢物污染土壤。多植樹綠化，防止水土流失。'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer transition-colors"
          >
            {isEn ? 'Close Guide' : '關閉筆記'}
          </button>
        </div>
      </div>
    </div>
  );
};
