export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  nextReview: Date;
  reviewCount: number;
  successCount: number;
  subject: string;
  topic: string;
  createdAt: Date;
  lastReviewed?: Date;
  easinessFactor: number; // SM-2 algorithm
  interval: number; // days
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  subject: string;
  grade: number;
  cards: Flashcard[];
  createdAt: Date;
  totalCards: number;
  masteredCards: number;
}

export interface StudySession {
  id: string;
  deckId: string;
  cardsStudied: number;
  correctAnswers: number;
  startTime: Date;
  endTime?: Date;
  duration?: number; // minutes
}

export interface FlashcardProgress {
  totalCards: number;
  reviewsDue: number;
  masteredCards: number;
  learningCards: number;
  newCards: number;
  streakDays: number;
  totalStudyTime: number; // minutes
}