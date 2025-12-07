import { supabase } from "@/integrations/supabase/client";

export interface GeneratedContent {
  id?: string;
  subject: string;
  grade: number;
  topic_id: string;
  topic_name: string;
  theory?: string;
  examples?: Array<{ problem: string; solution: string }>;
  exercises?: Array<{ problem: string; answer: string }>;
  video_links?: string[];
  notes?: string[];
  language: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface FlashcardData {
  front: string;
  back: string;
}

export class ContentService {
  // Get cached content from database
  static async getCachedContent(
    subject: string,
    grade: number,
    topicId: string,
    language: string = 'ru'
  ): Promise<GeneratedContent | null> {
    const { data, error } = await supabase
      .from('generated_content')
      .select('*')
      .eq('subject', subject)
      .eq('grade', grade)
      .eq('topic_id', topicId)
      .eq('language', language)
      .single();

    if (error || !data) return null;
    
    return {
      ...data,
      examples: data.examples as Array<{ problem: string; solution: string }>,
      exercises: data.exercises as Array<{ problem: string; answer: string }>,
      video_links: data.video_links as string[],
      notes: data.notes as string[],
    };
  }

  // Save content to database
  static async saveContent(content: GeneratedContent): Promise<void> {
    const { error } = await supabase
      .from('generated_content')
      .upsert({
        subject: content.subject,
        grade: content.grade,
        topic_id: content.topic_id,
        topic_name: content.topic_name,
        theory: content.theory,
        examples: content.examples || [],
        exercises: content.exercises || [],
        video_links: content.video_links || [],
        notes: content.notes || [],
        language: content.language,
      }, {
        onConflict: 'subject,grade,topic_id,language'
      });

    if (error) {
      console.error('Error saving content:', error);
      throw error;
    }
  }

  // Generate content using AI
  static async generateContent(
    type: 'theory' | 'examples' | 'exercises' | 'quiz' | 'flashcards',
    subject: string,
    topic: string,
    grade: number,
    language: string = 'ru'
  ): Promise<any> {
    const { data, error } = await supabase.functions.invoke('generate-content', {
      body: { type, subject, topic, grade, language }
    });

    if (error) {
      console.error('Error generating content:', error);
      throw error;
    }

    return data.content;
  }

  // Generate all content for a topic
  static async generateFullContent(
    subject: string,
    grade: number,
    topicId: string,
    topicName: string,
    language: string = 'ru'
  ): Promise<GeneratedContent> {
    // Check cache first
    const cached = await this.getCachedContent(subject, grade, topicId, language);
    if (cached && cached.theory) {
      return cached;
    }

    // Generate all content types
    const [theory, examples, exercises] = await Promise.all([
      this.generateContent('theory', subject, topicName, grade, language),
      this.generateContent('examples', subject, topicName, grade, language),
      this.generateContent('exercises', subject, topicName, grade, language),
    ]);

    const content: GeneratedContent = {
      subject,
      grade,
      topic_id: topicId,
      topic_name: topicName,
      theory,
      examples,
      exercises,
      language,
    };

    // Save to cache
    await this.saveContent(content);

    return content;
  }

  // Generate quiz for a topic
  static async generateQuiz(
    subject: string,
    topic: string,
    grade: number,
    language: string = 'ru'
  ): Promise<{ questions: QuizQuestion[] }> {
    return this.generateContent('quiz', subject, topic, grade, language);
  }

  // Generate flashcards for a topic
  static async generateFlashcards(
    subject: string,
    topic: string,
    grade: number,
    language: string = 'ru'
  ): Promise<FlashcardData[]> {
    return this.generateContent('flashcards', subject, topic, grade, language);
  }

  // Save interactive lesson to database
  static async saveInteractiveLesson(lesson: {
    title: string;
    subject: string;
    grade: number;
    topicId?: string;
    type: string;
    content: any;
    difficulty: number;
    estimatedTime: number;
    language?: string;
  }): Promise<string> {
    const { data, error } = await supabase
      .from('interactive_lessons')
      .insert({
        title: lesson.title,
        subject: lesson.subject,
        grade: lesson.grade,
        topic_id: lesson.topicId,
        type: lesson.type,
        content: lesson.content,
        difficulty: lesson.difficulty,
        estimated_time: lesson.estimatedTime,
        language: lesson.language || 'ru',
      })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  // Get interactive lessons
  static async getInteractiveLessons(subject?: string, grade?: number): Promise<any[]> {
    let query = supabase.from('interactive_lessons').select('*');
    
    if (subject) query = query.eq('subject', subject);
    if (grade) query = query.eq('grade', grade);
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  // Save flashcard deck to database
  static async saveFlashcardDeck(deck: {
    name: string;
    subject: string;
    grade?: number;
    topicId?: string;
    cards: FlashcardData[];
    language?: string;
  }): Promise<string> {
    // Create deck
    const { data: deckData, error: deckError } = await supabase
      .from('flashcard_decks')
      .insert({
        name: deck.name,
        subject: deck.subject,
        grade: deck.grade,
        topic_id: deck.topicId,
        language: deck.language || 'ru',
      })
      .select('id')
      .single();

    if (deckError) throw deckError;

    // Add cards to deck
    if (deck.cards.length > 0) {
      const cardsToInsert = deck.cards.map(card => ({
        deck_id: deckData.id,
        front: card.front,
        back: card.back,
      }));

      const { error: cardsError } = await supabase
        .from('flashcards')
        .insert(cardsToInsert);

      if (cardsError) throw cardsError;
    }

    return deckData.id;
  }

  // Get flashcard decks
  static async getFlashcardDecks(): Promise<any[]> {
    const { data, error } = await supabase
      .from('flashcard_decks')
      .select(`
        *,
        flashcards (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Update flashcard after review
  static async updateFlashcard(
    cardId: string,
    updates: {
      difficulty?: number;
      interval?: number;
      repetitions?: number;
      ease_factor?: number;
      next_review?: string;
      last_reviewed?: string;
    }
  ): Promise<void> {
    const { error } = await supabase
      .from('flashcards')
      .update(updates)
      .eq('id', cardId);

    if (error) throw error;
  }
}