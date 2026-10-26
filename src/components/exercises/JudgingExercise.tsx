import React, { useState } from 'react';
import { ChapterId } from '../../types/curriculum';
import { JUDGING_QUESTIONS } from '../../data/unit1Data';
import { sound } from '../../utils/soundManager';
import { CheckCircle2, XCircle, Award, Sparkles, Filter, RotateCcw } from 'lucide-react';

interface JudgingExerciseProps {
  selectedChapter: ChapterId;
}

export const JudgingExercise: React.FC<JudgingExerciseProps> = ({ selectedChapter }) => {
  const questions = JUDGING_QUESTIONS.filter(
    (q) => selectedChapter === 'all' || q.chapter === selectedChapter
  );

  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'knowledge' | 'attitudes'>('all');

  const filteredQuestions = questions.filter(
    (q) => categoryFilter === 'all' || q.category === categoryFilter
  );

  const handleSelect = (qId: string, choice: boolean) => {
    sound.playClick();
    const q = JUDGING_QUESTIONS.find((item) => item.id === qId);
    if (!q) return;

    setAnswers({ ...answers, [qId]: choice });
    setChecked({ ...checked, [qId]: true });

    if (choice === q.isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  const handleReset = (qId: string) => {
    sound.playClick();
    const nextAnswers = { ...answers };
    delete nextAnswers[qId];
    setAnswers(nextAnswers);

    const nextChecked = { ...checked };
    delete nextChecked[qId];
    setChecked(nextChecked);
  };

  const totalCount = filteredQuestions.length;
  const answeredCount = filteredQuestions.filter((q) => checked[q.id]).length;
  const correctCount = filteredQuestions.filter((q) => {
    return checked[q.id] && answers[q.id] === q.isCorrect;
  }).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              SE4a_u1_04
            </span>
            <h2 className="text-lg font-bold text-white">Judging Statements (True ✓ / False ✗)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Determine whether each scientific statement is factually correct (✓) or false (✗).
          </p>
        </div>

        {/* Filter & Score */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                categoryFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setCategoryFilter('knowledge')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                categoryFilter === 'knowledge' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Knowledge
            </button>
            <button
              onClick={() => setCategoryFilter('attitudes')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                categoryFilter === 'attitudes' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
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

      {/* Judging Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const userChoice = answers[q.id];
          const isAnswered = checked[q.id];
          const isCorrect = isAnswered && userChoice === q.isCorrect;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all duration-200 ${
                isAnswered
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/60 shadow-emerald-950/10'
                    : 'bg-rose-950/20 border-rose-500/60 shadow-rose-950/10'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {q.code} · Q{idx + 1}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                      {q.chapter === 'ch1' ? 'Chapter 1' : q.chapter === 'ch2' ? 'Chapter 2' : 'Chapter 3'}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {q.category === 'knowledge' ? 'Knowledge' : 'Attitudes'}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                    {q.statement}
                  </p>
                </div>

                {/* Big Choice Buttons */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <button
                    disabled={isAnswered}
                    onClick={() => handleSelect(q.id, true)}
                    className={`w-14 h-12 rounded-xl text-lg font-black transition-all flex items-center justify-center cursor-pointer shadow ${
                      userChoice === true
                        ? isCorrect
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                          : 'bg-rose-600 text-white ring-2 ring-rose-400'
                        : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 hover:border-emerald-500'
                    }`}
                    title="Judge as True (✓)"
                  >
                    ✓
                  </button>

                  <button
                    disabled={isAnswered}
                    onClick={() => handleSelect(q.id, false)}
                    className={`w-14 h-12 rounded-xl text-lg font-black transition-all flex items-center justify-center cursor-pointer shadow ${
                      userChoice === false
                        ? isCorrect
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                          : 'bg-rose-600 text-white ring-2 ring-rose-400'
                        : 'bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 hover:border-rose-500'
                    }`}
                    title="Judge as False (✗)"
                  >
                    ✗
                  </button>
                </div>
              </div>

              {/* Feedback and Explanation */}
              {isAnswered && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start justify-between gap-4">
                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Correct Judgment!
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" /> Incorrect Judgment
                          </>
                        )}
                      </span>
                      <span className="text-slate-400">
                        (Official Answer:{' '}
                        <strong className="text-amber-300 font-mono">
                          {q.isCorrect ? '✓ True' : '✗ False'}
                        </strong>
                        )
                      </span>
                    </div>
                    <p className="leading-relaxed text-slate-300 pl-5">{q.explanation}</p>
                  </div>

                  <button
                    onClick={() => handleReset(q.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Reset question"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
