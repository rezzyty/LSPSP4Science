export type Language = 'en' | 'zh';

export type GameMode = 'drill' | 'lab' | 'rush' | 'exam' | 'book';

export interface EarthLayer {
  id: 'crust' | 'mantle' | 'core';
  nameEn: string;
  nameZh: string;
  depthEn: string;
  depthZh: string;
  tempEn: string;
  tempZh: string;
  compositionEn: string;
  compositionZh: string;
  featuresEn: string[];
  featuresZh: string[];
  color: string;
  bgGradient: string;
}

export type RockType = 'igneous' | 'sedimentary' | 'metamorphic';

export interface RockInfo {
  id: string;
  nameEn: string;
  nameZh: string;
  type: RockType;
  typeNameEn: string;
  typeNameZh: string;
  formationEn: string;
  formationZh: string;
  hardness: number; // 1 to 3 stars
  grainSize: 'large' | 'medium' | 'fine';
  grainSizeEn: string;
  grainSizeZh: string;
  usesEn: string;
  usesZh: string;
  colorEn: string;
  colorZh: string;
  visualColor: string;
  texturePattern: string;
}

export type SoilType = 'sandy' | 'loam' | 'clay';

export interface SoilInfo {
  id: SoilType;
  nameEn: string;
  nameZh: string;
  particleSize: 'largest' | 'medium-sized' | 'smallest';
  particleSizeRank: number; // 1 = smallest (clay), 2 = medium (loam), 3 = largest (sandy)
  drainageCapacity: 'highest' | 'moderate' | 'lowest';
  drainageRank: number; // 3 = highest (sandy), 2 = moderate (loam), 1 = lowest (clay)
  nutrientRetention: 'lower' | 'moderate' | 'higher';
  suitablePlantEn: string;
  suitablePlantZh: string;
  plantEmoji: string;
  color: string;
  descriptionEn: string;
  descriptionZh: string;
}

export interface QuestionFillBlank {
  id: string;
  code: string;
  textEn: string;
  textZh: string;
  answers: string[][]; // multiple acceptable variations for each blank
  optionsEn: string[];
  optionsZh: string[];
  hintEn: string;
  hintZh: string;
  explanationEn: string;
  explanationZh: string;
}

export interface QuestionJudging {
  id: string;
  code: string;
  statementEn: string;
  statementZh: string;
  isCorrect: boolean; // true = tick ✓, false = cross ✗
  explanationEn: string;
  explanationZh: string;
}

export interface QuestionMC {
  id: string;
  code: string;
  questionEn: string;
  questionZh: string;
  optionsEn: { id: string; text: string }[];
  optionsZh: { id: string; text: string }[];
  correctAnswers: string[]; // can be multiple e.g. ['A', 'C', 'D']
  explanationEn: string;
  explanationZh: string;
}
