import React, { useState } from 'react';
import { ChapterId, ReorderingQuestion, ReorderingStep } from '../../types/curriculum';
import { REORDERING_QUESTIONS } from '../../data/unit1Data';
import { sound } from '../../utils/soundManager';
import { CheckCircle2, XCircle, Award, Sparkles, RotateCcw, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';

interface ReorderingExerciseProps {
  selectedChapter: ChapterId;
}

export const ReorderingExercise: React.FC<ReorderingExerciseProps> = ({ selectedChapter }) => {
  const questions = REORDERING_QUESTIONS.filter(
    (q) => selectedChapter === 'all' || q.chapter === selectedChapter
  );

  // Map qId -> current array of Step items
  const [currentOrders, setCurrentOrders] = useState<Record<string, ReorderingStep[]>>(() => {
    const initial: Record<string, ReorderingStep[]> = {};
    REORDERING_QUESTIONS.forEach((q) => {
      // Shuffle initially so it's a real puzzle
      initial[q.id] = [...q.items].sort(() => Math.random() - 0.5);
    });
    return initial;
  });

  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const moveItem = (qId: string, index: number, direction: 'up' | 'down') => {
    sound.playClick();
    if (checked[qId]) return;

    const list = currentOrders[qId] || [];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= list.length) return;

    const updated = [...list];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    setCurrentOrders({ ...currentOrders, [qId]: updated });
  };

  const handleCheck = (q: ReorderingQuestion) => {
    const list = currentOrders[q.id] || [];
    const currentOrderIds = list.map((item) => item.id);
    const isCorrect =
      currentOrderIds.length === q.correctOrder.length &&
      currentOrderIds.every((id, idx) => id === q.correctOrder[idx]);

    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    setChecked({ ...checked, [q.id]: true });
  };

  const handleReset = (q: ReorderingQuestion) => {
    sound.playClick();
    const nextOrders = { ...currentOrders };
    nextOrders[q.id] = [...q.items].sort(() => Math.random() - 0.5);
    setCurrentOrders(nextOrders);

    const nextChecked = { ...checked };
    delete nextChecked[q.id];
    setChecked(nextChecked);
  };

  const totalCount = questions.length;
  const answeredCount = questions.filter((q) => checked[q.id]).length;
  const correctCount = questions.filter((q) => {
    if (!checked[q.id]) return false;
    const list = currentOrders[q.id] || [];
    const currentOrderIds = list.map((item) => item.id);
    return (
      currentOrderIds.length === q.correctOrder.length &&
      currentOrderIds.every((id, idx) => id === q.correctOrder[idx])
    );
  }).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              SE4a_u1_08
            </span>
            <h2 className="text-lg font-bold text-white">Reordering Exercises (Processes & Sequences)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Use the ▲ and ▼ buttons to move the steps into the correct chronological or scientific order.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400">Score:</span>
          <span className="font-mono font-bold text-amber-300">
            {correctCount} / {answeredCount}
          </span>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const list = currentOrders[q.id] || q.items;
          const isChecked = checked[q.id];
          const currentOrderIds = list.map((item) => item.id);
          const isCorrect =
            isChecked &&
            currentOrderIds.length === q.correctOrder.length &&
            currentOrderIds.every((id, idx) => id === q.correctOrder[idx]);

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all duration-200 ${
                isChecked
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/60 shadow-emerald-950/10'
                    : 'bg-rose-950/20 border-rose-500/60 shadow-rose-950/10'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {q.code} · Q{qIndex + 1}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                    {q.chapter === 'ch1' ? 'Chapter 1' : q.chapter === 'ch2' ? 'Chapter 2' : 'Chapter 3'}
                  </span>
                </div>

                {isChecked && (
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${
                      isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Correct Sequence!
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" /> Sequence Incorrect
                      </>
                    )}
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white mb-1">{q.title}</h3>
              <p className="text-xs text-slate-400 mb-4">{q.instruction}</p>

              {/* Interactive Ordering Stack */}
              <div className="space-y-2.5">
                {list.map((step, idx) => (
                  <div
                    key={step.id}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3 transition-colors hover:border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-400 font-mono">
                        ({step.id})
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                        {step.text}
                      </span>
                    </div>

                    {/* Up / Down Reordering Buttons */}
                    {!isChecked && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          disabled={idx === 0}
                          onClick={() => moveItem(q.id, idx, 'up')}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === list.length - 1}
                          onClick={() => moveItem(q.id, idx, 'down')}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Current Order Flow String */}
              <div className="mt-3 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-mono text-slate-300">
                <span className="text-slate-500 font-sans font-semibold">Your Sequence:</span>
                {list.map((step, idx) => (
                  <React.Fragment key={step.id}>
                    <span className="px-2 py-0.5 rounded bg-slate-800 font-bold text-amber-300">
                      {step.id}
                    </span>
                    {idx < list.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {isChecked ? 'Official correct sequence shown below.' : 'Rearrange with the arrow buttons, then submit.'}
                </span>

                <div className="flex items-center gap-2">
                  {isChecked && (
                    <button
                      onClick={() => handleReset(q)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retry
                    </button>
                  )}

                  {!isChecked && (
                    <button
                      onClick={() => handleCheck(q)}
                      className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow"
                    >
                      Verify Sequence
                    </button>
                  )}
                </div>
              </div>

              {/* Scientific Explanation on check */}
              {isChecked && (
                <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">Target Answer:</span>
                    <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700">
                      {q.correctOrder.join(' → ')}
                    </span>
                  </div>
                  <p className="leading-relaxed text-slate-300">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
