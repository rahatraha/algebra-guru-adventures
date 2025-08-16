export interface InteractiveLesson {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'dragdrop' | 'fillblanks' | 'matching' | 'sorting';
  subject: string;
  grade: number;
  topic: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: number; // minutes
  content: QuizContent | DragDropContent | FillBlanksContent | MatchingContent | SortingContent;
  points: number;
  requiredScore: number; // percentage
}

export interface QuizContent {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  image?: string;
}

export interface DragDropContent {
  instruction: string;
  items: DragDropItem[];
  dropZones: DropZone[];
}

export interface DragDropItem {
  id: string;
  content: string;
  correctZoneId: string;
  image?: string;
}

export interface DropZone {
  id: string;
  label: string;
  accepts: string[]; // item IDs
}

export interface FillBlanksContent {
  instruction: string;
  text: string; // with {blank} placeholders
  blanks: BlankAnswer[];
}

export interface BlankAnswer {
  id: string;
  correctAnswers: string[];
  hint?: string;
}

export interface MatchingContent {
  instruction: string;
  leftItems: MatchItem[];
  rightItems: MatchItem[];
  correctPairs: [string, string][]; // [leftId, rightId]
}

export interface MatchItem {
  id: string;
  content: string;
  image?: string;
}

export interface SortingContent {
  instruction: string;
  items: SortItem[];
  correctOrder: string[]; // item IDs in correct order
}

export interface SortItem {
  id: string;
  content: string;
  image?: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  attempts: number;
  bestScore: number;
  timeSpent: number; // minutes
  lastAttempt: Date;
}