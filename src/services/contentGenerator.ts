import { TopicContent } from '../data/subjects/types';
import { Flashcard } from '../types/flashcard';
import { InteractiveLesson, QuizContent } from '../types/interactive';

export class ContentGeneratorService {
  private static readonly WIKIPEDIA_API = 'https://ru.wikipedia.org/api/rest_v1/page/summary/';
  private static readonly HUGGING_FACE_API = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';
  private static readonly YOUTUBE_API = 'https://www.googleapis.com/youtube/v3/search';

  // Генерация контента с помощью бесплатных API
  static async generateTheory(subject: string, topic: string, grade: number): Promise<string> {
    try {
      // Сначала пробуем Wikipedia API
      const wikiContent = await this.fetchFromWikipedia(topic);
      if (wikiContent) {
        return this.formatTheoryContent(wikiContent, grade);
      }

      // Fallback - генерируем базовую теорию
      return this.generateBasicTheory(subject, topic, grade);
    } catch (error) {
      console.error('Error generating theory:', error);
      return this.generateBasicTheory(subject, topic, grade);
    }
  }

  static async generateExamples(subject: string, topic: string, grade: number): Promise<Array<{problem: string; solution: string}>> {
    const templates = this.getExampleTemplates(subject, topic, grade);
    
    return templates.map((template, index) => ({
      problem: template.problem,
      solution: template.solution
    }));
  }

  static async generateExercises(subject: string, topic: string, grade: number): Promise<Array<{problem: string; answer: string}>> {
    const templates = this.getExerciseTemplates(subject, topic, grade);
    
    return templates.map(template => ({
      problem: template.problem,
      answer: template.answer
    }));
  }

  static async generateFlashcards(content: TopicContent, subject: string, topic: string): Promise<Flashcard[]> {
    const cards: Flashcard[] = [];
    const now = new Date();

    // Создаем карточки из теории
    const theoryCards = this.extractKeyConceptsFromTheory(content.theory);
    theoryCards.forEach((concept, index) => {
      cards.push({
        id: `${subject}-${topic}-theory-${index}`,
        front: concept.question,
        back: concept.answer,
        difficulty: 3,
        nextReview: now,
        reviewCount: 0,
        successCount: 0,
        subject,
        topic,
        createdAt: now,
        easinessFactor: 2.5,
        interval: 1
      });
    });

    // Создаем карточки из примеров
    content.examples.forEach((example, index) => {
      cards.push({
        id: `${subject}-${topic}-example-${index}`,
        front: example.problem,
        back: example.solution,
        difficulty: 4,
        nextReview: now,
        reviewCount: 0,
        successCount: 0,
        subject,
        topic,
        createdAt: now,
        easinessFactor: 2.5,
        interval: 1
      });
    });

    return cards;
  }

  static async generateInteractiveLesson(subject: string, topic: string, grade: number): Promise<InteractiveLesson> {
    const quizQuestions = await this.generateQuizQuestions(subject, topic, grade);
    
    return {
      id: `${subject}-${topic}-${grade}-quiz`,
      title: `Интерактивная викторина: ${topic}`,
      description: `Проверьте свои знания по теме "${topic}"`,
      type: 'quiz',
      subject,
      grade,
      topic,
      difficulty: this.calculateDifficulty(grade),
      estimatedTime: Math.max(5, quizQuestions.questions.length * 1.5),
      content: quizQuestions,
      points: quizQuestions.questions.length * 10,
      requiredScore: 70
    };
  }

  static async searchVideos(query: string, language: string = 'ru'): Promise<string[]> {
    try {
      // Используем бесплатные источники видео или заранее подготовленные списки
      return this.getPreselectedVideos(query, language);
    } catch (error) {
      console.error('Error searching videos:', error);
      return [];
    }
  }

  // Приватные методы

  private static async fetchFromWikipedia(topic: string): Promise<string | null> {
    try {
      const response = await fetch(`${this.WIKIPEDIA_API}${encodeURIComponent(topic)}`);
      if (!response.ok) return null;
      
      const data = await response.json();
      return data.extract || null;
    } catch (error) {
      console.error('Wikipedia API error:', error);
      return null;
    }
  }

  private static formatTheoryContent(content: string, grade: number): string {
    // Адаптируем контент под возраст
    const sentences = content.split('.');
    const maxSentences = grade <= 5 ? 3 : grade <= 8 ? 5 : 8;
    
    return sentences
      .slice(0, maxSentences)
      .join('. ')
      .replace(/\([^)]*\)/g, '') // убираем скобки
      .trim() + '.';
  }

  private static generateBasicTheory(subject: string, topic: string, grade: number): string {
    const templates = {
      'mathematics': {
        'Сложение и вычитание': 'Сложение - это математическая операция, при которой числа объединяются. Вычитание - это операция, обратная сложению.',
        'Умножение и деление': 'Умножение - это быстрый способ сложения одинаковых чисел. Деление - это операция, обратная умножению.',
        'Дроби': 'Дробь показывает, на сколько равных частей разделено целое число и сколько таких частей взято.'
      },
      'russian': {
        'Имя существительное': 'Имя существительное - это часть речи, которая обозначает предмет, лицо, явление или понятие.',
        'Глагол': 'Глагол - это часть речи, которая обозначает действие или состояние предмета.'
      }
    };

    return templates[subject]?.[topic] || `Изучаем тему "${topic}" в ${grade} классе по предмету ${subject}.`;
  }

  private static getExampleTemplates(subject: string, topic: string, grade: number) {
    // Базовые шаблоны примеров для разных предметов
    const templates = {
      'mathematics': [
        { problem: '5 + 3 = ?', solution: '5 + 3 = 8' },
        { problem: '12 - 4 = ?', solution: '12 - 4 = 8' },
        { problem: '6 × 2 = ?', solution: '6 × 2 = 12' }
      ],
      'russian': [
        { problem: 'Определите род существительного "книга"', solution: 'Книга - женский род (она моя)' },
        { problem: 'Разберите слово "читает" по составу', solution: 'чит-а-ет (корень-суффикс-окончание)' }
      ]
    };

    return templates[subject] || [
      { problem: `Пример задачи по теме ${topic}`, solution: `Решение примера по теме ${topic}` }
    ];
  }

  private static getExerciseTemplates(subject: string, topic: string, grade: number) {
    const templates = {
      'mathematics': [
        { problem: '7 + 5 = ?', answer: '12' },
        { problem: '15 - 8 = ?', answer: '7' },
        { problem: '4 × 3 = ?', answer: '12' }
      ],
      'russian': [
        { problem: 'Какой род у слова "солнце"?', answer: 'средний род' },
        { problem: 'Сколько слогов в слове "медведь"?', answer: '2 слога' }
      ]
    };

    return templates[subject] || [
      { problem: `Упражнение по теме ${topic}`, answer: `Ответ на упражнение` }
    ];
  }

  private static extractKeyConceptsFromTheory(theory: string): Array<{question: string; answer: string}> {
    const sentences = theory.split('.').filter(s => s.trim().length > 20);
    const concepts: Array<{question: string; answer: string}> = [];

    sentences.forEach((sentence, index) => {
      const trimmed = sentence.trim();
      if (trimmed) {
        concepts.push({
          question: `Что такое основное понятие ${index + 1}?`,
          answer: trimmed + '.'
        });
      }
    });

    return concepts.slice(0, 5); // максимум 5 концептов
  }

  private static async generateQuizQuestions(subject: string, topic: string, grade: number): Promise<QuizContent> {
    const questionTemplates = {
      'mathematics': [
        {
          question: 'Сколько будет 8 + 4?',
          options: ['10', '11', '12', '13'],
          correctAnswer: 2,
          explanation: '8 + 4 = 12'
        },
        {
          question: 'Что больше: 15 или 12?',
          options: ['15', '12', 'Равны', 'Не знаю'],
          correctAnswer: 0,
          explanation: '15 больше чем 12'
        }
      ],
      'russian': [
        {
          question: 'Какая часть речи обозначает действие?',
          options: ['Существительное', 'Глагол', 'Прилагательное', 'Наречие'],
          correctAnswer: 1,
          explanation: 'Глагол обозначает действие или состояние'
        }
      ]
    };

    const questions = questionTemplates[subject] || [
      {
        question: `Вопрос по теме ${topic}`,
        options: ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4'],
        correctAnswer: 0,
        explanation: `Объяснение для темы ${topic}`
      }
    ];

    return {
      questions: questions.map((q, index) => ({
        id: `${subject}-${topic}-q${index}`,
        ...q
      }))
    };
  }

  private static calculateDifficulty(grade: number): 1 | 2 | 3 | 4 | 5 {
    if (grade <= 2) return 1;
    if (grade <= 4) return 2;
    if (grade <= 6) return 3;
    if (grade <= 8) return 4;
    return 5;
  }

  private static getPreselectedVideos(query: string, language: string): string[] {
    // Предварительно отобранные образовательные видео по темам
    const videoDatabase = {
      'математика': [
        'dQw4w9WgXcQ', // Пример YouTube ID
        'xyz123abc',
        'abc789def'
      ],
      'русский язык': [
        'abc123xyz',
        'def456ghi',
        'jkl789mno'
      ],
      'default': [
        'educational1',
        'educational2',
        'educational3'
      ]
    };

    const queryLower = query.toLowerCase();
    for (const [key, videos] of Object.entries(videoDatabase)) {
      if (queryLower.includes(key)) {
        return videos.slice(0, 3);
      }
    }

    return videoDatabase.default.slice(0, 3);
  }
}