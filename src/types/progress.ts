export interface UserProgress {
  userId: string;
  totalXP: number;
  level: number;
  streakDays: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: Date;
  subjectProgress: Record<string, SubjectProgress>;
  achievements: Achievement[];
  weeklyGoal: number; // minutes
  weeklyProgress: number; // minutes
}

export interface SubjectProgress {
  subject: string;
  grade: number;
  xp: number;
  level: number;
  topicsCompleted: number;
  totalTopics: number;
  averageScore: number;
  timeSpent: number; // minutes
  lastStudied: Date;
  topicProgress: Record<string, TopicProgress>;
}

export interface TopicProgress {
  topicId: string;
  completed: boolean;
  theoryRead: boolean;
  examplesCompleted: number;
  exercisesCompleted: number;
  interactiveLessonsCompleted: number;
  flashcardsStudied: number;
  averageScore: number;
  timeSpent: number; // minutes
  lastStudied: Date;
  masteryLevel: number; // 0-100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt: Date;
  category: 'study' | 'streak' | 'score' | 'time' | 'social' | 'special';
}

export interface StudyStats {
  totalStudyTime: number; // minutes
  sessionsCompleted: number;
  averageSessionLength: number; // minutes
  topicsStudied: number;
  exercisesSolved: number;
  quizzesCompleted: number;
  flashcardsReviewed: number;
  accuracyRate: number; // percentage
  improvementRate: number; // percentage
  weakAreas: string[];
  strongAreas: string[];
}