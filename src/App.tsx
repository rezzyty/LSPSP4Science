import React, { useState } from 'react';
import { ChapterId, ExerciseType } from './types/curriculum';
import { CHAPTERS_META } from './data/unit1Data';
import { sound } from './utils/soundManager';
import { Navbar } from './components/Navbar';
import { MultipleChoiceExercise } from './components/exercises/MultipleChoiceExercise';
import { FillBlanksExercise } from './components/exercises/FillBlanksExercise';
import { JudgingExercise } from './components/exercises/JudgingExercise';
import { MatchingExercise } from './components/exercises/MatchingExercise';
import { ReorderingExercise } from './components/exercises/ReorderingExercise';
import { Unit1Simulations } from './components/simulations/Unit1Simulations';
import { KnowledgeBookModal } from './components/KnowledgeBookModal';
import { ReportCardModal } from './components/ReportCardModal';
import { BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedChapter, setSelectedChapter] = useState<ChapterId>('all');
  const [currentExercise, setCurrentExercise] = useState<ExerciseType>('mc');
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const handleToggleMute = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  const activeChapterMeta =
    CHAPTERS_META.find((ch) => ch.id === selectedChapter) || CHAPTERS_META[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Bar with Chapters & Exercise Sets */}
      <Navbar
        currentExercise={currentExercise}
        onSelectExercise={(type) => setCurrentExercise(type)}
        selectedChapter={selectedChapter}
        onSelectChapter={(ch) => setSelectedChapter(ch)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenBook={() => setIsBookOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {/* Active Chapter Context Card */}
        <section className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              {activeChapterMeta.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {activeChapterMeta.title}
                </h1>
                <span className="text-xs text-amber-400 font-medium">
                  {activeChapterMeta.subtitle}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {activeChapterMeta.description}
              </p>
            </div>
          </div>

          {/* Chapter Topics tags */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center shrink-0">
            {activeChapterMeta.topics.map((t, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/80"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Dynamic Exercise Viewport */}
        <section className="flex-1 w-full">
          {currentExercise === 'mc' && (
            <MultipleChoiceExercise selectedChapter={selectedChapter} />
          )}

          {currentExercise === 'blanks' && (
            <FillBlanksExercise selectedChapter={selectedChapter} />
          )}

          {currentExercise === 'judging' && (
            <JudgingExercise selectedChapter={selectedChapter} />
          )}

          {currentExercise === 'matching' && (
            <MatchingExercise selectedChapter={selectedChapter} />
          )}

          {currentExercise === 'reordering' && (
            <ReorderingExercise selectedChapter={selectedChapter} />
          )}

          {currentExercise === 'simulations' && <Unit1Simulations />}
        </section>

        {/* Educational Standards Footer */}
        <footer className="mt-auto pt-6 pb-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Curriculum Standard: Hong Kong Primary 4 Science · Unit 1 About the Earth (New Science, Educational Publishing House)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                setIsBookOpen(true);
              }}
              className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chapter Handbook</span>
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => {
                sound.playClick();
                setIsReportOpen(true);
              }}
              className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>View Curriculum Progress</span>
            </button>
          </div>
        </footer>
      </main>

      {/* Chapter Handbook Revision Modal */}
      <KnowledgeBookModal
        isOpen={isBookOpen}
        onClose={() => setIsBookOpen(false)}
        language="en"
      />

      {/* Curriculum Card Modal */}
      <ReportCardModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        selectedChapter={selectedChapter}
      />
    </div>
  );
}
