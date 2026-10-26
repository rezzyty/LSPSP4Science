import React, { useState } from 'react';
import { ChapterId } from '../../types/curriculum';
import { MC_QUESTIONS } from '../../data/unit1Data';
import { sound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, HelpCircle, Award, Sparkles, Filter, RotateCcw } from 'lucide-react';

interface MultipleChoiceExerciseProps {
  selectedChapter: ChapterId;
}

export const MultipleChoiceExercise: React.FC<MultipleChoiceExerciseProps> = ({ selectedChapter }) => {
  // Filter questions by chapter
  const questions = MC_QUESTIONS.filter(
    (q) => selectedChapter === 'all' || q.chapter === selectedChapter
  );

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [filterCategory, setFilterCategory] = useState<'all' | 'knowledge' | 'attitudes'>('all');

  const filteredQuestions = questions.filter(
    (q) => filterCategory === 'all' || q.category === filterCategory
  );

  const toggleOption = (qId: string, optId: string, isMultiple?: boolean) => {
    sound.playClick();
    const current = selectedAnswers[qId] || [];
    if (isMultiple) {
      const updated = current.includes(optId)
        ? current.filter((id) => id !== optId)
        : [...current, optId];
      setSelectedAnswers({ ...selectedAnswers, [qId]: updated });
    } else {
      setSelectedAnswers({ ...selectedAnswers, [qId]: [optId] });
    }
  };

  const handleSubmit = (qId: string) => {
    const q = MC_QUESTIONS.find((item) => item.id === qId);
    if (!q) return;

    const chosen = selectedAnswers[qId] || [];
    const isCorrect =
      chosen.length === q.correctAnswers.length &&
      chosen.every((ans) => q.correctAnswers.includes(ans));

    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    setSubmitted({ ...submitted, [qId]: true });
  };

  const handleReset = (qId: string) => {
    sound.playClick();
    const updatedAnswers = { ...selectedAnswers };
    delete updatedAnswers[qId];
    setSelectedAnswers(updatedAnswers);

    const updatedSubmitted = { ...submitted };
    delete updatedSubmitted[qId];
    setSubmitted(updatedSubmitted);
  };

  // Score stats
  const totalCount = filteredQuestions.length;
  const answeredCount = filteredQuestions.filter((q) => submitted[q.id]).length;
  const correctCount = filteredQuestions.filter((q) => {
    if (!submitted[q.id]) return false;
    const chosen = selectedAnswers[q.id] || [];
    return (
      chosen.length === q.correctAnswers.length &&
      chosen.every((ans) => q.correctAnswers.includes(ans))
    );
  }).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Exercise Header & Progress */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              SE4a_u1_01
            </span>
            <h2 className="text-lg font-bold text-white">Multiple Choice Exercises</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Carefully read each question. Note if the question allows more than one answer!
          </p>
        </div>

        {/* Filter & Score Cluster */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                filterCategory === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setFilterCategory('knowledge')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                filterCategory === 'knowledge' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Knowledge
            </button>
            <button
              onClick={() => setFilterCategory('attitudes')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                filterCategory === 'attitudes' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Attitudes
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Score:</span>
            <span className="font-mono font-bold text-amber-300">
              {correctCount} / {answeredCount}
            </span>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, index) => {
          const chosen = selectedAnswers[q.id] || [];
          const isSubmitted = submitted[q.id];
          const isCorrect =
            isSubmitted &&
            chosen.length === q.correctAnswers.length &&
            chosen.every((ans) => q.correctAnswers.includes(ans));

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all duration-200 ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/60 shadow-emerald-950/10'
                    : 'bg-rose-950/20 border-rose-500/60 shadow-rose-950/10'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Metadata */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {q.code} · Q{index + 1}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                    {q.chapter === 'ch1' ? 'Chapter 1' : q.chapter === 'ch2' ? 'Chapter 2' : 'Chapter 3'}
                  </span>
                  {q.isMultipleSelection && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60">
                      Multi-Select
                    </span>
                  )}
                </div>

                {isSubmitted && (
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${
                      isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Correct!
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" /> Review needed
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Question Text */}
              <h3 className="text-sm sm:text-base font-semibold text-white mb-4 leading-relaxed">
                {q.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5">
                {q.options.map((opt) => {
                  const isChosen = chosen.includes(opt.id);
                  const isRightAnswer = q.correctAnswers.includes(opt.id);

                  let optClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700';

                  if (isSubmitted) {
                    if (isRightAnswer) {
                      optClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isChosen && !isRightAnswer) {
                      optClass = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      optClass = 'bg-slate-950/40 border-slate-900 text-slate-500';
                    }
                  } else if (isChosen) {
                    optClass = 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isSubmitted}
                      onClick={() => toggleOption(q.id, opt.id, q.isMultipleSelection)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                            isChosen
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {isSubmitted && isRightAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between">
                <button
                  onClick={() => setShowHint({ ...showHint, [q.id]: !showHint[q.id] })}
                  className="text-xs text-amber-400/80 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint[q.id] ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {isSubmitted && (
                    <button
                      onClick={() => handleReset(q.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retry
                    </button>
                  )}

                  {!isSubmitted && (
                    <button
                      disabled={chosen.length === 0}
                      onClick={() => handleSubmit(q.id)}
                      className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow"
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
              </div>

              {/* Hint Box */}
              {showHint[q.id] && (
                <div className="mt-3 p-3 rounded-xl bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200">
                  💡 <strong>Hint:</strong> Remember the curriculum key facts for {q.chapter.toUpperCase()}.
                </div>
              )}

              {/* Explanation Box */}
              {isSubmitted && (
                <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Scientific Explanation:</span>
                  </div>
                  <p className="leading-relaxed pl-5">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
