export type ChapterId = 'all' | 'ch1' | 'ch2' | 'ch3';

export type ExerciseType = 'mc' | 'blanks' | 'judging' | 'matching' | 'reordering' | 'simulations';

export interface ChapterMeta {
  id: ChapterId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  topics: string[];
}

// 1. Multiple Choice (SE4a_u1_01)
export interface MCQuestion {
  id: string;
  code: string;
  chapter: 'ch1' | 'ch2' | 'ch3';
  category: 'knowledge' | 'attitudes';
  question: string;
  options: { id: string; text: string }[];
  correctAnswers: string[]; // ['A'] or multiple like ['A', 'C', 'D']
  isMultipleSelection?: boolean;
  explanation: string;
}

// 2. Fill in the Blanks (SE4a_u1_02)
export interface BlankQuestion {
  id: string;
  code: string;
  chapter: 'ch1' | 'ch2' | 'ch3';
  sentence: string; // contains [BLANK_1], [BLANK_2] etc.
  answers: string[][]; // accepted variations for each blank
  wordBank: string[]; // options to pick from
  hint: string;
  explanation: string;
}

// 3. Judging True / False (SE4a_u1_04)
export interface JudgingQuestion {
  id: string;
  code: string;
  chapter: 'ch1' | 'ch2' | 'ch3';
  category: 'knowledge' | 'attitudes';
  statement: string;
  isCorrect: boolean; // true = ✓, false = ✗
  explanation: string;
}

// 4. Matching (SE4a_u1_07)
export interface MatchingPairItem {
  id: string; // e.g., '1', '2', '3'
  label: string; // e.g. "crust"
  correctTargetIds: string[]; // e.g. ['D'] or multiple ['A', 'E']
}

export interface MatchingTargetItem {
  id: string; // e.g., 'A', 'B', 'C'
  description: string;
}

export interface MatchingQuestion {
  id: string;
  code: string;
  chapter: 'ch1' | 'ch2' | 'ch3';
  title: string;
  instruction: string;
  pairs: MatchingPairItem[];
  targets: MatchingTargetItem[];
  explanation: string;
}

// 5. Reordering (SE4a_u1_08)
export interface ReorderingStep {
  id: string; // e.g. 'A', 'B', 'C', 'D'
  text: string;
}

export interface ReorderingQuestion {
  id: string;
  code: string;
  chapter: 'ch1' | 'ch2' | 'ch3';
  title: string;
  instruction: string;
  items: ReorderingStep[];
  correctOrder: string[]; // e.g. ['C', 'A', 'B']
  explanation: string;
}
