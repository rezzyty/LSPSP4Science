import React from 'react';
import { ChapterId, ExerciseType } from '../types/curriculum';
import { sound } from '../utils/soundManager';
import {
  Compass,
  FileText,
  CheckSquare,
  Link2,
  ListOrdered,
  FlaskConical,
  BookOpen,
  Volume2,
  VolumeX,
  Award
} from 'lucide-react';

interface NavbarProps {
  currentExercise: ExerciseType;
  onSelectExercise: (type: ExerciseType) => void;
  selectedChapter: ChapterId;
  onSelectChapter: (ch: ChapterId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenBook: () => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentExercise,
  onSelectExercise,
  selectedChapter,
  onSelectChapter,
  isMuted,
  onToggleMute,
  onOpenBook,
  onOpenReport
}) => {
  const exercises: { id: ExerciseType; label: string; code: string; icon: React.ReactNode }[] = [
    {
      id: 'mc',
      label: 'Multiple Choice',
      code: 'SE4a_u1_01',
      icon: <FileText className="w-3.5 h-3.5" />
    },
    {
      id: 'blanks',
      label: 'Fill in Blanks',
      code: 'SE4a_u1_02',
      icon: <CheckSquare className="w-3.5 h-3.5" />
    },
    {
      id: 'judging',
      label: 'Judging (✓ / ✗)',
      code: 'SE4a_u1_04',
      icon: <CheckSquare className="w-3.5 h-3.5" />
    },
    {
      id: 'matching',
      label: 'Matching',
      code: 'SE4a_u1_07',
      icon: <Link2 className="w-3.5 h-3.5" />
    },
    {
      id: 'reordering',
      label: 'Reordering',
      code: 'SE4a_u1_08',
      icon: <ListOrdered className="w-3.5 h-3.5" />
    },
    {
      id: 'simulations',
      label: 'Interactive Labs',
      code: 'Games',
      icon: <FlaskConical className="w-3.5 h-3.5" />
    }
  ];

  const chapters: { id: ChapterId; label: string; badge: string }[] = [
    { id: 'all', label: 'All Chapters (Unit 1)', badge: 'Full Unit' },
    { id: 'ch1', label: 'Ch 1: Structure of the Earth', badge: 'Crust·Rocks·Soil' },
    { id: 'ch2', label: 'Ch 2: Movement of the Earth', badge: 'Rotation·Seasons' },
    { id: 'ch3', label: 'Ch 3: Weather and Climate', badge: 'HKO·Warming' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center shadow-md shadow-amber-900/20 text-white font-black text-xl">
            🌍
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white">GeoExplorer P4</span>
              <span className="text-xs text-amber-400 font-medium">Hong Kong Primary Science</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Unit 1: About the Earth Exercises & Labs</p>
          </div>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2">
          {/* Progress / Report Card */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenReport();
            }}
            title="Curriculum Card & Achievements"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/50 border border-amber-700/60 rounded-lg hover:bg-amber-900/50 transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Curriculum Card</span>
          </button>

          {/* Handbook */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenBook();
            }}
            title="Textbook Revision Guide"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-700/60 rounded-lg hover:bg-emerald-900/50 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Textbook Guide</span>
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-rose-950/50 text-rose-300 border-rose-800/60'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Chapter Selection Bar */}
      <div className="bg-slate-950/80 border-t border-slate-800 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Chapter:
            </span>
            {chapters.map((ch) => {
              const isSelected = selectedChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectChapter(ch.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Exercise Sets Navigation Tabs */}
      <div className="bg-slate-900 px-4 py-1.5 border-t border-slate-800/80 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Exercise:
          </span>
          {exercises.map((ex) => {
            const isActive = currentExercise === ex.id;
            return (
              <button
                key={ex.id}
                onClick={() => {
                  sound.playClick();
                  onSelectExercise(ex.id);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {ex.icon}
                <span>{ex.label}</span>
                <span className={`text-[10px] font-mono px-1 rounded ${isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                  {ex.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
