import { Flashcard, FlashcardDeck, StudySession } from '../types/flashcard';

export class FlashcardService {
  private static readonly STORAGE_KEY = 'edu-flashcards';
  private static readonly DECKS_KEY = 'edu-flashcard-decks';
  private static readonly SESSIONS_KEY = 'edu-study-sessions';

  // SM-2 алгоритм для spaced repetition
  static updateCardAfterReview(card: Flashcard, quality: number): Flashcard {
    const updatedCard = { ...card };
    
    updatedCard.reviewCount += 1;
    updatedCard.lastReviewed = new Date();

    if (quality >= 3) {
      updatedCard.successCount += 1;
      
      if (updatedCard.reviewCount === 1) {
        updatedCard.interval = 1;
      } else if (updatedCard.reviewCount === 2) {
        updatedCard.interval = 6;
      } else {
        updatedCard.interval = Math.round(updatedCard.interval * updatedCard.easinessFactor);
      }
      
      updatedCard.easinessFactor = Math.max(1.3, 
        updatedCard.easinessFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
      );
    } else {
      updatedCard.interval = 1;
      updatedCard.easinessFactor = Math.max(1.3, updatedCard.easinessFactor - 0.2);
    }

    // Обновляем сложность карточки
    const successRate = updatedCard.successCount / updatedCard.reviewCount;
    if (successRate > 0.8) {
      updatedCard.difficulty = Math.max(1, updatedCard.difficulty - 1) as 1 | 2 | 3 | 4 | 5;
    } else if (successRate < 0.5) {
      updatedCard.difficulty = Math.min(5, updatedCard.difficulty + 1) as 1 | 2 | 3 | 4 | 5;
    }

    // Устанавливаем дату следующего повторения
    updatedCard.nextReview = new Date();
    updatedCard.nextReview.setDate(updatedCard.nextReview.getDate() + updatedCard.interval);

    return updatedCard;
  }

  static getCardsForReview(cards: Flashcard[], limit: number = 20): Flashcard[] {
    const now = new Date();
    
    return cards
      .filter(card => card.nextReview <= now)
      .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())
      .slice(0, limit);
  }

  static getNewCards(cards: Flashcard[], limit: number = 5): Flashcard[] {
    return cards
      .filter(card => card.reviewCount === 0)
      .slice(0, limit);
  }

  static getLearningCards(cards: Flashcard[]): Flashcard[] {
    return cards.filter(card => 
      card.reviewCount > 0 && 
      card.reviewCount < 3 && 
      card.interval < 21
    );
  }

  static getMasteredCards(cards: Flashcard[]): Flashcard[] {
    return cards.filter(card => 
      card.reviewCount >= 3 && 
      card.interval >= 21 &&
      card.successCount / card.reviewCount >= 0.8
    );
  }

  // Локальное хранение
  static saveFlashcards(cards: Flashcard[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cards));
  }

  static loadFlashcards(): Flashcard[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    
    return JSON.parse(stored).map((card: any) => ({
      ...card,
      nextReview: new Date(card.nextReview),
      createdAt: new Date(card.createdAt),
      lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : undefined
    }));
  }

  static saveDecks(decks: FlashcardDeck[]): void {
    localStorage.setItem(this.DECKS_KEY, JSON.stringify(decks));
  }

  static loadDecks(): FlashcardDeck[] {
    const stored = localStorage.getItem(this.DECKS_KEY);
    if (!stored) return [];
    
    return JSON.parse(stored).map((deck: any) => ({
      ...deck,
      createdAt: new Date(deck.createdAt),
      cards: deck.cards.map((card: any) => ({
        ...card,
        nextReview: new Date(card.nextReview),
        createdAt: new Date(card.createdAt),
        lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : undefined
      }))
    }));
  }

  static saveDeck(deck: FlashcardDeck): void {
    const decks = this.loadDecks();
    const existingIndex = decks.findIndex(d => d.id === deck.id);
    
    if (existingIndex >= 0) {
      decks[existingIndex] = deck;
    } else {
      decks.push(deck);
    }
    
    this.saveDecks(decks);
  }

  static deleteDeck(deckId: string): void {
    const decks = this.loadDecks();
    const filteredDecks = decks.filter(d => d.id !== deckId);
    this.saveDecks(filteredDecks);
  }

  static saveStudySession(session: StudySession): void {
    const sessions = this.loadStudySessions();
    sessions.push(session);
    localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
  }

  static loadStudySessions(): StudySession[] {
    const stored = localStorage.getItem(this.SESSIONS_KEY);
    if (!stored) return [];
    
    return JSON.parse(stored).map((session: any) => ({
      ...session,
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : undefined
    }));
  }

  static getStudyStats(deckId?: string): {
    totalSessions: number;
    totalCards: number;
    averageScore: number;
    totalTime: number;
  } {
    const sessions = this.loadStudySessions();
    const filteredSessions = deckId 
      ? sessions.filter(s => s.deckId === deckId)
      : sessions;

    if (filteredSessions.length === 0) {
      return { totalSessions: 0, totalCards: 0, averageScore: 0, totalTime: 0 };
    }

    const totalCards = filteredSessions.reduce((sum, s) => sum + s.cardsStudied, 0);
    const correctAnswers = filteredSessions.reduce((sum, s) => sum + s.correctAnswers, 0);
    const totalTime = filteredSessions.reduce((sum, s) => sum + (s.duration || 0), 0);

    return {
      totalSessions: filteredSessions.length,
      totalCards,
      averageScore: totalCards > 0 ? (correctAnswers / totalCards) * 100 : 0,
      totalTime
    };
  }

  static createDeckFromTopic(subject: string, topic: string, grade: number, cards: Flashcard[]): FlashcardDeck {
    const deck: FlashcardDeck = {
      id: `${subject}-${topic}-${grade}-${Date.now()}`,
      name: `${topic} (${grade} класс)`,
      description: `Флешкарты по теме "${topic}" для ${grade} класса по предмету ${subject}`,
      subject,
      grade,
      cards,
      createdAt: new Date(),
      totalCards: cards.length,
      masteredCards: 0
    };

    return deck;
  }

  static shuffleCards(cards: Flashcard[]): Flashcard[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  static exportDeck(deck: FlashcardDeck): string {
    return JSON.stringify(deck, null, 2);
  }

  static importDeck(jsonData: string): FlashcardDeck {
    const deck = JSON.parse(jsonData);
    
    // Восстанавливаем даты
    deck.createdAt = new Date(deck.createdAt);
    deck.cards = deck.cards.map((card: any) => ({
      ...card,
      nextReview: new Date(card.nextReview),
      createdAt: new Date(card.createdAt),
      lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : undefined
    }));

    return deck;
  }
}