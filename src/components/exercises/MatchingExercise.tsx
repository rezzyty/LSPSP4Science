import React, { useState } from 'react';
import { ChapterId, MatchingQuestion } from '../../types/curriculum';
import { MATCHING_QUESTIONS } from '../../data/unit1Data';
import { sound } from '../../utils/soundManager';
import { CheckCircle2, XCircle, Award, Sparkles, RotateCcw, Link2 } from 'lucide-react';

interface MatchingExerciseProps {
  selectedChapter: ChapterId;
}

export const MatchingExercise: React.FC<MatchingExerciseProps> = ({ selectedChapter }) => {
  const questions = MATCHING_QUESTIONS.filter(
    (q) => selectedChapter === 'all' || q.chapter === selectedChapter
  );

  // Map questionId -> pairId -> targetIds[]
  const [userMatches, setUserMatches] = useState<Record<string, Record<string, string[]>>>({});
  const [activePair, setActivePair] = useState<{ qId: string; pairId: string } | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const handlePairClick = (qId: string, pairId: string) => {
    sound.playClick();
    if (checked[qId]) return;
    if (activePair?.qId === qId && activePair.pairId === pairId) {
      setActivePair(null);
    } else {
      setActivePair({ qId, pairId });
    }
  };

  const handleTargetClick = (qId: string, targetId: string) => {
    if (checked[qId] || !activePair || activePair.qId !== qId) return;
    sound.playClick();

    const currentQMatches = userMatches[qId] || {};
    const currentPairTargets = currentQMatches[activePair.pairId] || [];

    // Toggle targetId for active pair
    const updatedPairTargets = currentPairTargets.includes(targetId)
      ? currentPairTargets.filter((id) => id !== targetId)
      : [...currentPairTargets, targetId];

    setUserMatches({
      ...userMatches,
      [qId]: {
        ...currentQMatches,
        [activePair.pairId]: updatedPairTargets
      }
    });
  };

  const handleRemoveTarget = (qId: string, pairId: string, targetId: string) => {
    if (checked[qId]) return;
    sound.playClick();
    const currentQMatches = userMatches[qId] || {};
    const currentPairTargets = currentQMatches[pairId] || [];

    setUserMatches({
      ...userMatches,
      [qId]: {
        ...currentQMatches,
        [pairId]: currentPairTargets.filter((id) => id !== targetId)
      }
    });
  };

  const handleCheck = (q: MatchingQuestion) => {
    const qMatches = userMatches[q.id] || {};
    let isAllCorrect = true;

    for (const pair of q.pairs) {
      const userSelected = qMatches[pair.id] || [];
      const isPairCorrect =
        userSelected.length === pair.correctTargetIds.length &&
        userSelected.every((id) => pair.correctTargetIds.includes(id));
      if (!isPairCorrect) {
        isAllCorrect = false;
        break;
      }
    }

    if (isAllCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    setChecked({ ...checked, [q.id]: true });
    setActivePair(null);
  };

  const handleReset = (qId: string) => {
    sound.playClick();
    const nextMatches = { ...userMatches };
    delete nextMatches[qId];
    setUserMatches(nextMatches);

    const nextChecked = { ...checked };
    delete nextChecked[qId];
    setChecked(nextChecked);
    setActivePair(null);
  };

  const totalCount = questions.length;
  const answeredCount = questions.filter((q) => checked[q.id]).length;
  const correctCount = questions.filter((q) => {
    if (!checked[q.id]) return false;
    const qMatches = userMatches[q.id] || {};
    return q.pairs.every((pair) => {
      const userSelected = qMatches[pair.id] || [];
      return (
        userSelected.length === pair.correctTargetIds.length &&
        userSelected.every((id) => pair.correctTargetIds.includes(id))
      );
    });
  }).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
              SE4a_u1_07
            </span>
            <h2 className="text-lg font-bold text-white">Matching Exercises (Knowledge & Skills)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Click an item on the left, then click its corresponding definition or feature on the right to match them.
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
          const qMatches = userMatches[q.id] || {};
          const isChecked = checked[q.id];

          const isQuestionCorrect =
            isChecked &&
            q.pairs.every((pair) => {
              const userSelected = qMatches[pair.id] || [];
              return (
                userSelected.length === pair.correctTargetIds.length &&
                userSelected.every((id) => pair.correctTargetIds.includes(id))
              );
            });

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all duration-200 ${
                isChecked
                  ? isQuestionCorrect
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
                      isQuestionCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isQuestionCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Perfect Match!
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" /> Check pairings
                      </>
                    )}
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white mb-1">{q.title}</h3>
              <p className="text-xs text-slate-400 mb-4">{q.instruction}</p>

              {/* Matching Columns Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column: Items to match */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Step 1: Select Item
                  </div>
                  {q.pairs.map((pair) => {
                    const isSelected = activePair?.qId === q.id && activePair.pairId === pair.id;
                    const assignedTargets = qMatches[pair.id] || [];

                    let pairStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';
                    if (isSelected) {
                      pairStyle = 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400';
                    }

                    return (
                      <div
                        key={pair.id}
                        onClick={() => handlePairClick(q.id, pair.id)}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex flex-col justify-between gap-2 ${pairStyle}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{pair.label}</span>
                          {isSelected && (
                            <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">
                              Active
                            </span>
                          )}
                        </div>

                        {/* Badges of assigned targets */}
                        <div className="flex flex-wrap items-center gap-1.5 min-h-[22px]">
                          {assignedTargets.length === 0 ? (
                            <span className="text-[11px] text-slate-500 italic">
                              Click to select, then click right option
                            </span>
                          ) : (
                            assignedTargets.map((tid) => (
                              <span
                                key={tid}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-950 border border-purple-700 text-purple-300 font-mono text-xs font-bold"
                              >
                                <span>{tid}</span>
                                {!isChecked && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveTarget(q.id, pair.id, tid);
                                    }}
                                    className="text-slate-400 hover:text-rose-400 text-[10px] ml-0.5"
                                  >
                                    ✕
                                  </button>
                                )}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: Target options */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Step 2: Assign Description
                  </div>
                  {q.targets.map((target) => {
                    const isActivePairAssigned =
                      activePair?.qId === q.id &&
                      (qMatches[activePair.pairId] || []).includes(target.id);

                    return (
                      <button
                        key={target.id}
                        disabled={isChecked}
                        onClick={() => handleTargetClick(q.id, target.id)}
                        className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer flex items-start gap-3 ${
                          isActivePairAssigned
                            ? 'bg-purple-950/70 border-purple-500 text-purple-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {target.id}
                        </span>
                        <span className="leading-relaxed">{target.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {activePair?.qId === q.id ? 'Now click a letter on the right to match!' : 'Click any item on the left to start.'}
                </span>

                <div className="flex items-center gap-2">
                  {isChecked && (
                    <button
                      onClick={() => handleReset(q.id)}
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
                      Check Matches
                    </button>
                  )}
                </div>
              </div>

              {/* Scientific Explanation on check */}
              {isChecked && (
                <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Scientific Match Guide:</span>
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
