-- Create table for generated content
CREATE TABLE public.generated_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  topic_id TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  theory TEXT,
  examples JSONB DEFAULT '[]'::jsonb,
  exercises JSONB DEFAULT '[]'::jsonb,
  video_links JSONB DEFAULT '[]'::jsonb,
  notes JSONB DEFAULT '[]'::jsonb,
  language TEXT DEFAULT 'ru',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(subject, grade, topic_id, language)
);

-- Create table for flashcard decks
CREATE TABLE public.flashcard_decks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade INTEGER,
  topic_id TEXT,
  language TEXT DEFAULT 'ru',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for flashcards
CREATE TABLE public.flashcards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deck_id UUID REFERENCES public.flashcard_decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  difficulty INTEGER DEFAULT 0,
  interval INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  ease_factor REAL DEFAULT 2.5,
  next_review TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_reviewed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for interactive lessons
CREATE TABLE public.interactive_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  topic_id TEXT,
  type TEXT NOT NULL DEFAULT 'quiz',
  content JSONB NOT NULL,
  difficulty INTEGER DEFAULT 1,
  estimated_time INTEGER DEFAULT 10,
  language TEXT DEFAULT 'ru',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public access for now - no auth required)
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactive_lessons ENABLE ROW LEVEL SECURITY;

-- Create public read/write policies (since this is an educational app without auth)
CREATE POLICY "Allow public read access to generated_content" 
ON public.generated_content FOR SELECT USING (true);

CREATE POLICY "Allow public insert to generated_content" 
ON public.generated_content FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to generated_content" 
ON public.generated_content FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to flashcard_decks" 
ON public.flashcard_decks FOR SELECT USING (true);

CREATE POLICY "Allow public insert to flashcard_decks" 
ON public.flashcard_decks FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to flashcard_decks" 
ON public.flashcard_decks FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to flashcard_decks" 
ON public.flashcard_decks FOR DELETE USING (true);

CREATE POLICY "Allow public read access to flashcards" 
ON public.flashcards FOR SELECT USING (true);

CREATE POLICY "Allow public insert to flashcards" 
ON public.flashcards FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to flashcards" 
ON public.flashcards FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to flashcards" 
ON public.flashcards FOR DELETE USING (true);

CREATE POLICY "Allow public read access to interactive_lessons" 
ON public.interactive_lessons FOR SELECT USING (true);

CREATE POLICY "Allow public insert to interactive_lessons" 
ON public.interactive_lessons FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_generated_content_updated_at
BEFORE UPDATE ON public.generated_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_flashcard_decks_updated_at
BEFORE UPDATE ON public.flashcard_decks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();