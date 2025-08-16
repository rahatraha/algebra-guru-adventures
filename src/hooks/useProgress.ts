import { useState, useEffect } from 'react';
import { UserProgress, SubjectProgress, TopicProgress, Achievement } from '../types/progress';

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const stored = localStorage.getItem('edu-user-progress');
    if (stored) {
      const parsedProgress = JSON.parse(stored);
      parsedProgress.lastActiveDate = new Date(parsedProgress.lastActiveDate);
      setProgress(parsedProgress);
    } else {
      const initialProgress = createInitialProgress();
      setProgress(initialProgress);
      saveProgress(initialProgress);
    }
    setLoading(false);
  };

  const saveProgress = (progressData: UserProgress) => {
    localStorage.setItem('edu-user-progress', JSON.stringify(progressData));
    setProgress(progressData);
  };

  const addXP = (amount: number, subject?: string) => {
    if (!progress) return;

    const updatedProgress = { ...progress };
    updatedProgress.totalXP += amount;
    updatedProgress.level = calculateLevel(updatedProgress.totalXP);

    if (subject && updatedProgress.subjectProgress[subject]) {
      updatedProgress.subjectProgress[subject].xp += amount;
      updatedProgress.subjectProgress[subject].level = calculateLevel(updatedProgress.subjectProgress[subject].xp);
    }

    // Проверяем достижения
    const newAchievements = checkForNewAchievements(updatedProgress);
    updatedProgress.achievements.push(...newAchievements);

    saveProgress(updatedProgress);
  };

  const updateTopicProgress = (
    subject: string,
    topicId: string,
    updates: Partial<TopicProgress>
  ) => {
    if (!progress) return;

    const updatedProgress = { ...progress };
    
    if (!updatedProgress.subjectProgress[subject]) {
      updatedProgress.subjectProgress[subject] = createInitialSubjectProgress(subject);
    }

    if (!updatedProgress.subjectProgress[subject].topicProgress[topicId]) {
      updatedProgress.subjectProgress[subject].topicProgress[topicId] = createInitialTopicProgress(topicId);
    }

    Object.assign(updatedProgress.subjectProgress[subject].topicProgress[topicId], updates);
    updatedProgress.subjectProgress[subject].topicProgress[topicId].lastStudied = new Date();

    // Обновляем статистику предмета
    const subjectTopics = Object.values(updatedProgress.subjectProgress[subject].topicProgress);
    const completedTopics = subjectTopics.filter(t => t.completed).length;
    const totalScore = subjectTopics.reduce((sum, t) => sum + t.averageScore, 0);
    
    updatedProgress.subjectProgress[subject].topicsCompleted = completedTopics;
    updatedProgress.subjectProgress[subject].averageScore = totalScore / subjectTopics.length || 0;
    updatedProgress.subjectProgress[subject].lastStudied = new Date();

    saveProgress(updatedProgress);
  };

  const updateStreak = () => {
    if (!progress) return;

    const today = new Date();
    const lastActive = new Date(progress.lastActiveDate);
    const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    const updatedProgress = { ...progress };
    
    if (daysDiff === 1) {
      // Продолжаем серию
      updatedProgress.currentStreak += 1;
      updatedProgress.streakDays = updatedProgress.currentStreak;
      
      if (updatedProgress.currentStreak > updatedProgress.longestStreak) {
        updatedProgress.longestStreak = updatedProgress.currentStreak;
      }
    } else if (daysDiff > 1) {
      // Серия прервана
      updatedProgress.currentStreak = 1;
      updatedProgress.streakDays = 1;
    }
    // daysDiff === 0 означает, что уже учились сегодня

    updatedProgress.lastActiveDate = today;
    saveProgress(updatedProgress);
  };

  const addStudyTime = (minutes: number, subject?: string) => {
    if (!progress) return;

    const updatedProgress = { ...progress };
    updatedProgress.weeklyProgress += minutes;

    if (subject && updatedProgress.subjectProgress[subject]) {
      updatedProgress.subjectProgress[subject].timeSpent += minutes;
    }

    saveProgress(updatedProgress);
  };

  const setWeeklyGoal = (minutes: number) => {
    if (!progress) return;

    const updatedProgress = { ...progress };
    updatedProgress.weeklyGoal = minutes;
    saveProgress(updatedProgress);
  };

  return {
    progress,
    loading,
    addXP,
    updateTopicProgress,
    updateStreak,
    addStudyTime,
    setWeeklyGoal,
    reload: loadProgress
  };
};

// Вспомогательные функции

const createInitialProgress = (): UserProgress => ({
  userId: 'local-user',
  totalXP: 0,
  level: 1,
  streakDays: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: new Date(),
  subjectProgress: {},
  achievements: [],
  weeklyGoal: 300, // 5 часов в неделю
  weeklyProgress: 0
});

const createInitialSubjectProgress = (subject: string): SubjectProgress => ({
  subject,
  grade: 1,
  xp: 0,
  level: 1,
  topicsCompleted: 0,
  totalTopics: 0,
  averageScore: 0,
  timeSpent: 0,
  lastStudied: new Date(),
  topicProgress: {}
});

const createInitialTopicProgress = (topicId: string): TopicProgress => ({
  topicId,
  completed: false,
  theoryRead: false,
  examplesCompleted: 0,
  exercisesCompleted: 0,
  interactiveLessonsCompleted: 0,
  flashcardsStudied: 0,
  averageScore: 0,
  timeSpent: 0,
  lastStudied: new Date(),
  masteryLevel: 0
});

const calculateLevel = (xp: number): number => {
  // Каждый уровень требует больше XP
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

const checkForNewAchievements = (progress: UserProgress): Achievement[] => {
  const achievements: Achievement[] = [];
  const existingIds = progress.achievements.map(a => a.id);

  // Достижения за XP
  if (progress.totalXP >= 1000 && !existingIds.includes('xp-1000')) {
    achievements.push({
      id: 'xp-1000',
      title: 'Знаток',
      description: 'Набрать 1000 очков опыта',
      icon: '🌟',
      points: 100,
      unlockedAt: new Date(),
      category: 'study'
    });
  }

  // Достижения за серии
  if (progress.currentStreak >= 7 && !existingIds.includes('streak-7')) {
    achievements.push({
      id: 'streak-7',
      title: 'Неделя знаний',
      description: 'Учиться 7 дней подряд',
      icon: '🔥',
      points: 150,
      unlockedAt: new Date(),
      category: 'streak'
    });
  }

  // Достижения за уровень
  if (progress.level >= 10 && !existingIds.includes('level-10')) {
    achievements.push({
      id: 'level-10',
      title: 'Мастер обучения',
      description: 'Достигнуть 10-го уровня',
      icon: '🏆',
      points: 200,
      unlockedAt: new Date(),
      category: 'study'
    });
  }

  return achievements;
};