export interface Unit {
  id: string;
  title: string;
  city: string;
  country: string;
  description: string;
  njslsStandards: string[];
  contactName: string;
  contactImage: string;
  backgroundImage: string;
  codePieceImage: string;
  tipId: string;
  missionIntroText: string;
  maxPoints: number;
}

export interface GeneratedQuestion {
  problemText: string;
  answer: number;
  hint: string;
  solution: string;
  steps?: GuidedStep[];
  njslsStandard: string;
}

export interface GuidedStep {
  instruction: string;
  expectedAnswer: number | string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface ProblemSolvingTip {
  id: string;
  title: string;
  description: string;
  steps: string[];
  unitId: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  createdAt: Date;
  hasCompletedTutorial: boolean;
}

export interface UserProgress {
  uid: string;
  units: Record<string, UnitProgress>;
  lastSessionDate: Date;
}

export interface UnitProgress {
  unitId: string;
  status: 'locked' | 'not-started' | 'in-progress' | 'completed';
  timesCompleted: number;
  lastCompletedAt?: Date;
}

export interface SessionState {
  unitId: string;
  points: number;
  questionsAttempted: number;
  questionsCorrectFirstTry: number;
  currentPhase: 'mission-intro' | 'meet-contact' | 'guided' | 'independent' | 'code-reveal' | 'summary';
  guidedQuestionsCompleted: number;
  startedAt: Date;
}

export type QuestionGenerator = (guided: boolean) => GeneratedQuestion;

export interface AttemptResult {
  correct: boolean;
  isFirstAttempt: boolean;
  pointsChange: number;
}
