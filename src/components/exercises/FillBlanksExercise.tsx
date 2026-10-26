import React, { useState } from 'react';
import { ChapterId } from '../../types/curriculum';
import { BLANK_QUESTIONS } from '../../data/unit1Data';
import { sound } from '../../utils/soundManager';
import { CheckCircle2, XCircle, HelpCircle, Award, Sparkles, RotateCcw } from 'lucide-react';

interface FillBlanksExerciseProps {
  selectedChapter: ChapterId;
}

export const FillBlanksExercise: React.FC<FillBlanksExerciseProps> = ({ selectedChapter }) => {
  const questions = BLANK_QUESTIONS.filter(
    (q) => selectedChapter === 'all' || q.chapter === selectedChapter
  );

  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  const handleWordBankClick = (qId: string, word: string, totalBlanks: number) => {
    sound.playClick();
    const current = answers[qId] || [];
    const updated = [...current];

    // Find first empty slot
    let slotToFill = -1;
    for (let i = 0; i < totalBlanks; i++) {
      if (!updated[i]) {
        slotToFill = i;
        break;
      }
    }

    if (slotToFill !== -1) {
      updated[slotToFill] = word;
      setAnswers({ ...answers, [qId]: updated });
    }
  };

  const handleClearSlot = (qId: string, slotIdx: number) => {
    sound.playClick();
    const current = answers[qId] || [];
    const updated = [...current];
    updated[slotIdx] = '';
    setAnswers({ ...answers, [qId]: updated });
    setChecked({ ...checked, [qId]: false });
  };

  const checkAnswer = (qId: string) => {
    const q = BLANK_QUESTIONS.find((item) => item.id === qId);
    if (!q) return;

    const filled = answers[qId] || [];
    if (filled.length < q.answers.length || filled.some((val) => !val)) {
      return;
    }

    const isAllCorrect = q.answers.every((acceptableList, idx) => {
      const userVal = (filled[idx] || '').trim().toLowerCase();
      return acceptableList.some((acc) => acc.trim().toLowerCase() === userVal);
    });

    if (isAllCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    setChecked({ ...checked, [qId]: true });
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

  const totalCount = questions.length;
  const answeredCount = questions.filter((q) => checked[q.id]).length;
  const correctCount = questions.filter((q) => {
    if (!checked[q.id]) return false;
    const filled = answers[q.id] || [];
    return q.answers.every((acceptableList, idx) => {
      const userVal = (filled[idx] || '').trim().toLowerCase();
      return acceptableList.some((acc) => acc.trim().toLowerCase() === userVal);
    });
  }).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
              SE4a_u1_02
            </span>
            <h2 className="text-lg font-bold text-white">Fill in the Blanks (Knowledge)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Click words from the Word Bank below each question to fill in the missing blanks.
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
      <div className="space-y-5">
        {questions.map((q, index) => {
          const filled = answers[q.id] || [];
          const isChecked = checked[q.id];
          const isAllCorrect =
            isChecked &&
            q.answers.every((acceptableList, idx) => {
              const userVal = (filled[idx] || '').trim().toLowerCase();
              return acceptableList.some((acc) => acc.trim().toLowerCase() === userVal);
            });

          const parts = q.sentence.split(/(\[BLANK_\d+\])/g);

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all duration-200 ${
                isChecked
                  ? isAllCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/60 shadow-emerald-950/10'
                    : 'bg-rose-950/20 border-rose-500/60 shadow-rose-950/10'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Meta */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {q.code} · Q{index + 1}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                    {q.chapter === 'ch1' ? 'Chapter 1' : q.chapter === 'ch2' ? 'Chapter 2' : 'Chapter 3'}
                  </span>
                </div>

                {isChecked && (
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${
                      isAllCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isAllCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Correct!
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" /> Check words
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Formatted Sentence with Interactive Slots */}
              <div className="text-sm sm:text-base text-slate-100 leading-loose py-2">
                {parts.map((part, pIdx) => {
                  const match = part.match(/\[BLANK_(\d+)\]/);
                  if (match) {
                    const slotIndex = parseInt(match[1], 10) - 1;
                    const val = filled[slotIndex] || '';

                    return (
                      <span
                        key={pIdx}
                        className={`inline-flex items-center gap-1.5 mx-1.5 px-3 py-1 rounded-lg border font-bold text-xs sm:text-sm transition-all ${
                          val
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                            : 'bg-slate-950 border-slate-700 text-slate-500 border-dashed'
                        }`}
                      >
                        <span>{val || `[ Blank ${slotIndex + 1} ]`}</span>
                        {val && !isChecked && (
                          <button
                            onClick={() => handleClearSlot(q.id, slotIndex)}
                            className="text-slate-400 hover:text-rose-400 text-xs cursor-pointer font-bold ml-1"
                            title="Remove word"
                          >
                            ✕
                          </button>
                        )}
                      </span>
                    );
                  }
                  return <span key={pIdx}>{part}</span>;
                })}
              </div>

              {/* Word Bank */}
              {!isChecked && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold mr-1">Word Bank:</span>
                  {q.wordBank.map((word, wIdx) => {
                    const isAlreadyUsed = filled.includes(word);
                    return (
                      <button
                        key={wIdx}
                        disabled={isAlreadyUsed}
                        onClick={() => handleWordBankClick(q.id, word, q.answers.length)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          isAlreadyUsed
                            ? 'opacity-40 bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
                            : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 hover:border-amber-400'
                        }`}
                      >
                        + {word}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between">
                <button
                  onClick={() => setShowHint({ ...showHint, [q.id]: !showHint[q.id] })}
                  className="text-xs text-amber-400/80 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint[q.id] ? 'Hide Hint' : 'Need Hint?'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {isChecked && (
                    <button
                      onClick={() => handleReset(q.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Try Again
                    </button>
                  )}

                  {!isChecked && (
                    <button
                      disabled={filled.filter(Boolean).length < q.answers.length}
                      onClick={() => checkAnswer(q.id)}
                      className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow"
                    >
                      Check Answer
                    </button>
                  )}
                </div>
              </div>

              {/* Hint Box */}
              {showHint[q.id] && (
                <div className="mt-3 p-3 rounded-xl bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200">
                  💡 <strong>Hint:</strong> {q.hint}
                </div>
              )}

              {/* Explanation Box */}
              {isChecked && (
                <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Learning Keypoint:</span>
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
