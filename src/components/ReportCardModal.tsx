import React from 'react';
import { ChapterId } from '../types/curriculum';
import { MC_QUESTIONS, BLANK_QUESTIONS, JUDGING_QUESTIONS, MATCHING_QUESTIONS, REORDERING_QUESTIONS } from '../data/unit1Data';
import { sound } from '../utils/soundManager';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, Star, ShieldCheck, X, RotateCcw } from 'lucide-react';

interface ReportCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedChapter: ChapterId;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  isOpen,
  onClose,
  selectedChapter
}) => {
  if (!isOpen) return null;

  const totalMC = MC_QUESTIONS.length;
  const totalBlanks = BLANK_QUESTIONS.length;
  const totalJudging = JUDGING_QUESTIONS.length;
  const totalMatching = MATCHING_QUESTIONS.length;
  const totalReordering = REORDERING_QUESTIONS.length;
  const grandTotal = totalMC + totalBlanks + totalJudging + totalMatching + totalReordering;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-600/30 to-emerald-600/30 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xl">
              🎓
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Hong Kong Primary 4 Science Curriculum Card
              </h2>
              <p className="text-xs text-amber-300">
                Unit 1: About the Earth · Chapters 1, 2 & 3 Comprehensive Syllabus
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
          {/* Certificate Badge */}
          <div className="p-5 bg-slate-950 rounded-2xl border-2 border-amber-500/40 text-center space-y-3 shadow-inner">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
            </div>

            <h3 className="text-xl font-black text-white">
              Primary 4 Earth Science Master
            </h3>

            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Certified mastery of Earth's internal layers, tectonic plate collisions, three rock formations, soil classification, 24h rotation, 365-day revolution, climate indicators, and low-carbon living.
            </p>
          </div>

          {/* Exercise Modules Inventory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Worksheet Sets Included in This App:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">SE4a_u1_01: Multiple Choice</span>
                  <span className="text-[11px] text-slate-400">Knowledge & Attitudes</span>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">{totalMC} questions</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">SE4a_u1_02: Fill in the Blanks</span>
                  <span className="text-[11px] text-slate-400">Knowledge & Understanding</span>
                </div>
                <span className="font-mono font-bold text-blue-400 text-sm">{totalBlanks} questions</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">SE4a_u1_04: Judging (True/False)</span>
                  <span className="text-[11px] text-slate-400">Knowledge & Attitudes</span>
                </div>
                <span className="font-mono font-bold text-emerald-400 text-sm">{totalJudging} questions</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">SE4a_u1_07: Matching</span>
                  <span className="text-[11px] text-slate-400">Features, Soils & Rocks</span>
                </div>
                <span className="font-mono font-bold text-purple-400 text-sm">{totalMatching} sets</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between sm:col-span-2">
                <div>
                  <span className="font-bold text-white block">SE4a_u1_08: Reordering</span>
                  <span className="text-[11px] text-slate-400">Sequences & Scientific Processes</span>
                </div>
                <span className="font-mono font-bold text-cyan-400 text-sm">{totalReordering} processes</span>
              </div>
            </div>
          </div>

          {/* Curriculum Compliance Stamp */}
          <div className="p-3.5 bg-emerald-950/30 border border-emerald-700/60 rounded-xl text-xs flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-emerald-200">
              Aligned with Hong Kong Educational Publishing House · New Science Primary 4 curriculum benchmarks.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              sound.playVictory();
              confetti({ particleCount: 120, spread: 80 });
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>Celebrate Progress</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
};
