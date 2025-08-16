import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { FlashcardDeck } from '../components/flashcards/FlashcardDeck';
import { FlashcardDeck as FlashcardDeckType, Flashcard, StudySession } from '../types/flashcard';
import { FlashcardService } from '../services/flashcardService';
import { useProgress } from '../hooks/useProgress';
import { Plus, BookOpen, Calendar, TrendingUp, Play, Download, Upload } from 'lucide-react';

export default function Flashcards() {
  const navigate = useNavigate();
  const { addXP, addStudyTime } = useProgress();
  const [decks, setDecks] = useState<FlashcardDeckType[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeckType | null>(null);
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [isStudying, setIsStudying] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = () => {
    const loadedDecks = FlashcardService.loadDecks();
    setDecks(loadedDecks);
  };

  const startStudySession = (deck: FlashcardDeckType) => {
    setSelectedDeck(deck);
    
    // Получаем карточки для изучения (новые + на повторение)
    const newCards = FlashcardService.getNewCards(deck.cards, 5);
    const reviewCards = FlashcardService.getCardsForReview(deck.cards, 15);
    const allCards = [...newCards, ...reviewCards];
    
    if (allCards.length === 0) {
      alert('Нет карточек для изучения в данный момент!');
      return;
    }
    
    setStudyCards(FlashcardService.shuffleCards(allCards));
    setIsStudying(true);
  };

  const handleCardUpdate = (updatedCard: Flashcard) => {
    if (!selectedDeck) return;

    const updatedDeck = { ...selectedDeck };
    const cardIndex = updatedDeck.cards.findIndex(c => c.id === updatedCard.id);
    
    if (cardIndex >= 0) {
      updatedDeck.cards[cardIndex] = updatedCard;
      
      // Обновляем статистику колоды
      updatedDeck.masteredCards = FlashcardService.getMasteredCards(updatedDeck.cards).length;
      
      FlashcardService.saveDeck(updatedDeck);
      setSelectedDeck(updatedDeck);
      loadDecks();
    }
  };

  const handleStudyComplete = () => {
    if (!selectedDeck) return;

    const session: StudySession = {
      id: `session-${Date.now()}`,
      deckId: selectedDeck.id,
      cardsStudied: studyCards.length,
      correctAnswers: 0, // Можно улучшить, отслеживая правильные ответы
      startTime: new Date(Date.now() - 30 * 60 * 1000), // Примерное время начала
      endTime: new Date(),
      duration: 30 // Примерное время изучения
    };

    FlashcardService.saveStudySession(session);
    
    // Добавляем XP и время изучения
    addXP(studyCards.length * 5, selectedDeck.subject);
    addStudyTime(session.duration || 30, selectedDeck.subject);

    setIsStudying(false);
    setSelectedDeck(null);
    setStudyCards([]);
    loadDecks();
  };

  const createNewDeck = () => {
    navigate('/');
  };

  const exportDeck = (deck: FlashcardDeckType) => {
    const jsonData = FlashcardService.exportDeck(deck);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${deck.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDeck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const deck = FlashcardService.importDeck(jsonData);
        deck.id = `imported-${Date.now()}`;
        FlashcardService.saveDeck(deck);
        loadDecks();
      } catch (error) {
        alert('Ошибка при импорте колоды');
      }
    };
    reader.readAsText(file);
  };

  const getStudyStats = () => {
    const sessions = FlashcardService.loadStudySessions();
    const totalCards = sessions.reduce((sum, s) => sum + s.cardsStudied, 0);
    const totalTime = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    
    return { totalCards, totalTime, sessions: sessions.length };
  };

  if (isStudying && selectedDeck) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <FlashcardDeck
            cards={studyCards}
            onCardUpdate={handleCardUpdate}
            onComplete={handleStudyComplete}
          />
        </div>
      </div>
    );
  }

  const stats = getStudyStats();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Флешкарты</h1>
          <p className="text-muted-foreground">
            Изучайте материал с помощью интерактивных карточек и системы интервального повторения
          </p>
        </div>

        {/* Общая статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{decks.length}</p>
              <p className="text-sm text-muted-foreground">Колод</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{stats.totalCards}</p>
              <p className="text-sm text-muted-foreground">Карточек изучено</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">{stats.sessions}</p>
              <p className="text-sm text-muted-foreground">Сессий</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <p className="text-2xl font-bold">{Math.round(stats.totalTime)}</p>
              <p className="text-sm text-muted-foreground">Минут изучения</p>
            </CardContent>
          </Card>
        </div>

        {/* Действия */}
        <div className="flex gap-4 mb-6">
          <Button onClick={createNewDeck}>
            <Plus className="w-4 h-4 mr-2" />
            Создать колоду
          </Button>
          <label htmlFor="import-deck">
            <Button variant="outline" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Импорт колоды
              </span>
            </Button>
          </label>
          <input
            id="import-deck"
            type="file"
            accept=".json"
            onChange={importDeck}
            className="hidden"
          />
        </div>

        {/* Список колод */}
        {decks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Пока нет колод</h3>
              <p className="text-muted-foreground mb-4">
                Создайте свою первую колоду флешкарт для изучения материала
              </p>
              <Button onClick={createNewDeck}>
                <Plus className="w-4 h-4 mr-2" />
                Создать первую колоду
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => {
              const newCards = FlashcardService.getNewCards(deck.cards).length;
              const reviewCards = FlashcardService.getCardsForReview(deck.cards).length;
              const learningCards = FlashcardService.getLearningCards(deck.cards).length;
              const masteredCards = FlashcardService.getMasteredCards(deck.cards).length;
              const totalDue = newCards + reviewCards;

              return (
                <Card key={deck.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{deck.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {deck.subject} • {deck.grade} класс
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => exportDeck(deck)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {deck.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс изучения</span>
                        <span>{Math.round((masteredCards / deck.totalCards) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(masteredCards / deck.totalCards) * 100} 
                        className="w-full"
                      />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {totalDue > 0 && (
                        <Badge variant="destructive">
                          {totalDue} к изучению
                        </Badge>
                      )}
                      {learningCards > 0 && (
                        <Badge variant="secondary">
                          {learningCards} изучается
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {masteredCards} изучено
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-center">
                      <div>
                        <p className="font-medium text-blue-600">{newCards}</p>
                        <p className="text-muted-foreground">Новых</p>
                      </div>
                      <div>
                        <p className="font-medium text-orange-600">{reviewCards}</p>
                        <p className="text-muted-foreground">На повторение</p>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => startStudySession(deck)}
                      disabled={totalDue === 0}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {totalDue > 0 ? 'Начать изучение' : 'Нет карточек для изучения'}
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