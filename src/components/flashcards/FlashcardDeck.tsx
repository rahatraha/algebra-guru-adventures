import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Flashcard as FlashcardType } from '../../types/flashcard';
import { RotateCcw, Eye, EyeOff, ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

interface FlashcardDeckProps {
  cards: FlashcardType[];
  onCardUpdate: (card: FlashcardType) => void;
  onComplete: () => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  onCardUpdate,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());

  const currentCard = cards[currentIndex];
  const progress = (reviewedCards.size / cards.length) * 100;

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else if (reviewedCards.size === cards.length) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleCardReview = (quality: number) => {
    if (!currentCard) return;

    // Обновляем карточку с помощью SM-2 алгоритма
    import('../../services/flashcardService').then(({ FlashcardService }) => {
      const updatedCard = FlashcardService.updateCardAfterReview(currentCard, quality);
      onCardUpdate(updatedCard);
    });

    setReviewedCards(prev => new Set(prev).add(currentIndex));
    
    // Автоматически переходим к следующей карточке
    setTimeout(() => {
      handleNext();
    }, 500);
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

  if (!currentCard) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Отличная работа!</h3>
          <p className="text-muted-foreground text-center">
            Вы завершили изучение всех карточек в этой колоде.
          </p>
          <Button onClick={onComplete} className="mt-4">
            Вернуться к колодам
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Прогресс-бар */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Карточка {currentIndex + 1} из {cards.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% завершено
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Основная карточка */}
      <Card 
        className={`min-h-[400px] cursor-pointer transition-all duration-300 hover:shadow-lg ${
          showAnswer ? 'bg-accent/5' : ''
        }`}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">
              {showAnswer ? 'Ответ' : 'Вопрос'}
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={getDifficultyColor(currentCard.difficulty)}>
                {getDifficultyText(currentCard.difficulty)}
              </Badge>
              {reviewedCards.has(currentIndex) && (
                <Badge variant="outline" className="text-green-600">
                  ✓ Изучено
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
            <div className="text-center mb-4">
              <p className="text-lg leading-relaxed">
                {showAnswer ? currentCard.back : currentCard.front}
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              {showAnswer ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="text-sm">
                {showAnswer ? 'Нажмите для показа вопроса' : 'Нажмите для показа ответа'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Кнопки оценки (показываются только при показе ответа) */}
      {showAnswer && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Насколько легко вам было вспомнить ответ?
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCardReview(1)}
                className="flex-1 max-w-[120px] text-red-600 border-red-200 hover:bg-red-50"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Не знал
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCardReview(3)}
                className="flex-1 max-w-[120px] text-yellow-600 border-yellow-200 hover:bg-yellow-50"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Сложно
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCardReview(4)}
                className="flex-1 max-w-[120px] text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Хорошо
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCardReview(5)}
                className="flex-1 max-w-[120px] text-green-600 border-green-200 hover:bg-green-50"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Легко
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Навигация */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Предыдущая
        </Button>
        
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1 && reviewedCards.size < cards.length}
        >
          Следующая
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Статистика карточки */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="font-medium">{currentCard.reviewCount}</p>
              <p className="text-muted-foreground">Повторений</p>
            </div>
            <div>
              <p className="font-medium">
                {currentCard.reviewCount > 0 
                  ? Math.round((currentCard.successCount / currentCard.reviewCount) * 100)
                  : 0}%
              </p>
              <p className="text-muted-foreground">Успешность</p>
            </div>
            <div>
              <p className="font-medium">{currentCard.interval} дн.</p>
              <p className="text-muted-foreground">Интервал</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};