import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { QuizPlayer } from '../components/interactive/QuizPlayer';
import { InteractiveLesson, LessonProgress } from '../types/interactive';
import { ContentGeneratorService } from '../services/contentGenerator';
import { useProgress } from '../hooks/useProgress';
import * as subjects from '../data/subjects';
import { Play, Clock, Trophy, Star, BookOpen, Target } from 'lucide-react';

export default function InteractiveLessons() {
  const navigate = useNavigate();
  const { addXP, addStudyTime, updateTopicProgress } = useProgress();
  const [lessons, setLessons] = useState<InteractiveLesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<InteractiveLesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateLessons();
    loadProgress();
  }, []);

  const generateLessons = async () => {
    setLoading(true);
    const generatedLessons: InteractiveLesson[] = [];

    // Генерируем уроки для каждого предмета
    for (const [subjectKey, subjectData] of Object.entries(subjects)) {
      for (const [gradeStr, gradeData] of Object.entries(subjectData)) {
        const grade = parseInt(gradeStr);
        for (const topicKey of Object.keys(gradeData)) {
          try {
            const lesson = await ContentGeneratorService.generateInteractiveLesson(
              subjectKey,
              topicKey,
              grade
            );
            generatedLessons.push(lesson);
          } catch (error) {
            console.error(`Error generating lesson for ${subjectKey}/${topicKey}:`, error);
          }
        }
      }
    }

    setLessons(generatedLessons);
    setLoading(false);
  };

  const loadProgress = () => {
    const stored = localStorage.getItem('edu-lesson-progress');
    if (stored) {
      const progress = JSON.parse(stored);
      // Восстанавливаем даты
      Object.values(progress).forEach((lesson: any) => {
        lesson.lastAttempt = new Date(lesson.lastAttempt);
      });
      setLessonProgress(progress);
    }
  };

  const saveProgress = (progress: Record<string, LessonProgress>) => {
    localStorage.setItem('edu-lesson-progress', JSON.stringify(progress));
    setLessonProgress(progress);
  };

  const startLesson = (lesson: InteractiveLesson) => {
    setSelectedLesson(lesson);
    setIsPlaying(true);
  };

  const handleLessonComplete = (score: number, timeSpent: number) => {
    if (!selectedLesson) return;

    const lesson = selectedLesson;
    const currentProgress = lessonProgress[lesson.id] || {
      lessonId: lesson.id,
      completed: false,
      score: 0,
      attempts: 0,
      bestScore: 0,
      timeSpent: 0,
      lastAttempt: new Date()
    };

    const updatedProgress = {
      ...currentProgress,
      completed: score >= lesson.requiredScore,
      score,
      attempts: currentProgress.attempts + 1,
      bestScore: Math.max(currentProgress.bestScore, score),
      timeSpent: currentProgress.timeSpent + timeSpent,
      lastAttempt: new Date()
    };

    const newProgressMap = {
      ...lessonProgress,
      [lesson.id]: updatedProgress
    };

    saveProgress(newProgressMap);

    // Добавляем XP и время изучения
    if (updatedProgress.completed) {
      addXP(lesson.points, lesson.subject);
      
      // Обновляем прогресс по теме
      updateTopicProgress(lesson.subject, lesson.topic, {
        interactiveLessonsCompleted: 1
      });
    }
    
    addStudyTime(timeSpent, lesson.subject);

    setIsPlaying(false);
    setSelectedLesson(null);
  };

  const handleBack = () => {
    setIsPlaying(false);
    setSelectedLesson(null);
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-orange-100 text-orange-800';
      case 5: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: number) => {
    const texts = ['', 'Легко', 'Просто', 'Средне', 'Сложно', 'Очень сложно'];
    return texts[difficulty] || 'Неизвестно';
  };

  const getSubjectName = (subject: string) => {
    const names = {
      'mathematics': 'Математика',
      'russian': 'Русский язык',
      'kazakh': 'Казахский язык',
      'english': 'Английский язык',
      'history': 'История',
      'geography': 'География'
    };
    return names[subject] || subject;
  };

  if (isPlaying && selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <QuizPlayer
            lesson={selectedLesson}
            onComplete={handleLessonComplete}
            onBack={handleBack}
          />
        </div>
      </div>
    );
  }

  const completedLessons = Object.values(lessonProgress).filter(p => p.completed).length;
  const totalScore = Object.values(lessonProgress).reduce((sum, p) => sum + p.bestScore, 0);
  const averageScore = completedLessons > 0 ? Math.round(totalScore / completedLessons) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Интерактивные уроки</h1>
          <p className="text-muted-foreground">
            Изучайте материал с помощью интерактивных викторин и упражнений
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{lessons.length}</p>
              <p className="text-sm text-muted-foreground">Всего уроков</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{completedLessons}</p>
              <p className="text-sm text-muted-foreground">Завершено</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold">{averageScore}%</p>
              <p className="text-sm text-muted-foreground">Средний балл</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">
                {lessons.length > 0 ? Math.round((completedLessons / lessons.length) * 100) : 0}%
              </p>
              <p className="text-sm text-muted-foreground">Прогресс</p>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Загрузка интерактивных уроков...</p>
          </div>
        ) : lessons.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Уроки не найдены</h3>
              <p className="text-muted-foreground mb-4">
                Не удалось сгенерировать интерактивные уроки
              </p>
              <Button onClick={generateLessons}>
                Попробовать снова
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => {
              const progress = lessonProgress[lesson.id];
              const isCompleted = progress?.completed || false;
              const bestScore = progress?.bestScore || 0;
              const attempts = progress?.attempts || 0;

              return (
                <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {getSubjectName(lesson.subject)} • {lesson.grade} класс
                        </p>
                      </div>
                      {isCompleted && (
                        <Trophy className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {lesson.description}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      <Badge className={getDifficultyColor(lesson.difficulty)}>
                        {getDifficultyText(lesson.difficulty)}
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {lesson.estimatedTime} мин
                      </Badge>
                      <Badge variant="outline">
                        {lesson.points} XP
                      </Badge>
                    </div>

                    {progress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Лучший результат</span>
                          <span className={bestScore >= lesson.requiredScore ? 'text-green-600' : 'text-orange-600'}>
                            {bestScore}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Попыток</span>
                          <span>{attempts}</span>
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      onClick={() => startLesson(lesson)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isCompleted ? 'Пройти заново' : 'Начать урок'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}