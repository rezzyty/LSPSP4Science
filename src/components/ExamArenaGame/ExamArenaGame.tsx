import React, { useState } from 'react';
import { Language, QuestionFillBlank, QuestionJudging, QuestionMC } from '../../types/game';
import { FILL_BLANK_QUESTIONS, JUDGING_QUESTIONS, ATTITUDE_MC_QUESTIONS } from '../../data/chapter1Data';
import { sound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  ChevronRight,
  Sparkles,
  FileText,
  CheckSquare
} from 'lucide-react';

interface ExamArenaGameProps {
  language: Language;
}

export const ExamArenaGame: React.FC<ExamArenaGameProps> = ({ language }) => {
  const isEn = language === 'en';

  const [examTab, setExamTab] = useState<'blanks' | 'judging' | 'mc' | 'report'>('blanks');

  // Fill in the blanks state: mapping questionId -> array of filled strings
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string[]>>({});
  const [blankChecked, setBlankChecked] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  // Judging state: questionId -> boolean (true for tick, false for cross)
  const [judgingAnswers, setJudgingAnswers] = useState<Record<string, boolean | null>>({});
  const [judgingChecked, setJudgingChecked] = useState<Record<string, boolean>>({});

  // MC state: questionId -> array of selected option IDs
  const [mcAnswers, setMcAnswers] = useState<Record<string, string[]>>({});
  const [mcChecked, setMcChecked] = useState<Record<string, boolean>>({});

  // Fill-in-the-blank handlers
  const handleBlankOptionClick = (q: QuestionFillBlank, optionVal: string, slotIdx: number) => {
    sound.playClick();
    const current = blankAnswers[q.id] || [];
    const updated = [...current];
    updated[slotIdx] = optionVal;
    setBlankAnswers({ ...blankAnswers, [q.id]: updated });
  };

  const handleClearBlank = (qId: string, slotIdx: number) => {
    sound.playClick();
    const current = blankAnswers[qId] || [];
    const updated = [...current];
    updated[slotIdx] = '';
    setBlankAnswers({ ...blankAnswers, [qId]: updated });
    setBlankChecked({ ...blankChecked, [qId]: false });
  };

  const checkBlankQuestion = (q: QuestionFillBlank) => {
    const filled = blankAnswers[q.id] || [];
    if (filled.length < q.answers.length || filled.some((x) => !x)) {
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

    setBlankChecked({ ...blankChecked, [q.id]: true });
  };

  // Judging handlers
  const handleJudgingSelect = (q: QuestionJudging, choice: boolean) => {
    sound.playClick();
    setJudgingAnswers({ ...judgingAnswers, [q.id]: choice });
    setJudgingChecked({ ...judgingChecked, [q.id]: true });

    if (choice === q.isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  // MC handlers
  const handleMcToggle = (q: QuestionMC, optionId: string) => {
    sound.playClick();
    const current = mcAnswers[q.id] || [];
    const updated = current.includes(optionId)
      ? current.filter((x) => x !== optionId)
      : [...current, optionId];
    setMcAnswers({ ...mcAnswers, [q.id]: updated });
  };

  const checkMcQuestion = (q: QuestionMC) => {
    const selected = mcAnswers[q.id] || [];
    const isExact =
      selected.length === q.correctAnswers.length &&
      selected.every((id) => q.correctAnswers.includes(id));

    if (isExact) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
    setMcChecked({ ...mcChecked, [q.id]: true });
  };

  // Calculate statistics for Final Report Card
  const calculateScores = () => {
    let blanksCorrect = 0;
    FILL_BLANK_QUESTIONS.forEach((q) => {
      const filled = blankAnswers[q.id] || [];
      if (blankChecked[q.id]) {
        const isAllCorrect = q.answers.every((acceptableList, idx) => {
          const userVal = (filled[idx] || '').trim().toLowerCase();
          return acceptableList.some((acc) => acc.trim().toLowerCase() === userVal);
        });
        if (isAllCorrect) blanksCorrect++;
      }
    });

    let judgingCorrect = 0;
    JUDGING_QUESTIONS.forEach((q) => {
      if (judgingChecked[q.id] && judgingAnswers[q.id] === q.isCorrect) {
        judgingCorrect++;
      }
    });

    let mcCorrect = 0;
    ATTITUDE_MC_QUESTIONS.forEach((q) => {
      const selected = mcAnswers[q.id] || [];
      if (
        mcChecked[q.id] &&
        selected.length === q.correctAnswers.length &&
        selected.every((id) => q.correctAnswers.includes(id))
      ) {
        mcCorrect++;
      }
    });

    const totalQuestions =
      FILL_BLANK_QUESTIONS.length + JUDGING_QUESTIONS.length + ATTITUDE_MC_QUESTIONS.length;
    const totalCorrect = blanksCorrect + judgingCorrect + mcCorrect;
    const percentage = Math.round((totalCorrect / totalQuestions) * 100);

    let grade = 'B';
    if (percentage >= 90) grade = 'A*';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else grade = 'Needs Practice';

    return {
      blanksCorrect,
      totalBlanks: FILL_BLANK_QUESTIONS.length,
      judgingCorrect,
      totalJudging: JUDGING_QUESTIONS.length,
      mcCorrect,
      totalMc: ATTITUDE_MC_QUESTIONS.length,
      totalCorrect,
      totalQuestions,
      percentage,
      grade
    };
  };

  const results = calculateScores();

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-slate-100 min-h-[620px]">
      {/* Sub-Header Section Tabs */}
      <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sound.playClick();
              setExamTab('blanks');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              examTab === 'blanks'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isEn ? 'Part A: Fill in the Blanks' : '甲部：填空題 (Knowledge)'}</span>
            <span className="text-[10px] font-mono px-1 rounded bg-black/30">
              {Object.values(blankChecked).filter(Boolean).length}/{FILL_BLANK_QUESTIONS.length}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setExamTab('judging');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              examTab === 'judging'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>{isEn ? 'Part B: Judging (✓ / ✗)' : '乙部：是非判斷題 (Judging)'}</span>
            <span className="text-[10px] font-mono px-1 rounded bg-black/30">
              {Object.values(judgingChecked).filter(Boolean).length}/{JUDGING_QUESTIONS.length}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setExamTab('mc');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              examTab === 'mc'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isEn ? 'Part C: Values & Attitudes' : '丙部：價值觀與情意題'}</span>
            <span className="text-[10px] font-mono px-1 rounded bg-black/30">
              {Object.values(mcChecked).filter(Boolean).length}/{ATTITUDE_MC_QUESTIONS.length}
            </span>
          </button>
        </div>

        {/* View Report Card Button */}
        <button
          onClick={() => {
            sound.playClick();
            setExamTab('report');
            if (results.percentage >= 80) {
              confetti({ particleCount: 100, spread: 70 });
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow transition-colors whitespace-nowrap"
        >
          <Award className="w-4 h-4" />
          <span>{isEn ? 'View Report Card' : '查看成績單'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-6 flex-1 overflow-y-auto">
        {/* ======================================================== */}
        {/* PART A: FILL IN THE BLANKS */}
        {/* ======================================================== */}
        {examTab === 'blanks' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-amber-400">
                {isEn ? 'Part A: Fill in the Blanks (Knowledge & Understanding)' : '甲部：填空題（認識與理解）'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Select and click the word chips below each sentence to fill the blanks, then press "Submit Answer".'
                  : '從句子下方的詞彙庫中點選適當的詞彙填入空格，完成後按「核對答案」。'}
              </p>
            </div>

            <div className="space-y-6">
              {FILL_BLANK_QUESTIONS.map((q, qIndex) => {
                const filled = blankAnswers[q.id] || [];
                const isChecked = blankChecked[q.id];
                const isAllCorrect =
                  isChecked &&
                  q.answers.every((acceptableList, idx) => {
                    const userVal = (filled[idx] || '').trim().toLowerCase();
                    return acceptableList.some((acc) => acc.trim().toLowerCase() === userVal);
                  });

                // Split sentence template by [BLANK_X]
                const parts = (isEn ? q.textEn : q.textZh).split(/(\[BLANK_\d+\])/g);

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isChecked
                        ? isAllCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/60'
                          : 'bg-rose-950/20 border-rose-500/60'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-slate-500">
                        {q.code} · Q{qIndex + 1}
                      </span>
                      {isChecked && (
                        <span
                          className={`text-xs font-bold flex items-center gap-1 ${
                            isAllCorrect ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isAllCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{isEn ? 'Correct!' : '答對了！'}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              <span>{isEn ? 'Incorrect' : '未完全正確'}</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>

                    {/* Formatted Sentence with Interactive Blank Slots */}
                    <div className="text-sm text-slate-100 leading-loose">
                      {parts.map((part, pIdx) => {
                        const match = part.match(/\[BLANK_(\d+)\]/);
                        if (match) {
                          const slotIndex = parseInt(match[1], 10) - 1;
                          const currentVal = filled[slotIndex] || '';

                          return (
                            <span
                              key={pIdx}
                              className={`inline-flex items-center gap-1 mx-1 px-2.5 py-0.5 rounded-md border-b-2 font-bold text-xs transition-colors ${
                                currentVal
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                                  : 'bg-slate-800/80 border-slate-600 text-slate-500 italic'
                              }`}
                            >
                              <span>{currentVal || `[__${slotIndex + 1}__]`}</span>
                              {currentVal && (
                                <button
                                  onClick={() => handleClearBlank(q.id, slotIndex)}
                                  className="text-slate-400 hover:text-rose-400 text-[10px] ml-0.5 cursor-pointer"
                                  title={isEn ? 'Clear' : '清除'}
                                >
                                  ×
                                </button>
                              )}
                            </span>
                          );
                        }
                        return <span key={pIdx}>{part}</span>;
                      })}
                    </div>

                    {/* Word Bank Chips */}
                    <div className="mt-4 pt-3 border-t border-slate-800/70 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {isEn ? 'Word Bank:' : '可選詞彙庫:'}
                      </span>
                      {(isEn ? q.optionsEn : q.optionsZh).map((opt, oIdx) => {
                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              // Find first empty slot
                              const firstEmpty = Array.from(
                                { length: q.answers.length },
                                (_, i) => i
                              ).find((i) => !filled[i]);
                              if (firstEmpty !== undefined) {
                                handleBlankOptionClick(q, opt, firstEmpty);
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400 text-xs text-slate-200 transition-colors cursor-pointer font-medium"
                          >
                            + {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Action Bar: Check, Hint, Explanation */}
                    <div className="mt-3 flex items-center justify-between pt-2">
                      <button
                        onClick={() => setShowHint({ ...showHint, [q.id]: !showHint[q.id] })}
                        className="text-xs text-amber-400/80 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{showHint[q.id] ? (isEn ? 'Hide Hint' : '隱藏提示') : (isEn ? 'Need Hint?' : '需要提示？')}</span>
                      </button>

                      <button
                        onClick={() => checkBlankQuestion(q)}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
                      >
                        {isEn ? 'Check Answer' : '核對答案'}
                      </button>
                    </div>

                    {/* Hint Box */}
                    {showHint[q.id] && (
                      <div className="mt-2 p-2.5 bg-amber-950/40 border border-amber-700/60 rounded-lg text-xs text-amber-200">
                        💡 {isEn ? q.hintEn : q.hintZh}
                      </div>
                    )}

                    {/* Explanation Box on check */}
                    {isChecked && (
                      <div className="mt-2 p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                        📖 <span className="font-bold text-white">{isEn ? 'Explanation:' : '常識詳解：'}</span>{' '}
                        {isEn ? q.explanationEn : q.explanationZh}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PART B: JUDGING (TRUE / FALSE) */}
        {/* ======================================================== */}
        {examTab === 'judging' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-amber-400">
                {isEn ? 'Part B: Judging (True ✓ / False ✗)' : '乙部：是非題（判斷對錯）'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Judge whether each statement about Chapter 1 is scientifically correct (✓) or incorrect (✗).'
                  : '判斷以下有關第一課的各項陳述是否正確，正確選「✓」，錯誤選「✗」。'}
              </p>
            </div>

            <div className="space-y-4">
              {JUDGING_QUESTIONS.map((q, idx) => {
                const userChoice = judgingAnswers[q.id];
                const isChecked = judgingChecked[q.id];
                const isCorrect = isChecked && userChoice === q.isCorrect;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isChecked
                        ? isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/60'
                          : 'bg-rose-950/20 border-rose-500/60'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-mono text-slate-500 block mb-1">
                          {q.code} · Q{idx + 1}
                        </span>
                        <p className="text-sm font-medium text-slate-100 leading-relaxed">
                          {isEn ? q.statementEn : q.statementZh}
                        </p>
                      </div>

                      {/* Choice Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleJudgingSelect(q, true)}
                          className={`w-11 h-10 rounded-xl font-black text-base transition-all cursor-pointer flex items-center justify-center ${
                            userChoice === true
                              ? q.isCorrect
                                ? 'bg-emerald-600 text-white shadow-lg'
                                : 'bg-rose-600 text-white shadow-lg'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          }`}
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => handleJudgingSelect(q, false)}
                          className={`w-11 h-10 rounded-xl font-black text-base transition-all cursor-pointer flex items-center justify-center ${
                            userChoice === false
                              ? !q.isCorrect
                                ? 'bg-emerald-600 text-white shadow-lg'
                                : 'bg-rose-600 text-white shadow-lg'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          }`}
                        >
                          ✗
                        </button>
                      </div>
                    </div>

                    {/* Explanation */}
                    {isChecked && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-300">
                        <span className="font-bold text-amber-400">
                          {isCorrect ? '✅ ' + (isEn ? 'Correct!' : '正確！') : '❌ ' + (isEn ? 'Incorrect' : '解答錯誤')}
                        </span>{' '}
                        {isEn ? q.explanationEn : q.explanationZh}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PART C: MULTIPLE CHOICE (VALUES & ATTITUDES) */}
        {/* ======================================================== */}
        {examTab === 'mc' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-amber-400">
                {isEn ? 'Part C: Multiple Choice (Values & Attitudes)' : '丙部：情意與價值觀選擇題'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Answer the multiple-choice questions on cherishing geological resources and geopark conservation.'
                  : '珍惜地質資源、保護香港地質公園與土壤環境的選擇題。'}
              </p>
            </div>

            <div className="space-y-6">
              {ATTITUDE_MC_QUESTIONS.map((q, idx) => {
                const selected = mcAnswers[q.id] || [];
                const isChecked = mcChecked[q.id];
                const isExact =
                  isChecked &&
                  selected.length === q.correctAnswers.length &&
                  selected.every((id) => q.correctAnswers.includes(id));

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isChecked
                        ? isExact
                          ? 'bg-emerald-950/20 border-emerald-500/60'
                          : 'bg-rose-950/20 border-rose-500/60'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-slate-500">
                        {q.code} · Q{idx + 1}
                      </span>
                      {isChecked && (
                        <span
                          className={`text-xs font-bold ${
                            isExact ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isExact ? (isEn ? '✓ Full Marks' : '✓ 完全正確') : (isEn ? 'Review Answers' : '請再檢視')}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white mb-3 leading-snug">
                      {isEn ? q.questionEn : q.questionZh}
                    </h4>

                    {/* Options list */}
                    <div className="space-y-2">
                      {(isEn ? q.optionsEn : q.optionsZh).map((opt) => {
                        const isChosen = selected.includes(opt.id);
                        const isTarget = q.correctAnswers.includes(opt.id);

                        let optStyle = 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700';
                        if (isChecked) {
                          if (isTarget) {
                            optStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isChosen && !isTarget) {
                            optStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                          }
                        } else if (isChosen) {
                          optStyle = 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold';
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleMcToggle(q, opt.id)}
                            className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded font-mono text-[11px] font-bold bg-slate-900 flex items-center justify-center">
                                {opt.id}
                              </span>
                              <span>{opt.text}</span>
                            </span>
                            {isChosen && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit check button */}
                    <div className="mt-3 text-right">
                      <button
                        onClick={() => checkMcQuestion(q)}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
                      >
                        {isEn ? 'Submit' : '確認提交'}
                      </button>
                    </div>

                    {/* Explanation */}
                    {isChecked && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-300">
                        📖 <span className="font-bold text-white">{isEn ? 'Learning Note:' : '學習重點：'}</span>{' '}
                        {isEn ? q.explanationEn : q.explanationZh}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* REPORT CARD MODAL / TAB */}
        {/* ======================================================== */}
        {examTab === 'report' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-scale-up">
            <div className="p-6 bg-slate-950 rounded-2xl border-2 border-amber-500/60 shadow-2xl text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-3xl">
                🎓
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  {isEn ? 'Hong Kong Primary 4 Science Report Card' : '香港小學校本小四科學科 成績報告單'}
                </h3>
                <p className="text-xs text-amber-400 font-semibold mt-0.5">
                  {isEn ? 'Unit 1 · Chapter 1: Structure of the Earth' : '第一單元 · 第一課：地球的結構'}
                </p>
              </div>

              {/* Big Grade Display */}
              <div className="py-4 border-y border-slate-800 flex items-center justify-around">
                <div>
                  <span className="text-xs text-slate-400 block">{isEn ? 'Final Score' : '總成績'}</span>
                  <span className="text-3xl font-black text-amber-400 font-mono">
                    {results.percentage}%
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">{isEn ? 'Academic Grade' : '評級'}</span>
                  <span className="text-3xl font-black text-emerald-400 font-mono">
                    {results.grade}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">{isEn ? 'Mastery' : '掌握度'}</span>
                  <span className="text-xs font-bold text-cyan-300 block mt-2">
                    {results.totalCorrect} / {results.totalQuestions} {isEn ? 'Questions' : '題答對'}
                  </span>
                </div>
              </div>

              {/* Breakdown by Sections */}
              <div className="space-y-2 text-xs text-left">
                <div className="p-3 bg-slate-900 rounded-lg flex items-center justify-between border border-slate-800">
                  <span>{isEn ? 'Part A: Fill in the Blanks (14 Questions)' : '甲部：填空題 (14 題)'}</span>
                  <span className="font-mono font-bold text-amber-400">
                    {results.blanksCorrect} / {results.totalBlanks}
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg flex items-center justify-between border border-slate-800">
                  <span>{isEn ? 'Part B: Judging True/False (12 Questions)' : '乙部：是非判斷題 (12 題)'}</span>
                  <span className="font-mono font-bold text-amber-400">
                    {results.judgingCorrect} / {results.totalJudging}
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg flex items-center justify-between border border-slate-800">
                  <span>{isEn ? 'Part C: Values & Attitudes (3 Questions)' : '丙部：價值觀與情意題 (3 題)'}</span>
                  <span className="font-mono font-bold text-amber-400">
                    {results.mcCorrect} / {results.totalMc}
                  </span>
                </div>
              </div>

              {/* Guidance advice */}
              <p className="text-xs text-slate-400 leading-relaxed italic">
                {results.percentage >= 80
                  ? isEn
                    ? 'Outstanding! You have thoroughly mastered Chapter 1: Earth Layers, Rocks, Soil, and Geopark ethics!'
                    : '極為優異！你已全面精通地球三大圈層、三大類岩石、土壤透水特性與地質公園愛護原則！'
                  : isEn
                    ? 'Keep up the good effort! Review the Textbook Guide to reinforce rock classification and soil drainage.'
                    : '再接再厲！建議點擊上方「課本筆記」複習三大類岩石成因與土壤透水性對比！'}
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setExamTab('blanks');
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
                >
                  {isEn ? 'Review Questions' : '檢視題庫解答'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
