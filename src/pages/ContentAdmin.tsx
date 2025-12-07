import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { ContentService } from "@/services/contentService";
import { toast } from "sonner";
import { Loader2, BookOpen, Brain, FileText, CheckCircle2, AlertCircle } from "lucide-react";

// Topics for each subject and grade
const TOPICS_MAP: Record<string, Record<number, string[]>> = {
  mathematics: {
    1: ['Числа от 1 до 10', 'Сложение и вычитание', 'Геометрические фигуры', 'Сравнение чисел', 'Задачи'],
    2: ['Числа до 100', 'Умножение', 'Деление', 'Уравнения', 'Периметр'],
    3: ['Числа до 1000', 'Внетабличное умножение', 'Деление с остатком', 'Площадь', 'Доли'],
    4: ['Многозначные числа', 'Величины', 'Умножение многозначных', 'Деление многозначных', 'Скорость'],
    5: ['Натуральные числа', 'Дроби', 'Десятичные дроби', 'Проценты', 'Геометрия'],
    6: ['Делимость чисел', 'Рациональные числа', 'Пропорции', 'Координаты', 'Симметрия'],
    7: ['Алгебраические выражения', 'Линейные уравнения', 'Функции', 'Степени', 'Многочлены'],
    8: ['Квадратные уравнения', 'Неравенства', 'Квадратный корень', 'Дробные уравнения', 'Теорема Пифагора'],
    9: ['Системы уравнений', 'Прогрессии', 'Степенная функция', 'Тригонометрия', 'Площади фигур'],
    10: ['Тригонометрические функции', 'Логарифмы', 'Производная', 'Стереометрия', 'Векторы'],
    11: ['Интегралы', 'Показательные уравнения', 'Логарифмические уравнения', 'Комбинаторика', 'Теория вероятностей'],
  },
  russian: {
    1: ['Алфавит', 'Звуки и буквы', 'Слоги', 'Ударение', 'Предложение'],
    2: ['Части речи', 'Имя существительное', 'Глагол', 'Имя прилагательное', 'Текст'],
    3: ['Состав слова', 'Правописание приставок', 'Падежи', 'Склонение', 'Однородные члены'],
    4: ['Спряжение глаголов', 'Наречие', 'Местоимение', 'Сложные предложения', 'Прямая речь'],
    5: ['Фонетика', 'Лексика', 'Морфемика', 'Синтаксис', 'Пунктуация'],
    6: ['Словообразование', 'Имя числительное', 'Причастие', 'Деепричастие', 'Стили речи'],
    7: ['Союзы', 'Предлоги', 'Частицы', 'Междометия', 'Морфология'],
    8: ['Словосочетание', 'Главные члены', 'Второстепенные члены', 'Односоставные предложения', 'Обособление'],
    9: ['Сложносочинённые предложения', 'Сложноподчинённые предложения', 'Бессоюзные предложения', 'Цитаты', 'Изложение'],
  },
  history: {
    5: ['Древний Египет', 'Древняя Греция', 'Древний Рим', 'Первобытное общество', 'Древний Восток'],
    6: ['Средневековье', 'Византия', 'Арабский халифат', 'Крестовые походы', 'Возрождение'],
    7: ['Великие географические открытия', 'Реформация', 'Абсолютизм', 'Английская революция', 'Просвещение'],
    8: ['Великая французская революция', 'Наполеон', 'Промышленный переворот', 'Национализм', 'Колониализм'],
    9: ['Первая мировая война', 'Революции 1917', 'Вторая мировая война', 'Холодная война', 'Современный мир'],
  },
  geography: {
    5: ['Земля во Вселенной', 'План и карта', 'Литосфера', 'Гидросфера', 'Атмосфера'],
    6: ['Население Земли', 'Биосфера', 'Почвы', 'Природные зоны', 'Океаны'],
    7: ['Африка', 'Австралия', 'Южная Америка', 'Северная Америка', 'Евразия'],
    8: ['Казахстан: географическое положение', 'Рельеф Казахстана', 'Климат Казахстана', 'Воды Казахстана', 'Природные ресурсы'],
    9: ['Экономическая география', 'Население мира', 'Мировое хозяйство', 'Глобальные проблемы', 'Регионы мира'],
  },
  kazakh: {
    1: ['Әліпби', 'Дыбыстар', 'Буындар', 'Сөздер', 'Сөйлемдер'],
    2: ['Сөз таптары', 'Зат есім', 'Етістік', 'Сын есім', 'Мәтін'],
    3: ['Сөз құрамы', 'Жұрнақтар', 'Септіктер', 'Көптік жалғау', 'Тәуелдік жалғау'],
    4: ['Етістік шақтары', 'Үстеу', 'Есімдік', 'Құрмалас сөйлем', 'Төл сөз'],
    5: ['Фонетика', 'Лексика', 'Морфология', 'Синтаксис', 'Пунктуация'],
  },
  english: {
    1: ['Алфавит', 'Приветствия', 'Цвета', 'Числа', 'Семья'],
    2: ['Present Simple', 'Множественное число', 'Местоимения', 'Вопросы', 'Еда'],
    3: ['Past Simple', 'Предлоги', 'Модальные глаголы', 'Степени сравнения', 'Время'],
    4: ['Present Continuous', 'Future Simple', 'Conditionals', 'Passive Voice', 'Reading'],
    5: ['Present Perfect', 'Past Continuous', 'Reported Speech', 'Relative Clauses', 'Writing'],
    6: ['Past Perfect', 'Future Continuous', 'Modal Perfects', 'Infinitive vs Gerund', 'Vocabulary'],
    7: ['Complex sentences', 'Conditionals 2-3', 'Passive forms', 'Phrasal verbs', 'Essay writing'],
    8: ['Advanced Grammar', 'Academic writing', 'IELTS preparation', 'Speaking skills', 'Listening skills'],
  },
};

const SUBJECT_NAMES: Record<string, string> = {
  mathematics: 'Математика',
  russian: 'Русский язык',
  history: 'История',
  geography: 'География',
  kazakh: 'Қазақ тілі',
  english: 'Английский язык',
};

export default function ContentAdmin() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTopic, setCurrentTopic] = useState('');
  const [results, setResults] = useState<Array<{ topic: string; success: boolean; error?: string }>>([]);

  const getAvailableGrades = () => {
    if (!selectedSubject || !TOPICS_MAP[selectedSubject]) return [];
    return Object.keys(TOPICS_MAP[selectedSubject]).map(Number);
  };

  const getTopicsCount = () => {
    if (!selectedSubject || !selectedGrade || !TOPICS_MAP[selectedSubject]?.[selectedGrade]) return 0;
    return TOPICS_MAP[selectedSubject][selectedGrade].length;
  };

  const handleGenerateAll = async () => {
    if (!selectedSubject || !selectedGrade) {
      toast.error('Выберите предмет и класс');
      return;
    }

    const topics = TOPICS_MAP[selectedSubject]?.[selectedGrade] || [];
    if (topics.length === 0) {
      toast.error('Нет тем для генерации');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setResults([]);

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      setCurrentTopic(topic);
      setProgress(Math.round(((i) / topics.length) * 100));

      try {
        await ContentService.generateFullContent(
          selectedSubject,
          selectedGrade,
          `topic_${i}`,
          topic,
          'ru'
        );

        // Generate quiz
        const quiz = await ContentService.generateQuiz(selectedSubject, topic, selectedGrade, 'ru');
        if (quiz?.questions) {
          await ContentService.saveInteractiveLesson({
            title: `Викторина: ${topic}`,
            subject: selectedSubject,
            grade: selectedGrade,
            topicId: `topic_${i}`,
            type: 'quiz',
            content: quiz,
            difficulty: Math.min(5, Math.ceil(selectedGrade / 2)),
            estimatedTime: 15,
          });
        }

        // Generate flashcards
        const flashcards = await ContentService.generateFlashcards(selectedSubject, topic, selectedGrade, 'ru');
        if (flashcards?.length > 0) {
          await ContentService.saveFlashcardDeck({
            name: `${SUBJECT_NAMES[selectedSubject]}: ${topic}`,
            subject: selectedSubject,
            grade: selectedGrade,
            topicId: `topic_${i}`,
            cards: flashcards,
          });
        }

        setResults(prev => [...prev, { topic, success: true }]);
        toast.success(`Сгенерировано: ${topic}`);
      } catch (error) {
        console.error(`Error generating content for ${topic}:`, error);
        setResults(prev => [...prev, { topic, success: false, error: String(error) }]);
        toast.error(`Ошибка: ${topic}`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setProgress(100);
    setCurrentTopic('');
    setIsGenerating(false);
    toast.success('Генерация завершена!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Генератор контента</h1>
          <p className="text-muted-foreground">
            Автоматическая генерация образовательного контента с помощью AI
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Настройки генерации
              </CardTitle>
              <CardDescription>
                Выберите предмет и класс для генерации контента
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Предмет</label>
                <Select value={selectedSubject} onValueChange={(v) => { setSelectedSubject(v); setSelectedGrade(0); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите предмет" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SUBJECT_NAMES).map(([key, name]) => (
                      <SelectItem key={key} value={key}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Класс</label>
                <Select 
                  value={selectedGrade ? String(selectedGrade) : ''} 
                  onValueChange={(v) => setSelectedGrade(Number(v))}
                  disabled={!selectedSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите класс" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableGrades().map((grade) => (
                      <SelectItem key={grade} value={String(grade)}>{grade} класс</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSubject && selectedGrade > 0 && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Тем для генерации:</strong> {getTopicsCount()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Для каждой темы будут сгенерированы: теория, примеры, упражнения, викторина и флешкарты
                  </p>
                </div>
              )}

              <Button 
                onClick={handleGenerateAll} 
                disabled={isGenerating || !selectedSubject || !selectedGrade}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Генерация...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Сгенерировать весь контент
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Прогресс генерации
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating && (
                <div className="space-y-4">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    {progress}% - {currentTopic}
                  </p>
                </div>
              )}

              <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto">
                {results.map((result, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-2 rounded ${
                      result.success ? 'bg-green-500/10' : 'bg-red-500/10'
                    }`}
                  >
                    <span className="text-sm">{result.topic}</span>
                    {result.success ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                ))}
              </div>

              {results.length === 0 && !isGenerating && (
                <p className="text-center text-muted-foreground py-8">
                  Выберите предмет и класс для начала генерации
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Статус контента</CardTitle>
            <CardDescription>Обзор сгенерированного контента по предметам</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {Object.entries(SUBJECT_NAMES).map(([key, name]) => {
                const grades = Object.keys(TOPICS_MAP[key] || {});
                return (
                  <div key={key} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{name}</h3>
                    <div className="flex flex-wrap gap-1">
                      {grades.map(grade => (
                        <Badge key={grade} variant="outline" className="text-xs">
                          {grade} кл
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}