import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { InteractiveLesson, QuizQuestion } from '../../types/interactive';
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw } from 'lucide-react';

interface QuizPlayerProps {
  lesson: InteractiveLesson;
  onComplete: (score: number, timeSpent: number) => void;
  onBack: () => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  lesson,
  onComplete,
  onBack
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = lesson.type === 'quiz' ? lesson.content.questions : [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (!showExplanation) {
      setShowExplanation(true);
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const completeQuiz = () => {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;

    const score = Math.round((correctAnswers / questions.length) * 100);
    const timeInMinutes = Math.round(timeSpent / 60);
    
    setIsCompleted(true);
    onComplete(score, timeInMinutes);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: 'Отлично!', color: 'bg-green-100 text-green-800' };
    if (score >= 70) return { text: 'Хорошо!', color: 'bg-blue-100 text-blue-800' };
    if (score >= 50) return { text: 'Удовлетворительно', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Нужно повторить', color: 'bg-red-100 text-red-800' };
  };

  if (isCompleted) {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
    const score = Math.round((correctAnswers / questions.length) * 100);
    const scoreBadge = getScoreBadge(score);
    const isPassed = score >= lesson.requiredScore;

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isPassed ? (
              <Trophy className="w-16 h-16 text-yellow-500" />
            ) : (
              <RotateCcw className="w-16 h-16 text-blue-500" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isPassed ? 'Поздравляем!' : 'Попробуйте еще раз'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}%
            </div>
            <Badge className={scoreBadge.color}>
              {scoreBadge.text}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
              <p className="text-sm text-muted-foreground">Правильных ответов</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{questions.length - correctAnswers}</p>
              <p className="text-sm text-muted-foreground">Неправильных ответов</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{formatTime(timeSpent)}</p>
              <p className="text-sm text-muted-foreground">Время</p>
            </div>
          </div>

          {isPassed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800">
                Вы набрали {lesson.points} очков опыта!
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={restartQuiz}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Пройти заново
            </Button>
            <Button onClick={onBack}>
              Вернуться к урокам
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Заголовок и прогресс */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{lesson.title}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(timeSpent)}
              </div>
              <Badge variant="outline">
                {currentQuestionIndex + 1} / {questions.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Вопрос */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Вопрос {currentQuestionIndex + 1}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            {currentQuestion.question}
          </p>

          {currentQuestion.image && (
            <div className="flex justify-center">
              <img
                src={currentQuestion.image}
                alt="Изображение к вопросу"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showResult = showExplanation;

              let buttonClass = "w-full text-left p-4 border border-border hover:bg-accent/50";
              
              if (showResult) {
                if (isCorrect) {
                  buttonClass += " bg-green-50 border-green-200 text-green-800";
                } else if (isSelected && !isCorrect) {
                  buttonClass += " bg-red-50 border-red-200 text-red-800";
                }
              } else if (isSelected) {
                buttonClass += " bg-primary/10 border-primary";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showExplanation}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && (
                      <span className="ml-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : isSelected && !isCorrect ? (
                          <XCircle className="w-5 h-5 text-red-600" />
                        ) : null}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && currentQuestion.explanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>Объяснение:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Навигация */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Назад
        </Button>

        <Button
          onClick={handleNextQuestion}
          disabled={!showExplanation && selectedAnswers[currentQuestionIndex] === undefined}
        >
          {!showExplanation
            ? 'Проверить'
            : currentQuestionIndex === questions.length - 1
            ? 'Завершить'
            : 'Далее'
          }
        </Button>
      </div>
    </div>
  );
};