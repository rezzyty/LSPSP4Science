import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../../types/game';
import { sound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import { Zap, Timer, Award, Flame, Play, RotateCcw, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SeismicRushGameProps {
  language: Language;
}

interface RushCard {
  id: string;
  itemEn: string;
  itemZh: string;
  hintEn: string;
  hintZh: string;
  category: 'crust-plates' | 'mantle-core' | 'rocks' | 'soil';
}

const RUSH_ITEMS: RushCard[] = [
  {
    id: '1',
    itemEn: 'Granite (花崗岩)',
    itemZh: '花崗岩',
    hintEn: 'Magma cools underground; largest grains, 3★ hardness',
    hintZh: '火成岩：岩漿地底冷凝，顆粒最大，3星硬度',
    category: 'rocks'
  },
  {
    id: '2',
    itemEn: 'Basalt (玄武岩)',
    itemZh: '玄武岩',
    hintEn: 'Magma cools quickly on surface; dark and fine-grained',
    hintZh: '火成岩：火山岩漿噴出快速冷凝，深黑色',
    category: 'rocks'
  },
  {
    id: '3',
    itemEn: 'Sandstone (砂岩)',
    itemZh: '砂岩',
    hintEn: 'Water sedimentation of rock pieces; rough gritty feel',
    hintZh: '沉積岩：流水搬運沙粒沉積壓實而成',
    category: 'rocks'
  },
  {
    id: '4',
    itemEn: 'Shale (頁岩)',
    itemZh: '頁岩',
    hintEn: 'Sedimentation in calm waters, thin sheet layers',
    hintZh: '沉積岩：泥沙沉積形成薄片狀層理',
    category: 'rocks'
  },
  {
    id: '5',
    itemEn: 'Marble (大理岩)',
    itemZh: '大理岩',
    hintEn: 'High temp & pressure on limestone; smooth sculptures',
    hintZh: '變質岩：高溫高壓下變質，用於藝術雕塑',
    category: 'rocks'
  },
  {
    id: '6',
    itemEn: 'Gneiss (片麻岩)',
    itemZh: '片麻岩',
    hintEn: 'High temp & pressure; banded alternating stripes',
    hintZh: '變質岩：高溫高壓重組，呈深淺交替條紋',
    category: 'rocks'
  },
  {
    id: '7',
    itemEn: 'Outermost layer where we live (Crust)',
    itemZh: '我們居住的最外層（地殼）',
    hintEn: 'Solid rock layer, broken into plates',
    hintZh: '固態岩石層，分裂成多個板塊',
    category: 'crust-plates'
  },
  {
    id: '8',
    itemEn: 'Tectonic Plates Colliding (Causes Earthquakes)',
    itemZh: '板塊互相擠壓碰撞（引發地震）',
    hintEn: 'Ground shakes violently; fault lines rupture',
    hintZh: '地面劇烈晃動造成地震',
    category: 'crust-plates'
  },
  {
    id: '9',
    itemEn: 'Hot flowing magma pushes plates',
    itemZh: '高溫流動的岩漿推動板塊緩慢移動',
    hintEn: 'Mantle convection currents underneath',
    hintZh: '地幔中的岩漿緩慢流動',
    category: 'mantle-core'
  },
  {
    id: '10',
    itemEn: 'Centre of Earth, up to 6,000°C',
    itemZh: '地球的最中心，溫度高達 6,000°C',
    hintEn: 'Mainly made of dense metals (iron and nickel)',
    hintZh: '主要由重金屬（鐵和鎳）組成',
    category: 'mantle-core'
  },
  {
    id: '11',
    itemEn: 'Sandy Soil (沙土)',
    itemZh: '沙土',
    hintEn: 'Largest particles, highest drainage, cactus',
    hintZh: '顆粒最大、排水能力最高、適合仙人掌',
    category: 'soil'
  },
  {
    id: '12',
    itemEn: 'Loam (壤土)',
    itemZh: '壤土',
    hintEn: 'Medium particles, moderate drainage, roses',
    hintZh: '顆粒適中、排水養分適中、最適合玫瑰花',
    category: 'soil'
  },
  {
    id: '13',
    itemEn: 'Clay Soil (黏土)',
    itemZh: '黏土',
    hintEn: 'Smallest particles, lowest drainage, high nutrients',
    hintZh: '顆粒最小、排水能力最低最易積水、保肥高',
    category: 'soil'
  },
  {
    id: '14',
    itemEn: 'Soil Components: Particles, Humus, Water, Air',
    itemZh: '土壤四大成分：微粒、動植物碎屑、水、空氣',
    hintEn: 'Formed after wind and rain break down rocks',
    hintZh: '岩石長年累月受風吹雨打分解形成',
    category: 'soil'
  },
  {
    id: '15',
    itemEn: 'Magma gushes out of fractures (Volcano)',
    itemZh: '地下岩漿從裂縫噴出地表（火山爆發）',
    hintEn: 'Mantle magma breaches crustal boundary',
    hintZh: '地幔岩漿衝出地殼裂口',
    category: 'mantle-core'
  }
];

export const SeismicRushGame: React.FC<SeismicRushGameProps> = ({ language }) => {
  const isEn = language === 'en';

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(1);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [shuffledQueue, setShuffledQueue] = useState<RushCard[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === '1') handleSort('crust-plates');
      if (e.key === '2') handleSort('mantle-core');
      if (e.key === '3') handleSort('rocks');
      if (e.key === '4') handleSort('soil');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = () => {
    sound.playClick();
    const shuffled = [...RUSH_ITEMS].sort(() => Math.random() - 0.5);
    setShuffledQueue(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setCombo(1);
    setTimeLeft(60);
    setFeedback(null);
    setGameState('playing');
  };

  const finishGame = () => {
    sound.playVictory();
    setGameState('ended');
    confetti({ particleCount: 120, spread: 70 });
  };

  const handleSort = (selectedCat: RushCard['category']) => {
    if (gameState !== 'playing' || !shuffledQueue[currentIdx]) return;

    const currentCard = shuffledQueue[currentIdx];
    const isCorrect = currentCard.category === selectedCat;

    if (isCorrect) {
      sound.playCorrect();
      const points = 100 * combo;
      setScore((s) => s + points);
      setCombo((c) => Math.min(10, c + 1));
      setFeedback({
        isCorrect: true,
        text: `+${points} pts! ${isEn ? 'Great classification!' : '分類精準！'}`
      });
    } else {
      sound.playWrong();
      setCombo(1);
      setFeedback({
        isCorrect: false,
        text: isEn ? 'Oops! Review category!' : '哎呀！請再看清楚類別！'
      });
    }

    // Advance to next card or loop
    if (currentIdx + 1 < shuffledQueue.length) {
      setCurrentIdx((i) => i + 1);
    } else {
      // reshuffle
      const reshuffled = [...RUSH_ITEMS].sort(() => Math.random() - 0.5);
      setShuffledQueue(reshuffled);
      setCurrentIdx(0);
    }
  };

  const currentCard = shuffledQueue[currentIdx];

  const categories = [
    {
      id: 'crust-plates' as const,
      num: '1',
      titleEn: 'Crust & Plates',
      titleZh: '地殼與板塊',
      icon: '🌍',
      color: 'border-emerald-500/70 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60'
    },
    {
      id: 'mantle-core' as const,
      num: '2',
      titleEn: 'Mantle & Core',
      titleZh: '地幔與地核',
      icon: '🔥',
      color: 'border-orange-500/70 bg-orange-950/40 text-orange-300 hover:bg-orange-900/60'
    },
    {
      id: 'rocks' as const,
      num: '3',
      titleEn: '3 Types of Rocks',
      titleZh: '三大類岩石',
      icon: '🪨',
      color: 'border-amber-500/70 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60'
    },
    {
      id: 'soil' as const,
      num: '4',
      titleEn: 'Soil & Formation',
      titleZh: '土壤與風化',
      icon: '🌱',
      color: 'border-cyan-500/70 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60'
    }
  ];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 min-h-[620px] flex flex-col justify-between text-slate-100">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              {isEn ? 'Seismic Rush: 60s Knowledge Sprint' : '地質急速分類戰：60秒極限衝刺'}
            </h2>
            <p className="text-[11px] text-slate-400">
              {isEn ? 'Classify items rapidly into the 4 chapter vaults!' : '快速將地質概念與岩石土壤歸入正確圈層金庫！'}
            </p>
          </div>
        </div>

        {/* Timer & Score Cluster */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 font-bold">
            <Timer className={`w-4 h-4 ${timeLeft < 15 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
            <span className="text-xs text-slate-400">{isEn ? 'Time:' : '剩餘時間:'}</span>
            <span className="font-mono text-base font-black tabular-nums text-white">
              {timeLeft}s
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400">{isEn ? 'Score:' : '得分:'}</span>
            <span className="font-mono text-base font-black tabular-nums text-amber-300">
              {score}
            </span>
            {combo > 1 && (
              <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black">
                {combo}x
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Playfield Area */}
      <div className="my-6 flex-1 flex flex-col items-center justify-center">
        {gameState === 'idle' && (
          <div className="max-w-md text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-3xl">
              ⚡
            </div>
            <h3 className="text-xl font-black text-white">
              {isEn ? 'Ready for the 60-Second Challenge?' : '準備好迎接 60 秒極限分類挑戰了嗎？'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Geological terms, rocks, and soil specimens will appear rapidly. Use keys [1, 2, 3, 4] or click the vaults to classify them accurately and maintain your multiplier!'
                : '岩石樣本、土壤特徵與地球圈層概念將快速登場。使用鍵盤數字鍵 [1, 2, 3, 4] 或點擊金庫進行精確分類，保持連勝加倍倍率！'}
            </p>
            <button
              onClick={startGame}
              className="py-3 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 cursor-pointer inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isEn ? 'Start 60s Rush' : '開始 60 秒衝刺'}</span>
            </button>
          </div>
        )}

        {gameState === 'playing' && currentCard && (
          <div className="w-full max-w-xl flex flex-col items-center space-y-6 animate-scale-up">
            {/* Active Card */}
            <div className="w-full p-6 bg-slate-950 rounded-2xl border-2 border-amber-500/60 shadow-2xl text-center space-y-2 relative overflow-hidden">
              <div className="absolute top-2 right-3 text-[10px] font-mono text-slate-500">
                #{currentIdx + 1}
              </div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block">
                {isEn ? 'Geological Specimen' : '地質標本 / 概念'}
              </span>
              <h4 className="text-2xl font-black text-white">
                {isEn ? currentCard.itemEn : currentCard.itemZh}
              </h4>
              <p className="text-xs text-slate-400 italic">
                💡 {isEn ? currentCard.hintEn : currentCard.hintZh}
              </p>

              {/* Dynamic feedback indicator */}
              {feedback && (
                <div
                  className={`mt-2 text-xs font-bold animate-pulse ${
                    feedback.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {feedback.text}
                </div>
              )}
            </div>

            {/* Classification Vaults (Buttons with Hotkeys) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSort(cat.id)}
                  className={`p-3.5 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-md ${cat.color}`}
                >
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="text-xs font-bold block leading-tight">
                    {isEn ? cat.titleEn : cat.titleZh}
                  </span>
                  <span className="mt-1 px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono font-bold">
                    Key [{cat.num}]
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'ended' && (
          <div className="max-w-md text-center space-y-5 animate-scale-up">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-3xl">
              🌟
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-400">
                {isEn ? 'Sprint Completed!' : '60秒極限衝刺完成！'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {isEn
                  ? 'Fantastic work! You tested your quick-fire reflex on rocks, soils, and Earth layers!'
                  : '太出色了！你展現了對三大類岩石、土壤特性與地球圈層的即時反應力！'}
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-around text-center">
              <div>
                <span className="text-[11px] text-slate-400 block">{isEn ? 'Final Score' : '最終得分'}</span>
                <span className="text-2xl font-black text-amber-400 font-mono">{score}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">{isEn ? 'Max Combo' : '最高連擊'}</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{combo}x</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEn ? 'Play Again' : '再衝刺一次'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer controls hint */}
      <div className="border-t border-slate-800 pt-3 text-center text-[11px] text-slate-500">
        {isEn
          ? 'Pro-tip: Press number keys [1], [2], [3], [4] on your keyboard for lightning-fast reflexes!'
          : '高手提示：直接按鍵盤數字鍵 [1]、[2]、[3]、[4] 可實現閃電急速分類！'}
      </div>
    </div>
  );
};
